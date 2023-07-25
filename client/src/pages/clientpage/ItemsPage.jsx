import { useState, useEffect } from "react";
import { useForm, } from "react-hook-form";
import { createItem, getAllProducts } from "../../api/dataapi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function ItemForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    // Cargar la lista de productos al montar el componente
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

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append("Units", data.Units);
        formData.append("Product", data.Product);
        const res = await createItem(formData);
        navigate("/purchaseorder");
        console.log(res);
        toast.success('Producto creado');
    })

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor="units">Unidades:</label>
                    <input type="number" id="units" {...register('Units', { required: true, min: 1 })} />
                    {errors.Units && <p>Este campo es requerido y debe ser un número mayor a 0.</p>}
                </div>

                <div>
                    <label htmlFor="product">Producto:</label>
                    <select id="product" {...register('Product', { required: true })}>
                        {products.map((product) => (
                            <option key={product.Id} value={product.Id}>
                                {product.Name}
                            </option>
                        ))}
                    </select>
                    {errors.Product && <p>Este campo es requerido.</p>}
                </div>

                <button type="submit">Submit</button>
            </form>

        </div>
    );
}