import { useEffect, useState } from "react";
import { getAllProducts, getAllAddress, getAllUser, getAllItems, getAllCard, getAllPurchaseOrder} from "../api/dataapi";
import { EditProductCard,  BuyProductCard } from "./DataCard";
import { Link } from "react-router-dom";



export function EditProductsList() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await getAllProducts();
        setProducts(res.data);
       
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  //className="grid grid-cols-3 gap-3"
  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map((Product) => (

        <EditProductCard key={Product.Id} Product={Product} />

      ))}
    </div>
  );


}


export function BuyProductsList() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await getAllProducts();
        setProducts(res.data);
       
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  //className="grid grid-cols-3 gap-3"
  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map((Product) => (
       
        <BuyProductCard key={Product.Id} Product={Product} />

      ))}
    </div>
  );


}


export function AddressList() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    async function loadAddresses() {
      try {
        const res = await getAllAddress();
        console.log("Response from getAllAddress:", res.data); // Agregar este console.log
        setAddresses(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadAddresses();
  }, []);

  console.log("Addresses:", addresses); // Agregar este console.log

  return (
    <table className="border-collapse border border-gray-600">
      <caption className="font-bold text-xl p-3">Lista de Direcciones</caption>
    <thead>
      <tr className="bg-zinc-800 text-white">
        <th className="border border-gray-600 p-2">Id</th>
        <th className="border border-gray-600 p-2">City</th>
        <th className="border border-gray-600 p-2">Department</th>
        <th className="border border-gray-600 p-2">AddressInfo</th>
      </tr>
    </thead>
    <tbody>
      {addresses.map((address) => (
        <tr key={address.Id}>
          <td className="border border-gray-600 p-2">{address.Id}</td>
          <td className="border border-gray-600 p-2">{address.City}</td>
          <td className="border border-gray-600 p-2">{address.Department}</td>
          <td className="border border-gray-600 p-2">{address.AddressInfo}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

}

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await getAllUser();
        console.log("Response from getAllUser", res); // Verifica la respuesta para asegurarte de que la dirección esté incluida
        setUsers(res);
      } catch (error) {
        console.error(error);
      }
    }

    loadUsers();
  }, []);

  console.log("Users:", users);

  // Función para generar el texto de la dirección
  const getAddressText = (address) => {
    return `${address.AddressInfo}, ${address.City}, ${address.Department}`;
  };

  return (
    <table className="border-collapse border border-gray-600">
      <caption className="font-bold text-xl p-3">Lista de Usuarios</caption>
      <thead>
        <tr className="bg-zinc-800 text-white">
          <th className="border border-gray-600 p-2">Id</th>
          <th className="border border-gray-600 p-2">Name</th>
          <th className="border border-gray-600 p-2">Surname</th>
          <th className="border border-gray-600 p-2">Address</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.Id}>
            <td className="border border-gray-600 p-2">{user.Id}</td>
            <td className="border border-gray-600 p-2">{user.Name}</td>
            <td className="border border-gray-600 p-2">{user.Surname}</td>
            <td className="border border-gray-600 p-2">{getAddressText(user.Address)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ItemsList() {


  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const res = await getAllItems();
        console.log("Response from getAllItems", res); 
        setItems(res);
      } catch (error) {
        console.error(error);
      }
    }

    loadItems();
  }, []);

  console.log("Items:", items); 

  return (
    <table className="border-collapse border border-gray-600">
      <caption className="font-bold text-xl p-3">Lista de Items</caption>
      <thead>
        <tr className="bg-zinc-800 text-white">
          <th className="border border-gray-600 p-2">Id</th>
          <th className="border border-gray-600 p-2">Product</th>
          <th className="border border-gray-600 p-2">Units</th>
          <th className="border border-gray-600 p-2">TotalPrice</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.Id}>
            <td className="border border-gray-600 p-2">{item.Id}</td>
            <td className="border border-gray-600 p-2">{item.Product.Name}</td>
            <td className="border border-gray-600 p-2">{item.Units}</td>
            <td className="border border-gray-600 p-2">{item.TotalPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadCards() {
      try {
        const res = await getAllCard();
        console.log("Response from getAllCard", res.data);
        setCards(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCards();
  }, []);

  return (
    <table className="border-collapse border border-gray-600">
      <caption className="font-bold text-xl p-3">Lista de Tarjetas</caption>
      <thead>
        <tr className="bg-zinc-800 text-white">
          <th className="border border-gray-600 p-2">Id</th>
          <th className="border border-gray-600 p-2">Type</th>
          <th className="border border-gray-600 p-2">Number</th>
          <th className="border border-gray-600 p-2">OwnerName</th>
          <th className="border border-gray-600 p-2">ExpiryDate</th>
          <th className="border border-gray-600 p-2">CVV</th>
          <th className="border border-gray-600 p-2">Balance</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card) => (
          <tr key={card.Id}>
            <td className="border border-gray-600 p-2">{card.Id}</td>
            <td className="border border-gray-600 p-2">{card.Type}</td>
            <td className="border border-gray-600 p-2">{card.Number}</td>
            <td className="border border-gray-600 p-2">{card.OwnerName}</td>
            <td className="border border-gray-600 p-2">{card.ExpiryDate}</td>
            <td className="border border-gray-600 p-2">{card.CVV}</td>
            <td className="border border-gray-600 p-2">{card.Balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PurchaseOrderList(){
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    async function loadPurchaseOrders() {
      try {
        const res = await getAllPurchaseOrder();
        console.log("Response from getAllPurchaseOrder", res); // Verifica la respuesta para asegurarte de que los detalles estén incluidos
        setPurchaseOrders(res);
      } catch (error) {
        console.error(error);
      }
    }

    loadPurchaseOrders();
  }, []);

  console.log("Purchase Orders:", purchaseOrders);

  return (
    <table className="border-collapse border border-gray-600">
      <caption className="font-bold text-xl p-3">Lista de Órdenes de Compra</caption>
      <thead>
        <tr className="bg-zinc-800 text-white">
          <th className="border border-gray-600 p-2">Id</th>
          <th className="border border-gray-600 p-2">Total</th>
          <th className="border border-gray-600 p-2">Card Number</th>
          <th className="border border-gray-600 p-2">Card Owner</th>
          <th className="border border-gray-600 p-2">Item Name</th>
          <th className="border border-gray-600 p-2">Units</th>
          <th className="border border-gray-600 p-2">Buyer Name</th>
        </tr>
      </thead>
      <tbody>
        {purchaseOrders.map((order) => (
          <tr key={order.Id}>
            <td className="border border-gray-600 p-2">{order.Id}</td>
            <td className="border border-gray-600 p-2">{order.Total}</td>
            <td className="border border-gray-600 p-2">{order.Card.Number}</td>
            <td className="border border-gray-600 p-2">{order.Card.OwnerName}</td>
            <td className="border border-gray-600 p-2">{order.Items.Product}</td>
            <td className="border border-gray-600 p-2">{order.Items.Units}</td>
            <td className="border border-gray-600 p-2">{order.Buyer.Name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}




