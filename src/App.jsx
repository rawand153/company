import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Navbar from './componunts/Navbar'


import Footer from './componunts/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Details from './pages/Details'
import Update from './pages/update'
import Contact from './pages/Contact'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import AddProduct from './pages/AddProduct'

function App() {



  return (
    <>
        <div className='d-flex flex-column vh-100'>

        <Router>
      {/* Navbar */}
      {<Navbar/>}
      <Routes>
            {/*<Home/>*/}
            <Route path="/" element={<Home/>}/>
            {/*<Products/>*/}
            <Route path="/products" element={<Products/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/Details" element={<Details/>} />
            <Route path="/Update" element={<Update/>} />
      </Routes>
      {/* Footer */}
      <Footer/>
     </Router>

      

      
      
    </div>
    </>
  )
}

export default App
