from django.contrib import admin
from .models import Order, OrderItem, Product, User

# Register your models here.

admin.site.register(User)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)