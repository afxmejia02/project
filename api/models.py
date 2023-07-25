from django.db import models

# Create your models here.


class Address(models.Model):
    Id=models.AutoField(primary_key=True)
    City=models.CharField(max_length=100)
    Department=models.CharField(max_length=100)
    AddressInfo=models.CharField(max_length=500)

    def __str__(self):
        return self.AddressInfo  + " - " + self.City + ", " + self.Department

class User(models.Model):
    Id=models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100)
    Surname = models.CharField(max_length=100)  
    DOCUMENT_TYPE = [('RC', 'REGISTRO CIVIL DE NACIMIENTO'),('TI', 'TARJETA DE IDENTIDAD'),('CC', 'CEDULA DE CIUDADANIA'), ('TE', 'TARJETA DE EXTRANJERIA'), ('CE', 'CEDULA DE EXTRANJERIA'), ('NIT', 'NIT'),('PAS', 'PASAPORTE')]
    DocumentType = models.CharField(max_length=100, choices=DOCUMENT_TYPE)
    DocumentId = models.CharField(max_length=50)
    Address = models.ForeignKey(Address, null=False, blank=False, on_delete=models.CASCADE)
    Birthdate = models.DateField()
    Email = models.CharField(max_length=100)
    PhoneNumber = models.CharField(max_length=50)
    UserName = models.CharField(max_length=50, unique=True, default="")
    Password = models.CharField(max_length=100)

    def __str__(self):return self.Name  + " " + self.Surname + " - " + self.UserName



class Product(models.Model):
    Id=models.AutoField(primary_key=True)
    Name=models.CharField(max_length=1000)
    CATEGORIES = [
        ('CELULARES Y SMARTPHONES', 'Celulares y Smartphones'),
        ('TABLETS Y COMPUTADORES', 'Tablets y Computadores'),
        ('CÁMARAS', 'Cámaras'),
        ('ACCESORIOS', 'Accesorios'),
        ('CONSOLAS Y VIDEOJUEGOS', 'Consolas y Videojuegos'),
        ('TELEVISORES', 'Televisores')
    ]
    Categories=models.CharField(max_length=100, choices=CATEGORIES)
    Image=models.ImageField(upload_to='static/', null=True, max_length=200)
    Description=models.TextField(max_length=5000)
    Price=models.DecimalField(max_digits=10, decimal_places=2)
    UnitsAvailable = models.PositiveIntegerField(default=0)
    

    def __str__(self): return self.Name + " - " + self.Categories



    def decrease_units_available(self, quantity):
        if self.UnitsAvailable >= quantity:
            self.UnitsAvailable -= quantity
            self.save()
            return True
        return False   




class Items(models.Model):
    Id = models.AutoField(primary_key=True)
    Product = models.ForeignKey(Product, on_delete=models.CASCADE)
    Units = models.PositiveIntegerField()
    TotalPrice = models.DecimalField(max_digits=10, decimal_places=2)

    def pre_save(self, *args, **kwargs):
        self.TotalPrice = self.Product.Price * self.Units

    def save(self, *args, **kwargs):
        self.pre_save()
        super().save(*args, **kwargs)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.Product.decrease_units_available(self.Units)    

    def __str__(self): return self.Product.Name + " - " + str(self.Units) + " units"




class Card(models.Model):
    Id=models.AutoField(primary_key=True)
    TYPE = [
        ('CREDITO', 'Tarjeta de credito'),
        ('DEBITO', 'Tarjeta de debito'),]
    Type=models.CharField(max_length=100, choices=TYPE, default="")
    Number = models.CharField(max_length=20, unique=True , default="")
    OwnerName = models.CharField(max_length=100 , default="")
    ExpiryDate = models.CharField(max_length=5,  null=False, default="01/01")
    CVV = models.CharField(max_length=3, null=False, default=000)
    Balance = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):return self.Number + " " + self.Type


class PurchaseOrder(models.Model):
    Id=models.AutoField(primary_key=True)
    Items=models.ForeignKey(Items, on_delete=models.CASCADE)
    Card=models.ForeignKey(Card, on_delete=models.CASCADE)
    Buyer=models.ForeignKey(User, on_delete=models.CASCADE, default="")
    Total=models.DecimalField(max_digits=10, decimal_places=2)

    

    def save(self, *args, **kwargs):
            if not self.Card:  
             raise ValueError("Debe especificar una tarjeta para la orden de compra.")
        
            if self.Total > (self.Card.Balance or 0):
                raise ValueError("Saldo insuficiente en la tarjeta.")

            if self.Card.Balance is not None:
                self.Card.Balance -= self.Total
                self.Card.save()
            self.Total = self.Items.TotalPrice  
            super().save(*args, **kwargs)

    
    def __str__(self):return "Items: " + str(self.Items.Product) + " - " + str(self.Items.Units) + " " + " Total: " + str(self.Total) + "Buyer: " + str(self.Buyer)

class Invoice(models.Model):
    Id = models.AutoField(primary_key=True)
    Date = models.DateField(auto_now_add=True)
    PurchaseOrder = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
   
    
    def __str__(self): return "Purchase Order: " + str(self.PurchaseOrder.Items) + " - " + " Total: " + str(self.PurchaseOrder.Total) + "Buyer: " + str(self.PurchaseOrder.Buyer)










    





        
