from rest_framework import serializers
from .models import User, Product, Order, OrderItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email"]
        
    #Error handling for duplicate emails    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value


class ProductSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Product
        fields = ["id", "name", "price", "stock"]


class OrderItemSerializer(serializers.ModelSerializer):
    # Accept product id on POST/PUT
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True)
    
    # Show nested product info on GET
    product_detail = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "order", "product", "product_detail", "quantity"]



class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = OrderItemSerializer(many=True,read_only=True)  

    class Meta:
        model = Order
        fields = ["id", "user", "status", "created_at", "items"]

    def create(self, validated_data):
        items_data = validated_data.pop('items')  
        order = Order.objects.create(**validated_data)

        # Create order items and update stock
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']

            # Stock validation
            if product.stock < quantity:
                raise serializers.ValidationError(
                    f"Not enough stock for product {product.name}"
                )
            # Reduce stock
            product.stock -= quantity
            product.save()

            # Create OrderItem
            OrderItem.objects.create(order=order, product=product, quantity=quantity)

        return order

