import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const initialValues = {
    UserName: "",
    PhoneNumber: "",
    Location: "",
    Email: "",
    Password: "",
    Cpassword: ""
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    try {
      const response = await axios.post('http://localhost:5027/api/Login/signup', formValues);
      console.log('User created:', response.data);
      window.alert('User Registered successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const validate = (values) => {
    const errors = {};
    // Add validation logic here
    return errors;
  }

  return (
    <div className='container signup-form'>
      <div className='signup'>
        <form onSubmit={handleSubmit} className='form'>
          <h1 className='mb-4' style={{textAlign:"center"}}>Signup</h1>
          <div className="mb-3">
            <input type="text" className="form-control" id="username" name="UserName" value={formValues.UserName} onChange={handleChange} placeholder="Username" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="phone" name="PhoneNumber" value={formValues.PhoneNumber} onChange={handleChange} placeholder="Phone Number" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="location" name="Location" value={formValues.Location} onChange={handleChange} placeholder="Location" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" id="email" name="Email" value={formValues.Email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="password" name="Password" value={formValues.Password} onChange={handleChange} placeholder="Password" required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="cpassword" name="Cpassword" value={formValues.Cpassword} onChange={handleChange} placeholder="Confirm Password" required />
          </div>
          <button type="submit" className="signupbtn">Submit</button>
          <NavLink to='/login' className='d-block mt-3 text-center'>Already Have an account? Login!</NavLink>
        </form>
      </div>
    </div>
  );
}

export default Signup;
