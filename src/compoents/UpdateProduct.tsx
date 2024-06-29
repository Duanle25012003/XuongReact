import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ProductContext } from "../context/ProductProvider";
import { useForm } from "react-hook-form";

interface FormProduct{
    title: string,
    price: number,
    description: string,
    thumbnail: string
}
export const UpdateProduct = () =>{
    const {dispatchProduct} = useContext(ProductContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm <FormProduct>()

    const {id} = useParams();
    useEffect(() =>{
        fetch('http://localhost:3000/products/' +id)
        .then(res => res.json())
        .then((data: any) =>{
            reset(data)
        })
    },[])

    const submit = (data: FormProduct)=>{
        fetch('http://localhost:3000/products/' +id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            dispatchProduct({
                type: "UPDATE_PRODUCT",
                payload: data
            })
        })
        navigate("/")
    }
    return(
        

<form className="max-w-sm mx-auto" onSubmit={handleSubmit(submit)}>
    <h3>THêm sản phẩm</h3>
  <div className="mb-5">
    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu Đề</label>
    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tieu de" {...register('title',{
        required: "Tieu de khong để trống",
        minLength: {
            value: 6,
            message: "Tieu de phai it nhat 6 kí tu"
        }
    })} />
    <div className="text-red-500">{errors?.title?.message}</div>
  </div>
  <div className="mb-5">
    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gía</label>
    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gía" {...register('price',{
        required: "Gía khong để trống",
        pattern: {
            value: /^\d+$/,
            message: "Gía không âm"
        }
    })} />
    <div className="text-red-500">{errors?.price?.message}</div>
    </div>
    <div className="mb-5">
    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả" {...register('description',{
        required: "Desc khong để trống",
    })} />
    <div className="text-red-500">{errors?.description?.message}</div>
    </div>
    <div className="mb-5">
    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ảnh" {...register('thumbnail',{
        required: "image khong để trống",
    })} />
    <div className="text-red-500">{errors?.thumbnail?.message}</div>
    </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    )
}