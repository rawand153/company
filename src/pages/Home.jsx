import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ax from 'axios'

const Home = () => {

  const [itemsData, setItemsData] = useState()
  const [isLoad, setisLoad] = useState(true)


  const bulr = "https://projectback-9d0c.onrender.com/api/items/"

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await ax.get(bulr);

        // Ensure that response.data is an array before using slice
        if (Array.isArray(response.data)) {
          setItemsData(response.data.slice(-3));
        } else {
          throw new Error('Invalid data structure in the API response');
        }

        setisLoad(false);
      } catch (error) {
        console.error(`ERROR! ${error}`);
        setisLoad(false);
      }
    };

    fetchItem();
  }, []);
  return (

    <>
      {/* Jumbotron/hero section */}
      <div className=" jumbotron">
        <div className="con">
          <h1 className="display-2">Welcome to Our Body & Skin Care Company</h1>
          <p className="lead">Discover our high-quality products designed to enhance your beauty.</p>
          <Link className="btn btn-lg" to="/products" role="button" >Explore Products</Link>
        </div>
      </div>
      <h1 className="container mt-4">Featured Products</h1>

      {

        isLoad ? (<p>Loading...</p>) : (

          <div className="row row-cols-1 row-cols-md-4 g-4 m-2">
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
    </>
  )
}

export default Home