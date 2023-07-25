from django.urls import path, include
from rest_framework import routers
from api import views


router=routers.DefaultRouter()
router.register(r'address', views.AddressView )
router.register(r'user', views.UserView )
router.register(r'product', views.ProductView )
router.register(r'items', views.ItemsView )
router.register(r'card', views.CardView )
router.register(r'purchaseorder', views.PurchaseOrderView )
router.register(r'invoice', views.InvoiceView)


urlpatterns=[]

urlpatterns += router.urls