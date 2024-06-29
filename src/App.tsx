
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ListProduct from './compoents/ListProduct'
import { AddProduct } from './compoents/AddProduct'
import { UpdateProduct } from './compoents/UpdateProduct'
import Register from './layout/register'
import Login from './layout/login'
import WebsiteLayout from './layout/Website'

export default function App() {
  return (
    <Routes>
      <Route path='' element={<WebsiteLayout/>}>
      <Route path='/products' element={<ListProduct/>}/>
      <Route path='products/add' element={<AddProduct/>}/>
      <Route path='products/update/:id' element={<UpdateProduct/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      </Route>
    </Routes>

  )
}
