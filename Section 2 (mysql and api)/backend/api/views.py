from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from .models import User, Product, Order
from .serializers import UserSerializer, ProductSerializer, OrderSerializer
from .models import OrderItem, Product
from .serializers import OrderItemSerializer
from django.db.models import Sum, F,Count
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Listing top 5 spenders
    @action(detail=False, methods=["get"])
    def top_spenders(self, request):
        users = (
            User.objects
            .annotate(
                total_spent=Sum(
                    F("orders__items__quantity") * F("orders__items__product__price")
                )
            )
            .order_by("-total_spent")[:5]
        )

        data = [
            {
                "id": u.id,
                "name": u.name,
                "email": u.email,
                "total_spent": u.total_spent or 0
            }
            for u in users
        ]

        return Response(data)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    #Listing out of stock products
    @action(detail=False, methods=["get"])
    def out_of_stock(self, request):
        products = Product.objects.filter(stock=0)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        if serializer.validated_data['stock'] < 0:
            raise ValidationError("Stock cannot be negative") # Error handling for negative stock
        serializer.save()

# http://127.0.0.1:8000/api/orders/?status=PAID&page=1&limit=10 -> implementated here

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()  
    serializer_class = OrderSerializer

    #Fetch all orders with item count + total amount
    @action(detail=False, methods=["get"])
    def summary(self, request):
        orders = (
            Order.objects
            .annotate(
                item_count=Count("items"),
                total_amount=Sum(
                    F("items__quantity") * F("items__product__price")
                )
            )
        )

        data = [
            {
                "order_id": o.id,
                "user": o.user.name,
                "status": o.status,
                "item_count": o.item_count,
                "total_amount": o.total_amount or 0
            }
            for o in orders
        ]

        return Response(data)

    def get_queryset(self):
        qs = super().get_queryset()
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)  # Filter by status if provided
        return qs


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def perform_create(self, serializer):
        product_id = self.request.data.get("product")
        order_id = self.request.data.get("order")
        quantity = self.request.data.get("quantity")

        if not product_id or not order_id or not quantity:
            raise ValidationError("Order, Product and Quantity are required.") #Error handlin for missing fields

        product = Product.objects.get(id=product_id)

        if product.stock < int(quantity):
            raise ValidationError(f"Not enough stock for product {product.name}") # Stock validation Error handling

        # Reduce stock
        product.stock -= int(quantity)
        product.save()

        serializer.save(order_id=order_id, product=product, quantity=quantity)
        instance = self.get_object()

        old_product = instance.product
        old_quantity = instance.quantity

        new_product = serializer.validated_data.get('product', old_product)
        new_quantity = serializer.validated_data.get('quantity', old_quantity)

        #  Restore old stock
        old_product.stock += old_quantity
        old_product.save()

        #  Check new stock
        if new_product.stock < new_quantity:
            raise ValidationError("Not enough stock for updated item")

        #  Reduce new stock
        new_product.stock -= new_quantity
        new_product.save()

        serializer.save()

    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def perform_update(self, serializer):

        instance = self.get_object()
        old_quantity = instance.quantity
        product = serializer.validated_data.get('product', instance.product)
        new_quantity = serializer.validated_data.get('quantity', old_quantity)

        diff = new_quantity - old_quantity
        if product.stock < diff:
            raise ValidationError(f"Not enough stock to increase quantity for {product.name}")

        product.stock -= diff
        product.save()
        serializer.save()

    def perform_destroy(self, instance):
        product = instance.product
        product.stock += instance.quantity
        product.save()
        instance.delete()
