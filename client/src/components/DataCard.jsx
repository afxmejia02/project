import { Navigate, useNavigate } from "react-router-dom";

export function AddressCard({ Address }) {

    const navigate = useNavigate();

  return (
    <table className="border-collapse border border-gray-600">
    <tbody>
      <tr className="bg-zinc-800 text-white">
        <th className="border border-gray-600 p-2">Id</th>
        <th className="border border-gray-600 p-2">City</th>
        <th className="border border-gray-600 p-2">Department</th>
        <th className="border border-gray-600 p-2">AddressInfo</th>
      </tr>
      <tr

      >
        <td className="border border-gray-600 p-2">{Address.Id}</td>
        <td className="border border-gray-600 p-2">{Address.City}</td>
        <td className="border border-gray-600 p-2">{Address.Department}</td>
        <td className="border border-gray-600 p-2">{Address.AddressInfo}</td>
      </tr>
    </tbody>
  </table>

  );


}



export function EditProductCard({ Product }) {

    const navigate = useNavigate();

    return (
        <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer">
            <div key={Product.Id} className="font-bold uppercase" >{Product.Name}</div>
            <p>Categories: {Product.Categories}</p>
            {Product.Image && <img src={Product.Image} alt={Product.Name} />}
            <p>Description: {Product.Description}</p>
            <p>Price: {Product.Price}</p>
            <p>Units Available: {Product.UnitsAvailable}</p>
            <button onClick={() => {
                    navigate(`/product/${Product.Id}`);
                }}>
                  Editar</button>
        </div>
    );
}

export function BuyProductCard({ Product }) {

  const navigate = useNavigate();

  return (
      <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer">
          <div key={Product.Id} className="font-bold uppercase" >{Product.Name}</div>
          <p>Categories: {Product.Categories}</p>
          {Product.Image && <img src={Product.Image} alt={Product.Name} />}
          <p>Description: {Product.Description}</p>
          <p>Price: {Product.Price}</p>
          <p>Units Available: {Product.UnitsAvailable}</p>
          <button onClick={() => {
                  navigate(`/items`);
              }}>
                Comprar</button>
      </div>
  );
}