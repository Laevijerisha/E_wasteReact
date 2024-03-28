
import React from 'react';

import axios from 'axios';
import { useState,useEffect } from 'react';
const Tracking = ({ currentStep }) => {
    
    const [appointment, setAppointment] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchServices();
    }, []);
        const fetchServices = async () => {
            setLoading(true);
            console.log('fetching services');
            const response = await axios.get('http://localhost:5027/api/Item/GetItems');

            setAppointment(response.data);
            
            console.log(response.data);
            setLoading(false);
        };
 
 
 
   
if (loading) {
    return <div>Loading...</div>;
}


    console.log('users.userName')
    return (
        <>
        <h1>Request Tracking Page</h1><br></br>
        <table className="table">
            <thead >
                <tr>
                   
                    <th scope='col'>Request Id</th>
                    <th scope='col'>User Name</th>
                    <th scope='col'>Item Name</th>
                    <th scope='col'>Item Type</th>
                    <th scope='col'>Item Quantity </th>
                    <th scope='col'>Item Condition </th>
                    <th scope='col'>Item Location</th>
                    <th scope='col'>Request Status</th>
                    <th scope='col'>Approved Item Status</th>
                   
                   
                </tr>
            </thead>
            <tbody>
                {appointment.map(e => (
                    <tr key={e.itemId}>
                        
                        <td>{e.itemId}</td>
                        <td>{e.users.userName}</td>
                        <td>{e.itemName}</td>
                        <td>{e.itemtype}</td>
                        <td>{e.itemQuantity}</td>
                        <td>{e.itemCondition}</td>
                        <td>{e.itemLocation}</td>
                        <td>{e.requestStatus}</td>
                        <td>{e.approvedItemStatus}</td>
                       
                        
                       
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}
export default Tracking;
