import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';


export default function SubmitRequest() {
  const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemCondition, setItemCondition] = useState('');
    const [itemLocation, setitemLocation] = useState('');

     const[userid,setuserid]=useState();
     const navigate=useNavigate();
   useEffect(()=>{
      axios.post('http://localhost:5027/api/Login/User/cookie',{
        email:Cookies.get('email')
    })
    .then(res => {
      setuserid(res.data.userId)
     console.log(res.data);

})
     .catch(err => console.log(err));
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemData = {
            itemName: itemName,
            itemtype: itemType,
            itemQuantity: itemQuantity,
            itemCondition: itemCondition,
            itemLocation: itemLocation,
            requestStatus:'Pending',
            userId:userid
        };

        try {
            const response = await axios.post('http://localhost:5027/api/Item/PostItem', itemData);
          
           console.log(response.data.itemId)
            console.log('Item added:', response.data);

            // Reset form fields after successful submission
            window.alert('Your Request is successfuly sent to the center for futher process')
            navigate('/userdash');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
           <div class="container">
                <form onSubmit={handleSubmit}>
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>Submit Request</h1>
                    <div className="form-floating ">
                        <input type="text" class="form-control" id="itemname" name="itemName"value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        <label htmlFor="itemname">Item Name</label>
                    </div>
                    <div className="form-floating ">
                        <input type="text" class="form-control" id="quantity" name="itemtype" value={itemType} onChange={(e) => setItemType(e.target.value)} />
                        <label htmlFor="itemquantity">Item Type</label>
                    </div>
                    <div className="form-floating ">
                        <input type="number" class="form-control" id="quantity" name="itemQuantity" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)}  />
                        <label htmlFor="itemquantity">Quantity</label>
                    </div>
                 
                    <div className="form-floating ">
                        <input type='text' class="form-control" name='ItemCondition' value={itemCondition} onChange={(e) => setItemCondition(e.target.value)}  ></input>
                        <label for="floatingTextarea">Item Condition</label>
                    </div>
                    <div className="form-floating ">
                        <input type='text' class="form-control" name='itemLocation' value={itemLocation} onChange={(e) => setitemLocation(e.target.value)}  ></input>
                        <label for="floatingTextarea">Item Location</label>
                    </div>
                   
                    
                    <button class='btn btn-primary'>Submit Request</button>
                </form>
            </div>
        </div>
    )
}
