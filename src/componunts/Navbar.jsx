
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const [adminActive, setadminActive] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => { user ? setadminActive(true) : setadminActive(false) }, [])
  const navigate=useNavigate()
  const handleClick=()=>{
    localStorage.removeItem('user')
    setadminActive(false)
    // dispatch logout action
    navigate('/')
   window.location.reload();
  }
  return (

<nav className="navbar">
      <Link to="/" className="logo">
        R&R Company
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Products">Products</Link>
        <Link to="/Contact">Contact</Link>

          
          {!adminActive && (
            <ul className="navbar-nav ">
              <li className="nav-item active ">

                <Link className="nav-link" to="/login">Login</Link>
              </li>

            </ul>)}
            {adminActive && (
            <ul className="navbar-nav ">
              <li className="nav-item active ">
              <button className="btn btn-outline-light small-btn"  onClick={handleClick}>Log out</button>

              </li>

            </ul>)}
            
        
      </div>
    </nav>


  )
}

export default Navbar