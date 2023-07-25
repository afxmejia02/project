import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/dataapi";
import { ProductCard } from "../../components/DataCard";



export function ProductsList() {

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

        <ProductCard key={Product.Id} Product={Product} />

      ))}
    </div>
  );


}