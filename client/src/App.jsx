import React from "react";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { MainO } from "./pages/ownerpage/MainO";
import { ProductForm } from "./pages/ownerpage/CreateProduct";
import { EditProduct } from "./pages/ownerpage/EditProduct";
import { Data } from "./pages/ownerpage/Data";
import { BuyPage } from "./pages/clientpage/BuyPage";
import { CardPage } from "./pages/clientpage/CardPage";
import { EditUserDataPage } from "./pages/clientpage/EditUserDataPage";
import { InvoicePage } from "./pages/clientpage/InvoicePage";

import { MainPage } from "./pages/clientpage/MainPage";
import { ProductsByCategorie } from "./pages/clientpage/ProductsByCategorie";
import { PurchaseOrderPage } from "./pages/clientpage/PurchaseOrderPage";
import { ProductsByName } from "./pages/clientpage/ProductsByName";
import { UserLogInPage } from "./pages/clientpage/UserLogInPage";
import { UserSignUpPage } from "./pages/clientpage/UserSignUpPage";
import { Navigation } from "./components/Navigation";
import {Toaster} from "react-hot-toast";

function App(){


  return (
    <BrowserRouter>
    <div className="container mx-auto">
    <Navigation />
    <Routes>
    <Route path="/" element={<Navigate to="/main" />}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/maino" element={<MainO />}/>
    <Route path="/create-product" element={<ProductForm />}/>
    <Route path="/edit-product" element={<EditProduct />}/>
    <Route path="/product/:Id" element={<ProductForm />}/>
    <Route path="/data" element={<Data />}/>
   
    <Route path="/card" element={<CardPage />} />
    <Route path="/edituserdata" element={<EditUserDataPage />} />
    <Route path="/invoice" element={<InvoicePage />} />
    <Route path="/buy/:Id" element={<BuyPage />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/productsbycategorie" element={<ProductsByCategorie />} />
    <Route path="/purchaseorder" element={<PurchaseOrderPage />} />
    <Route path="/productsbyname" element={<ProductsByName />} />
    <Route path="/userlogin" element={<UserLogInPage />} />
    <Route path="/usersignup" element={<UserSignUpPage />} />
    </Routes>
    <Toaster/>
    </div>
    </BrowserRouter>
  );
}

export default App
