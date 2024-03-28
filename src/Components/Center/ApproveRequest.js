import React from 'react'

import axios from 'axios';
import { useState, useEffect } from 'react';
function ApproveRequest() {
    const [appointment, setAppointment] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchServices();
    }, []);
        const fetchServices = async () => {
            setLoading(true);
            console.log('fetching services');
            const response = await axios.get('http://localhost:5027/api/Item/GetApprovedItem/approved');

            setAppointment(response.data);
            
            console.log(response.data);
            setLoading(false);
        };
 
 
 
    const handleCollected = async (Id) => {
        try {
            // debugger
            const response =  await axios.post('http://localhost:5027/api/Item/updateItemStatus', { id:Id,approvedItemStatus: "Collected"});
            console.log(response.data.itemId)
            // debugger
            fetchServices();
        } catch (error) {
            console.error(error);
        }
    };
   
    const handleRecycle = async (Id) => {
        try {
            await axios.post('http://localhost:5027/api/Item/updateItemStatus', { id:Id,approvedItemStatus: 'Recycle' });
            fetchServices();
        } catch (error) {
            console.error(error);
        }
    };

   

if (loading) {
    return <div>Loading...</div>;
}


    console.log('users.userName')
    return (
        <>
        <h1>Request Approve Page</h1><br></br>
        <table className="table">
            <thead >
                <tr>
                   
                    <th scope='col'>Request Id</th>
                    
                    <th scope='col'>Item Name</th>
                    
                    <th scope='col'>Request Status</th>
                    <th scope='col'>Approved Item Status</th>
                   
                    <th scope='col'>Actions</th>
                   
                </tr>
            </thead>
            <tbody>
                {appointment.map(e => (
                    <tr key={e.itemId}>
                        
                        <td>{e.itemId}</td>
                       
                        <td>{e.itemName}</td>
                        
                        <td>{e.requestStatus}</td>
                        <td>{e.approvedItemStatus}</td>
                       
                        <td><button onClick={()=>handleCollected(e.itemId)} type="button" class="btn btn-success">Collected</button><span>   <button type="button" onClick={()=>handleRecycle(e.itemId)} class="btn btn-danger">Recycled</button></span></td>
                       
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );

}
export default ApproveRequest

