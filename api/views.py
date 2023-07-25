from rest_framework import viewsets, serializers, status
from .serializer import AddressSerializer, UserSerializer, ProductSerializer, ItemsSerializer, CardSerializer, PurchaseOrderSerializer, InvoiceSerializer
from .models import Address, User, Product, Items, Card, PurchaseOrder, Invoice
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

class LoginView(APIView):
    def post(self, request, format=None):
        Username = request.data.get('Username')
        Password = request.data.get('Password')
        user = authenticate(request, Username=Username, Password=Password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Autenticación exitosa'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Nombre de usuario o contraseña incorrectos'}, status=status.HTTP_401_UNAUTHORIZED)

def my_view(request):
    user = request.User
    purchases = PurchaseOrder.objects.filter(Buyer=user)
    items = Items.objects.filter(Seller=user)
    return HttpResponse("Hola, " + user.Username + "! Bienvenido a tu página de compras.")

class AddressView(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    @action(detail=True, methods=['post'])
    def decrease_units(self, request, pk=None):
        product = self.get_object()
        quantity = request.data.get('quantity', 1)
        success = product.decrease_units_available(quantity)
        if success:
            serializer = self.get_serializer(product)
            return Response(serializer.data)
        else:
            return Response({"message": "Insufficient units available"}, status=400)

class ItemsView(viewsets.ModelViewSet):
    serializer_class = ItemsSerializer
    queryset = Items.objects.all()
    

    def perform_create(self, serializer):
        data = serializer.validated_data
        item = Items(**data)
        item.pre_save()
        item.save()  
        return Response(serializer.data)
 




class CardView(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()        


 # Vista
class PurchaseOrderView(viewsets.ModelViewSet):
    serializer_class = PurchaseOrderSerializer
    queryset = PurchaseOrder.objects.all()

    def perform_create(self, serializer):
        card_id = self.request.data.get('Card', None)
        if not card_id:
            raise ValueError("Debe especificar una tarjeta para la orden de compra.")
        
        card = Card.objects.get(Id=card_id)
        items = serializer.validated_data['Items']
        total=items.TotalPrice


        if total > card.Balance:
            raise ValueError("Saldo insuficiente en la tarjeta.")

        card.Balance -= total
        card.save()
        serializer.save(Total=total)

        return Response(serializer.data)

class InvoiceView(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()



