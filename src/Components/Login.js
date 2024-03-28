import { useState, useEffect } from 'react'
import axios from 'axios';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
function Login() {
  const initalvalues = { email: "", password: "" };
  const [formValues, setformValues] = useState(initalvalues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  let login = '';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value })

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    const err = validate(formValues);
    login =err.loginType;
    setIsSubmit(true);

    try {
      if (login === 'user') {

        const response = await axios.post('http://localhost:5027/api/Login/login', formValues);

        console.log('User Login Sucessfully:', response.data);

        Cookies.set('email', formValues.email, { expires: 7 });

        window.alert('User Login successfuly');

        navigate('/userdash');
      } else if (login === 'center') {
        const response = await axios.post('http://localhost:5027/api/Login/Center/login', formValues);

        console.log('Center Login Sucessfully:', response.data);

        Cookies.set('email', formValues.email, { expires: 7 });

        window.alert('Center Login successfuly');

        navigate('/centerdash');
      }
      else if (login === 'admin') {
        navigate('/admindash');
      }
     

    }
    catch (error) {

      console.error('Error:', error);

    }
  }


  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors])
    const validate = (values) => {
    const errors = {};
    const centerregex = /\b[A-Za-z0-9._%+-]+@center\.com\b/;
    const regex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
    let loginType = '';

    if (!values.email) {
      errors.email = "Email is required!";
    }
    else {

      if (centerregex.test(values.email)) {
        loginType = 'center';
      } else if (values.email === 'admin123@admin.com' && values.Password === 'admin123') {
        loginType = 'admin';
      } else if (regex.test(values.email)) {
        loginType = 'user';
      }
      else {
        window.alert("Please sign up")
      }

      if (!values.password) {
        errors.password = "Password is required!";
      } else if (values.password.length < 4) {
        errors.Password = "Password must be more than 4 charcters"
      } else if (values.password.length > 10) {
        errors.Password = "Password must be exceed more than 10 charcters"
      }
    }

    return { errors, loginType };
  }


  return (
    <div class='container'>

      <form onSubmit={handleSubmit}>

        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Login</h1>
        <hr></hr>
        <div className="form-floating ">
          <input type="email" class="form-control" id="email" name="email" value={formValues.email} onChange={handleChange} />
          <label htmlFor="email" className={formValues.email ? "active" : ""}>Email</label>
        </div><p>{formErrors.Email}</p>

        <div class="form-floating ">
          <input type="password" class="form-control" id="pwd" name="password" value={formValues.password} onChange={handleChange} />
          <label htmlFor="pwd">Password</label>
        </div><p>{formErrors.Password}</p>
        <div class="footer">

          <button class="btn btn-primary">Login</button>
          <NavLink to='/signup' style={{ display: 'flex', justifyContent: 'flex-end' }}>Don't Have an account? Signup!</NavLink>
        </div>
      </form>

    </div>
  )
}

export default Login
