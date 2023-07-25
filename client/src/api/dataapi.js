import axios from 'axios';

const productsApi = axios.create({
    baseURL: "http://localhost:8000/api/product/",
});

export const getAllProducts = () => productsApi.get("/");

export const getProduct = (Id) => productsApi.get(`/${Id}/`)

export const createProduct = (Product) => productsApi.post("/", Product);

export const deleteProduct = (Id) => productsApi.delete(`/${Id}/`);

export const updateProduct = (Id, Product) => productsApi.put(`/${Id}/`, Product);

const addressApi =axios.create({
baseURL:"http://localhost:8000/api/address/",
});


const userApi = axios.create({
    baseURL: "http://localhost:8000/api/user/",
  });
  
  const itemsApi = axios.create({
    baseURL: "http://localhost:8000/api/items/",
  });
  
  const cardApi = axios.create({
    baseURL: "http://localhost:8000/api/card/",
  });
  
  const purchaseOrderApi = axios.create({
    baseURL: "http://localhost:8000/api/purchaseorder/",
  });
  
  const invoiceApi = axios.create({
    baseURL: "http://localhost:8000/api/invoice/",
  });

  export const getAllAddress = () => addressApi.get("/");
  export const getAddress = (Id) => addressApi.get(`/${Id}/`)


  export const getAllUser = async () => {
    try {
      const response = await userApi.get("/");
      const usersWithAddress = await Promise.all(
        response.data.map(async (user) => {
          const addressResponse = await getAddress(user.Address);
          const fullAddress = addressResponse.data; // Contiene toda la información de la dirección
          return { ...user, Address: fullAddress };
        })
      );
  
      return usersWithAddress;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const getUser = (Id) => userApi.get(`/${Id}/`)

  //export const getAllItems = () => itemsApi.get("/");

  export const getAllItems = async () => {
    try {
      const response = await itemsApi.get("/");
      const itemsWithProductName = response.data.map(async (item) => {
        const productResponse = await getProduct(item.Product); // Aquí obtenemos el producto por ID
        const productName = productResponse.data.Name;
        return { ...item, Product: { ...item.Product, Name: productName } };
      });
  
      return Promise.all(itemsWithProductName);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const getItem = (Id) => itemsApi.get(`/${Id}/`)

 

  export const getAllCard = () => cardApi.get("/");
  export const getCard = (Id) => cardApi.get(`/${Id}/`)



  export const getAllPurchaseOrder = async () => {
    try {
        const response = await purchaseOrderApi.get("/");
        const purchaseOrders = response.data;
    
        // Obtener todas las promesas para obtener la información adicional necesaria
        const promises = purchaseOrders.map(async (order) => {
          const cardResponse = await getCard(order.Card);
          const cardInfo = cardResponse.data;
    
          const itemsResponse = await getItem(order.Items);
          const itemInfo = itemsResponse.data;
    
          const buyerResponse = await getUser(order.Buyer);
          const buyerInfo = buyerResponse.data;
    
          return {
            ...order,
            Card: {
              Number: cardInfo.Number,
              OwnerName: cardInfo.OwnerName,
            },
            Items: {
            Product:itemInfo.Product,
              Units: itemInfo.Units,
            },
            Buyer: {
              Name: buyerInfo.Name,
            },
          };
        });
    
        // Esperar a que todas las promesas se resuelvan
        const purchaseOrdersWithDetails = await Promise.all(promises);
        return purchaseOrdersWithDetails;
      } catch (error) {
        console.error(error);
        throw error;
      }
  };



  export const getAllInvoice = () => invoiceApi.get("/");

  export const createItem = () => itemsApi.post("/");