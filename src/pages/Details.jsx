import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import ax from 'axios'

const Details = () => {
  const location = useLocation();
  const myData = {
    title : location.state.title,
    description :location.state.description,
    categories:location.state.category,
    thumbnail :location.state.thumbnail,
    idd:location.state._id
  };
  console.log(location.state._id)
  const title = location.state.title;
  const description = location.state.description;
  const thumbnail = location.state.thumbnail;
  const id=location.state._id;
  const [adminActive, setadminActive] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
 
  useEffect(()=>{
    user ? setadminActive(true) : setadminActive(false)
  },[])
 
 const removeItem=async()=>{
  try{
    const res=await ax.delete("https://projectback-9d0c.onrender.com/api/items/"+id)
    console.log(res)
  }catch(error){
console.log(error)
  }
 }
  return (
    <div className="container mt-5">
      <div className="detailsHead row">
        <h1 className="col-md-6">{title.charAt(0).toUpperCase()+title.slice(1)}</h1>
        <div className="but d-flex col-md-3">
        {adminActive &&
            <Link className="d-flex btn btn-danger btn-block " to="/products" onClick={removeItem}>Delete Product</Link>}
               {adminActive &&
            <Link className="d-flex btn btn-secondary btn-block " to="/Update" state={myData}>Edit Product</Link>}
         
        
        </div>
      </div>

      <form className="productDetails row">
        <div className="col-md-6">
          <br />
          <img src={`https://projectback-9d0c.onrender.com/uploads/${thumbnail}`} style={{ height: 300, width: '300px' }} className="card-img-top" alt="Product Image" />
          <br /><br />

        </div>
        <div className="col-md-6">

          <div className=' filters'>
            <br />
            <label>{location.state.category}</label>

          </div>

          <div >
            <p className='text-dark'>{description}</p>
          </div>

        </div>
      </form>
    </div>
  )
}

export default Details