import React, { useState } from 'react'
import login from "../img/login.jpg"
import ax from 'axios'
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
const [msg,setMsg]=useState('')
  const navigate=useNavigate()
  const submetbutton = async () => {
    try {

 
      const response = await ax.post('https://projectback-9d0c.onrender.com/api/user/login', { email, password })
      console.log(response.data.cannot)
      const contentType = response.headers.get('Content-Type');
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.data;
        
        if (response.data.email) {
           const { email, token } = data;
        
          console.log('Login successful:', { email, token });
          navigate('/')
          window.location.reload();
          
          localStorage.setItem('user', JSON.stringify(response.data))

        } else {
          console.error('Login failed:', data);
          if(data.cannot)
          {setMsg(`Login failed:${data.cannot}`)
           
          }else{
            setMsg(`Login failed:${data.cannotMatch}`)
          }
        }
      } else {
        console.error('Response is not in JSON format');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  }

  return (
    <section className="logCard text-center text-lg-start">

      <div className="card log mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src={login}
              alt=""
              className="w-100 rounded-3"
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5">
              <form>
                <h3>Login</h3>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example1">
                    Email address
                  </label>
                  <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />

                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example2">
                    Password
                  </label>
                  <input type="password" id="form2Example2" className="form-control" value={password} onChange={(e) => setPass(e.target.value)} />

                </div>


                {/* Submit button */}
                <button type="button" className="btn btn-block mb-4" onClick={submetbutton}>
                  Sign in
                </button>
                <p className='text-danger'>{msg}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login