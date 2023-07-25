from django.contrib import admin
from .models import Address, User, Product, Items, Card, PurchaseOrder, Invoice

admin.site.register(Address)
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Items)
admin.site.register(Card)
admin.site.register(PurchaseOrder)
admin.site.register(Invoice)


# Register your models here.
