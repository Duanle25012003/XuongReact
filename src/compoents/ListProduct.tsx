import { useContext, useEffect } from "react"
import { ProductContext } from "../context/ProductProvider"
import { Link } from "react-router-dom";
import { IProducts } from "../interfaces/IProduct";

const ListProduct = () =>{
    const {products, dispatchProduct} = useContext(ProductContext);
    useEffect(()=>{
        fetch ('http://localhost:3000/products')
        .then(response => response.json())
        .then(data=>{
            dispatchProduct({
                type: "LIST_PRODUCT",
                payload: data
            })
        })
        .catch(error =>{
            console.log(error);
        })
    },[])
    function handleDelete(id: number){
        fetch('http://localhost:3000/products/' +id,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        }).then(()=>{
            dispatchProduct({
                type: "DELETE_PRODUCT",
                payload: id
            })
        })
    }
    return(
        <>
        

<div className=" overflow-x-auto shadow-md sm:rounded-lg">
    <h3>Danh sách sản phẩm</h3>
    <div className="px3 py-2 bg-blue-500 rounded-full w-32 text-gray-50">
        <Link  to={'add'}>Thêm sản phẩm</Link>
    </div>
    
    <table className="w-full text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase ">
            <tr className="space-y-4 bg-slate-300">
                <th scope="col" className="px-2 py-3">
                    Product title
                </th>
                <th scope="col" className="px-6 py-3 bg-blue-400">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Desc
                </th>
                <th scope="col" className="px-6 py-3  bg-blue-400">
                    Thumbnail
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                products.map((item: IProducts)=>{
                    return(
                        <tr key={item.id} className="border-b border-gray-200">
                <td scope="row" className="px-6 py-4  dark:bg-gray-800">
                    {item.title}
                </td>
                <td className="px-6 py-4">
                    {item.price}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {item.description}
                </td>
                <td className="px-6 py-4 shadow-inner rounded-lg w-3 h-3">
                    <img src={item.thumbnail} alt="" />
                </td>
                <td className="flex flex-col pt-1 space-y-3">
                    <Link className="px-3 py-2 text-gray-50 bg-red-500 rounded-lg" to={`update/${item.id}`}>Update</Link>
                    <button className="px-3 py-2 text-gray-900 bg-orange-400 rounded-lg" onClick={() => {
                        if(confirm("Bạn có muốn xoá không")){
                            handleDelete(item.id!)
                        }
                    }}>Delete</button>
                </td>
            </tr>
                    )
                })
                
            }
     
        </tbody>
    </table>
</div>

        </>
    )
}
export default ListProduct;