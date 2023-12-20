import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ax from 'axios'


const Products = () => {
  const [adminActive, setadminActive] = useState(false)
  const [itemsData, setItemsData] = useState(false)
  const [isLoad, setisLoad] = useState(true)
  const [SelectCategory, setSelectCategory] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const bulr = "https://projectback-9d0c.onrender.com/api/items/"
  const detData = () => {

  }
  useEffect(() => {
    user ? setadminActive(true) : setadminActive(false)
    const fetchItem = async () => {
      try {
        let urll = bulr
        if (SelectCategory) {
          const encodedCategory = encodeURIComponent(SelectCategory);
          urll += `?category=${encodedCategory}`

        }

        let res = await ax.get(urll)
        setItemsData(res.data)
        setisLoad(false)
      } catch (error) {
        console.log(`ERROR! ${error}`);
      }
    }

    fetchItem()
  }, [SelectCategory])
  return (
    <div className="container mt-5">


      <div className='head d-flex'>


        <h2>All Products</h2>
        {adminActive && <Link className="btn btn-lg add btn-outline-light" to="/AddProduct" role="button" >Add Produts</Link>
        }
      </div>
      
        <div className=' filters'>
          <label>Categories</label>
          <div className="d-flex">
          <select onChange={(e) => setSelectCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Hair Shampoos & Conditioners">Hair Shampoos & Conditioners</option>
            <option value="Facial Cleansers">Facial Cleansers</option>
            <option value="Moisturizers & Creams">Moisturizers & Creams</option>
            <option value="Sunscreen">Sunscreen</option>
            <option value="Face Masks">Face Masks</option>
            <option value="other">other</option>
          </select>
        </div>
        
      </div>
      {
        isLoad ? (<p>Loading...</p>) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {
              itemsData.map((item, index) => (
                <div key={index} className="col mb-4">
                  <div className="card h-100">
                    <img src={`https://projectback-9d0c.onrender.com/uploads/${item.thumbnail}`} style={{ height: '100%', width: '100%' }} className="card-img-top" alt="Product Image" />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h5>
                      <Link to={'/Details'} state={item} className="btn mt-auto">View Details</Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Products