import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route,Routes,BrowserRouter} from 'react-router-dom'
import LogIn from './commponents/LogIn'
import SignUp from './commponents/SignUp'
import ManagerHomePage from './commponents/ManagerHomePage'
import SupplierHomePage from './commponents/SupplierHomePage'
import Suppliers from './commponents/Suppliers'
import NewOrder from './commponents/NewOrder'
import AddProduct from './commponents/AddProduct'
import './App.css'
function App() {
  

  return (
    <Fragment>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LogIn/>} />
    <Route path="/Signup" element={<SignUp/> }/>
    <Route path="/managerPage" element={<ManagerHomePage/> }/>
    <Route path="/supplierPage" element={<SupplierHomePage/> }/>
    <Route path="/suppliers" element={<Suppliers/> }/>
    <Route path="/newOrder/:id" element={<NewOrder />} />
    <Route path="/addproduct" element={<AddProduct/> }/>
    </Routes>
    </BrowserRouter>
    </Fragment>
  )
}

export default App
