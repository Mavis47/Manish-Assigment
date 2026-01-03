from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProductViewSet, OrderViewSet,OrderItemViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('products', ProductViewSet)
router.register('orders', OrderViewSet)
router.register('order-items', OrderItemViewSet)

urlpatterns = router.urls
