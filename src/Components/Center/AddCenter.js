import axios from "axios";  

import { useEffect, useState } from "react";  

import { Link, useNavigate, NavLink } from "react-router-dom";  

  

function AddCenter() {  

    const initalvalues = { center_Name: "", email: "", phone_number: "", centerLocation: "", password: ""};  

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

    const handleSubmit = async (e) => {  

        e.preventDefault();  

        setFormErrors(validate(formValues));  

        setIsSubmit(true);  

        if (Object.keys(formErrors).length === 0 && isSubmit) {  

            try {  

                const response = await axios.post('http://localhost:5027/api/Admin/Add Centers', formValues);  

                console.log('Center  created:', response.data);  

                window.alert('Center Registered successfuly');  

                navigate('/managecenters');  

            }  

            catch (error) {  

                console.error('Error:', error);  

            }  

        }  

    }  

    const validate = (values) => {  

        const errors = {};  

        const regexPhone = /^[0-9]{10}$/  

        const regex = /\b[A-Za-z0-9._%+-]+@center\.com\b/;  

        if (!values.center_Name) {  

            errors.center_Name = "Center Name is required!";  

        }  

        if (!values.centerLocation) {  

            errors.centerLocation = "Location is required!";  

        }  

        if (!values.email) {  

            errors.email = "Email is required!";  

        }  

        else if (!regex.test(values.email)) {  

            errors.email = "This is not a valid email format!"  

        }  

        if (!values.password) {  

            errors.password = "Password is required!";  

        } else if (values.password.length < 4) {  

            errors.password = "Password must be more than 4 charcters"  

        } else if (values.password.length > 10) {  

            errors.password = "Password must be exceed more than 10 charcters"  

        }  

        if (!values.phone_number) {  

            errors.phone_number = "Phone number is required";  

        } else if (!regexPhone.test(values.phone_number)) {  

            errors.phone_number = "Invalid phone number, must be 10 digits";  

        }  

        return errors;  

    }  

  

    return (  

        <>  

            <div className='container'>  

                <div className='signup' >  

                    <form onSubmit={handleSubmit} className='form'>  

                        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Add Center</h1>  

                        <hr></hr>  

                        <div className="form-floating">  

                            <input type="text" className="form-control" id="center_Name" name="center_Name" value={formValues.center_Name} placeholder="Center Name" onChange={handleChange} />  

                             

                        </div><p style={{color:"red"}}>{formErrors.center_Name}</p>  

                        <div className="form-floating">  

                            <input type="email" className="form-control" id="email" name="email" value={formValues.email} placeholder="Email" onChange={handleChange} />  

                             

                        </div><p style={{color:"red"}} >{formErrors.email}</p>  

                        <div className="form-floating">  

                            <input type="text" className="form-control" id="phone" name="phone_number" value={formValues.phone_number} placeholder="Phone number" onChange={handleChange} />  

                            

                        </div><p style={{color:"red"}} >{formErrors.phone_number}</p>  

                        <div className="form-floating">  

                            <input type="text" className="form-control" id="location" name="centerLocation" value={formValues.centerLocation} placeholder="Location" onChange={handleChange} />  

                            

                        </div><p style={{color:"red"}} >{formErrors.centerLocation}</p>  

                        <div className="form-floating">  

                            <input type="password" className="form-control" id="Password" name="password" value={formValues.password} placeholder="Password" onChange={handleChange} />  

                          

                        </div><p style={{color:"red"}} >{formErrors.password}</p>  

                       

                        <button className="btn btn-primary">Submit</button>  

                    </form>  

                </div>  

            </div>  

        </>  

    );  

}  

  

export default AddCenter; 

 