import { useState, useEffect } from "react";
import { useForm, } from "react-hook-form";
import { createProduct, deleteProduct, updateProduct, getProduct } from "../../api/dataapi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {toast} from "react-hot-toast";

export function ProductForm() {
    const { register, handleSubmit, formState: { errors }, setValue} = useForm();
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const CATEGORIES = [
        'CELULARES Y SMARTPHONES',
        'TABLETS Y COMPUTADORES',
        'CÁMARAS',
        'ACCESORIOS',
        'CONSOLAS Y VIDEOJUEGOS',
        'TELEVISORES'
    ];

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Categories", data.Categories);
        formData.append("Image", imageFile);
        formData.append("Description", data.Description);
        formData.append("Price", data.Price);
        formData.append("UnitsAvailable", data.UnitsAvailable);
        if (params.Id) {
            await updateProduct(params.Id, data)
            toast.success('Producto actualizado');
            // updateProduct();
        }
        else {
            const res = await createProduct(formData);
            navigate("/data");
            console.log(res);
            toast.success('Producto creado');
        }
        navigate("/data");
    });

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    useEffect(() => {
        async function loadProduct(){
            if (params.Id) {
                console.log("Obteniendo datos");
                const res = await getProduct(params.Id);
                console.log(res);
                setValue("Name", res.data.Name);
                setValue("Categories", res.data.Categories);
                setValue("Description", res.data.Description);
                setValue("Price", res.data.Price);
                setValue("UnitsAvailable", res.data.UnitsAvailable);
            }
        }
        loadProduct();

    }, []

    )

    return (
        <div className="max-w-x1 mx-auto">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" {...register("Name", { required: true })} className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"/>
                    {errors.Name && <p>This field is required</p>}
                </div>

                <div>
                    <label htmlFor="categories">Categories:</label>
                    <select id="categories" {...register("Categories", { required: true })} className="bg-zinc-700 p-3 rounded-lg block w-full mb-3">
                        {CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.Categories && <p>This field is required</p>}
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="Image" onChange={handleImageChange} />
                    {errors.Image && <p>This field is required</p>}
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" {...register("Description", { required: true })} className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"/>
                    {errors.Description && <p>This field is required</p>}
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        {...register("Price", { required: true, min: 0 })} className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    />
                    {errors.Price && <p>This field is required and must be a positive number</p>}
                </div>

                <div>
                    <label htmlFor="unitsAvailable">Units Available:</label>
                    <input
                        type="number"
                        id="unitsAvailable"
                        {...register("UnitsAvailable", { required: true, min: 0 })} className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    />
                    {errors.UnitsAvailable && <p>This field is required and must be a positive number</p>}
                </div>

                <button type="submit" className="bg-red-500 p-3 rounded-lg w-48 mt-3">Submit</button>
            </form>
            {params.Id &&
                <button onClick={async () => {
                    const accepted = window.confirm('Estas seguro?')
                    if (accepted) {
                        await deleteProduct(params.Id);
                        navigate('/data');
                        toast.success('Producto eliminado');
                    }
                    className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"

                }}>Delete</button>
            }
        </div>
    );
}