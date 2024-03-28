import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { NavLink ,useNavigate} from 'react-router-dom';
// import recycle from '../Images/recyle.gif'
import './Signup.css'

import Cookies from 'js-cookie';
function Signup() {
    const initalvalues = { UserName: "",PhoneNumber:"",Location:"", Email: "", Password: "", Cpassword: "" };
    const [formValues, setformValues] = useState(initalvalues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({ ...formValues, [name]: value })
    }
    const navigate = useNavigate();
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        try { 

            const response = await axios.post('http://localhost:5027/api/Login/signup', formValues); 
  
            console.log('User created:', response.data); 
  
            window.alert('User Registered successfuly'); 
        
            navigate('/login'); 
  
        } 
  
        catch (error) { 
  
            console.error('Error:', error); 
  
        } 
    }

    const validate = (values) => {
        const errors = {};

        //const regex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;

        if (!values.UserName) {
            errors.UserName = "Username is required!";
        }
        if(!values.PhoneNumber){
            errors.PhoneNumber="PhoneNumber is required!";
        }
        if(!values.Location){
            errors.Location="PhoneNumber is required!";
        }
        if (!values.Email) {
            errors.Email = "Email is required!";
        }
        // } else if (!regex.test(values.Email)) {
        //     errors.Email = "This is not a valid email format!"
        // }
        // if (!values.Password) {
        //     errors.Password = "Password is required!";
        // } else if (values.Password.length < 4) {
        //     errors.Password = "Password must be more than 4 charcters"
        // } else if (values.Password.length > 10) {
        //     errors.Password = "Password must be exceed more than 10 charcters"
        // }
        
        if (!values.Cpassword) {
            errors.Cpassword = "Confirm Password is required";
        } else if (values.Cpassword !== values.Password) {
            errors.Cpassword = "Confirm password and password should be same";
        }
        // if (Object.keys(formErrors).length === 0 && isSubmit){
        //     navigate('/userdash')
        // }
        return errors;
    }
    return (
        <div class='container'>
            <div className='signup'>
                <form onSubmit={handleSubmit} className='form'>
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>Signup</h1>
                    <hr></hr>
                    <div className="form-floating ">
                        <input type="text" class="form-control" id="username" name="UserName" value={formValues.UserName} onChange={handleChange} />
                        <label htmlFor="UserName">UserName</label>
                    </div><p>{formErrors.UserName}</p>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="phone" name="PhoneNumber" value={formValues.PhoneNumber} onChange={handleChange}/>
                        <label htmlFor="PhoneNumber">PhoneNumber</label>
                    </div><p>{formErrors.PhoneNumber}</p>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="location" name="Location" value={formValues.Location} onChange={handleChange} />
                        <label htmlFor="Location">Location</label>
                    </div><p>{formErrors.Location}</p>
                    <div className="form-floating ">
                        <input type="email" class="form-control" id="email" name="Email" value={formValues.Email} onChange={handleChange} />
                        <label htmlFor="email">Email</label>
                    </div><p>{formErrors.Email}</p>

                    <div class="form-floating ">
                        <input type="password" class="form-control" id="Password" name="Password" value={formValues.Password} onChange={handleChange}/>
                        <label htmlFor="Password">Password</label>
                    </div><p>{formErrors.Password}</p>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="Cpassword" name="Cpassword" value={formValues.Cpassword} onChange={handleChange}/>
                        <label htmlFor="Cpassword">Cpassword</label>
                    </div><p>{formErrors.Cpassword}</p>
                
                    
                    <button class="btn btn-primary">Submit</button>
                    <NavLink to='/login' style={{display:'flex',justifyContent:'flex-end'}}>Already Have an account? Login!</NavLink>
                </form>
            </div>
            {/* <div className='signup-post'>
                <img src={recycle} alt='Signup' />
            </div> */}
        </div>
    )
}

export default Signup
