import {Link} from "react-router-dom";

export function Navigation(){

    return (
        <div className="flex justify-between py-3">
            <h1>App</h1>
            <Link to="/create-product">Crear producto</Link>
<button className="bg-indigo-500 px-3 py-2 rounded-lg">
            <Link to="/data">Ver todos los datos</Link>
            </button>
        </div>
    );



}