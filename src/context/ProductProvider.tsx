import { ReactNode, createContext, useReducer } from "react";
import { IProducts } from "../interfaces/IProduct";

interface IProduct {
    children: ReactNode
}
export const ProductContext = createContext({} as {
    products: IProducts[],
    dispatchProduct: any
});

const reducerPro = (state: any, action: any)=>{
    switch(action.type){
        case "LIST_PRODUCT":
            return action.payload
        case "ADD_PRODUCT":
            return [...state, action.payload]
        case "DELETE_PRODUCT":
            return state.filter((item: IProducts)=> item.id != action.payload)
        case "UPDATE_PRODUCT":
            return state.map((item: IProducts)=>{
                if(item.id == action.payload.id)
                    return action.payload
                return item
            })
            default:
                return state;
    }
}
export const ProductProvider = (prop: IProduct)=>{
    const [products, dispatchProduct]= useReducer(reducerPro, [] as IProducts[])
    return(
        <ProductContext.Provider value={{products, dispatchProduct}}>
            {prop.children}
        </ProductContext.Provider>
    )
}