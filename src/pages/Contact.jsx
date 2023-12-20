import React from 'react'
import { useState } from 'react';

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
const [sendtr,setsendtr]=useState(false)
  const send=()=>{
    setsendtr(true)
  }
  const validate = () => {
    // Simple validation example: Check if title, description, and categories are not empty
    setisValid(title.trim() !== '' && description.trim() !== '');

  }
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const [successMessage, setSuccessMessage] = useState('');
      const [errorMessage, setErrorMessage] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
     /*   try {
          // Make a POST request to the server
          const response = await axios.post('http://localhost:5173/send-email', formData);
    
          console.log(response.data);
    
          // Set success message
          setSuccessMessage('Email sent successfully!');
          // Clear the success message after a few seconds
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
    
          // Clear the form after submission
          setFormData({
            name: '',
            email: '',
            message: '',
          });
        } catch (error) {
          console.error(error);
    
          // Set error message
          setErrorMessage('Error sending email. Please try again.');
          // Clear the error message after a few seconds
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        }*/
      };
    return (
        <div className=' contactPage' >
            <div className=" contact-card">
                <h2>Contact Us</h2>
              {sendtr?(<p> submitted successfully!</p>):(  <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" onClick={send}>Submit</button>
                </form>)
              }
            </div>
        </div>
    )
}

export default Contact