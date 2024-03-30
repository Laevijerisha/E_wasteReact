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
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const response = await axios.post('http://localhost:5027/api/Login/signup', formValues);
        console.log('User created:', response.data);
        window.alert('User Registered successfully');
        navigate('/login');
      } catch (error) {
        console.error('Error:', error);
      }

    }
  }

  const validate = (values) => {

    const errors = {};
    const regexPhone = /^[0-9]{10}$/
    const regex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;

    if (!values.UserName) {
      errors.UserName = "Username is required!";
    }
    if (!values.PhoneNumber) {
      errors.PhoneNumber = "PhoneNumber is required!";
    } else if (!regexPhone.test(values.PhoneNumber)) {
      errors.PhoneNumber = "Invalid phone number, must be 10 digits";
    }
    if (!values.Location) {
      errors.Location = "PhoneNumber is required!";
    }
    if (!values.Email) {
      errors.Email = "Email is required!";

    } else if (!regex.test(values.Email)) {
      errors.Email = "This is not a valid email format!"
    }
    if (!values.Password) {
      errors.Password = "Password is required!";
    } else if (values.Password.length < 4) {
      errors.Password = "Password must be more than 4 charcters"
    } else if (values.Password.length > 10) {
      errors.Password = "Password must be exceed more than 10 charcters"
    }

    if (!values.Cpassword) {
      errors.Cpassword = "Confirm Password is required";
    } else if (values.Cpassword !== values.Password) {
      errors.Cpassword = "Confirm password and password should be same";
    }



    return errors;

  }

  return (
    <div className='container signup-form'>
      <div className='signup'>
        <form onSubmit={handleSubmit} className='form'>
          <h1 className='mb-4' style={{ textAlign: "center" }}>Signup</h1>
          <div className="mb-3">
            <input type="text" className="form-control" id="username" name="UserName" value={formValues.UserName} onChange={handleChange} placeholder="Username" required />
          </div><p style={{color:'red'}}>{formErrors.UserName}</p>
          <div className="mb-3">
            <input type="text" className="form-control" id="phone" name="PhoneNumber" value={formValues.PhoneNumber} onChange={handleChange} placeholder="Phone Number" required />
          </div><p style={{color:'red'}}>{formErrors.PhoneNumber}</p>
          <div className="mb-3">
            <input type="text" className="form-control" id="location" name="Location" value={formValues.Location} onChange={handleChange} placeholder="Location" required />
          </div><p style={{color:'red'}}>{formErrors.Location}</p>
          <div className="mb-3">
            <input type="email" className="form-control" id="email" name="Email" value={formValues.Email} onChange={handleChange} placeholder="Email" required />
          </div><p style={{color:'red'}}>{formErrors.Email}</p>
          <div className="mb-3">
            <input type="password" className="form-control" id="password" name="Password" value={formValues.Password} onChange={handleChange} placeholder="Password" required />
          </div><p style={{color:'red'}}>{formErrors.Password}</p>
          <div className="mb-3">
            <input type="password" className="form-control" id="cpassword" name="Cpassword" value={formValues.Cpassword} onChange={handleChange} placeholder="Confirm Password" required />
          </div><p style={{color:'red'}} >{formErrors.Cpassword}</p>
          <button type="submit" id='submitbtn' className="signupbtn">Submit</button>
          <NavLink to='/login' className='d-block mt-3 text-center'>Already Have an account? Login!</NavLink>
        </form>
      </div>
    </div>
  );
}

export default Signup;
