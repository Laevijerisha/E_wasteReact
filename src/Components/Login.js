import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.css'

function Login() {
  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, loginType } = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5027/api/Login/login', formValues);

        console.log('Login Successful:', response.data);

        Cookies.set('email', formValues.email, { expires: 7 });
        window.alert('Login successful');

        if (loginType === 'user') {
          navigate('/userdash');
        } else if (loginType === 'center') {
          navigate('/centerdash');
        } else if (loginType === 'admin') {
          navigate('/admindash');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const centerRegex = /\b[A-Za-z0-9._%+-]+@center\.com\b/;
    const regex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
    let loginType = '';

    if (!values.email) {
      errors.email = 'Email is required!';
    } else {
      if (centerRegex.test(values.email)) {
        loginType = 'center';
      } else if (values.email === 'admin123@admin.com' && values.password === 'admin123') {
        loginType = 'admin';
      } else if (regex.test(values.email)) {
        loginType = 'user';
      } else {
        window.alert('Please sign up');
      }

      if (!values.password) {
        errors.password = 'Password is required!';
      } else if (values.password.length < 4) {
        errors.password = 'Password must be more than 4 characters';
      } else if (values.password.length > 10) {
        errors.password = 'Password must not exceed 10 characters';
      }
    }

    return { errors, loginType };
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  return (
    <div className='container login-background'>
     
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit} className='mt-5 p-4 border rounded shadow login-form'>
            <div className='loginheader'>
            <h1 className='text-center mb-4'>Login</h1>
            </div>
            <div className='mb-3'>
              <input
                type='email'
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                id='email'
                name='email'
                value={formValues.email}
                onChange={handleChange}
                placeholder='name@example.com'
              />
              <div className='invalid-feedback'>{formErrors.email}</div>
            </div>
            <div className='mb-3'>
              <input
                type='password'
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                id='password'
                name='password'
                value={formValues.password}
                onChange={handleChange}
                placeholder='Password'
              />
              <div className='invalid-feedback'>{formErrors.password}</div>
            </div>
            <div className='d-grid gap-2'>
              <button className='btn btn-info btn-lg btn-block' type='submit'>
                Login
              </button>
              <NavLink to='/signup' className='btn btn-secondary btn-lg btn-block mt-2' style={{ color: '#31363F' }}>
  Don't have an account? Signup
</NavLink>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
