import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import './SubmitForm.css'
export default function SubmitRequest() {
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null); // Updated to use null as initial value for image
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemCondition, setItemCondition] = useState('');
  const [itemLocation, setitemLocation] = useState('');
  const [userid, setuserid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('http://localhost:5027/api/Login/User/cookie', {
      email: Cookies.get('email')
    })
      .then(res => {
        setuserid(res.data.userId)
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Use FormData to send files
    formData.append('itemName', itemName);
    formData.append('itemImage', itemImage); // Append the image file to the FormData
    formData.append('itemQuantity', itemQuantity);
    formData.append('itemCondition', itemCondition);
    formData.append('itemLocation', itemLocation);
    formData.append('requestStatus', 'Pending');
    formData.append('userId', userid);

    try {
      const response = await axios.post('http://localhost:5027/api/Item/PostItem', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      console.log(response.data.itemId)
      console.log('Item added:', response.data);

      // Reset form fields after successful submission
      window.alert('Your Request is successfully sent to the center for further process')
      navigate('/userdash');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
   
        <div className="container submit">
          <div className="form-container">
            <h1 className="form-heading">Submit Request</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">Item Name</label>
                <input type="text" className="form-control" id="itemName" name="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="itemImage" className="form-label">Item Image</label>
                <input type="file" className="form-control" id="itemImage" name="itemImage" accept="image/*" onChange={(e) => setItemImage(e.target.files[0])} />
              </div>
              <div className="form-group">
                <label htmlFor="itemQuantity" className="form-label">Quantity</label>
                <input type="number" className="form-control" id="itemQuantity" name="itemQuantity" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="itemCondition" className="form-label">Item Condition</label>
                <input type='text' className="form-control" id="itemCondition" name='ItemCondition' value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="itemLocation" className="form-label">Item Location</label>
                <input type='text' className="form-control" id="itemLocation" name='itemLocation' value={itemLocation} onChange={(e) => setitemLocation(e.target.value)} />
              </div>
              <button type="submit" className='btn-submit'>Submit Request</button>
            </form>
          </div>
        </div>
      )
      
  
}
