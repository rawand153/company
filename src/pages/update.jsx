import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ax from 'axios'
import NoImageSelected from "../img/300.png";
import { useLocation } from 'react-router-dom';

const updateProduct = () => {
    const [title, settitle] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isValid, setisValid] = useState(false);
    const [id,setId]=useState()
    const [image, setImage] = useState(NoImageSelected)
    const location = useLocation();
    useEffect(()=>{
        settitle(location.state.title)
        setDescription(location.state.description)
        setCategories(location.state.categories)
        setThumbnail(location.state.thumbnail)
        setId(location.state.idd);
        console.log(categories)
    },[])



  const imageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setThumbnail(e.target.files[0])
      console.log(e.target.files[0])
      validate();
    }


  }
  const validate=()=>{
    // Simple validation example: Check if title, description, and categories are not empty
    setisValid(title.trim() !== '' && description.trim() !== '' );
     
  }
  const updateItem = async (e) => {
    e.preventDefault()


    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description)
    formData.append("category", categories)
    formData.append("thumbnail", thumbnail)
    console.log(`up file : ${id}`)
    try {
      const response = await fetch(`https://projectback-9d0c.onrender.com/api/items/${id}`, {
        method: "PATCH",
        body: formData,
      })
      if (response.ok) {
        settitle('')
        setDescription('')
        setCategories('')
        setThumbnail('')
        setSubmitted(true)

      }


    } catch (error) {
      console.log(error)
    }



  }
  return (
    <div className="container mt-5">
      <h1>Update Product</h1>
      {
        submitted ? (<p>Data submitted successfully!</p>) :( <form className="productDetails row" onSubmit={updateItem}>
          <div className="col-md-6">
            <label>Upload Photo</label>
            <br />
            <img src={`https://projectback-9d0c.onrender.com/uploads/${thumbnail}`}style={{ height: 300, width: '300px' }} alt="Product Image" />
            <br /><br />
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              onChange={imageChange}
            />
          </div>
          <div className="info col-md-6">

            <div className="input-group mb-3">
              <span className="input-group-text">Product Name</span><input type="text" className="form-control" aria-label="Product Name" aria-describedby="basic-addon1" value={title} onChange={(e) =>{    settitle(e.target.value.toLocaleLowerCase());
               validate()
              }}
               />
            </div>

            <div className=' filters'>
              <label htmlFor='yourSelected'>Category</label>
              <select id='yourSelected' value={categories} onChange={(e) => {setCategories(e.target.value)
              }}>
                <option value="Hair Shampoos & Conditioners">Hair Shampoos & Conditioners</option>
                <option value="Facial Cleansers">Facial Cleansers</option>
                <option value="Moisturizers & Creams">Moisturizers & Creams</option>
                <option value="Sunscreen">Sunscreen</option>
                <option value="Face Masks">Face Masks</option>
                <option value="other">other</option>
              </select>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Description</span>
              <textarea className="form-control" rows="4"
                cols="50" aria-label="Description" value={description} onChange={(e) =>{ setDescription(e.target.value)
                  validate()
                }}
                ></textarea>
            </div>
            

            <button className="btn btn-outline-light" type="submit" disabled={!isValid} >Update Product</button>
          </div>
        </form>
      )}

    </div>
  )
}

export default updateProduct