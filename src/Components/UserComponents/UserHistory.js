import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './UserHistory.css'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function UserHistory() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.post('http://localhost:5027/api/Item/FindUserHistory', {
                    userId: Cookies.get("userid")
                });

                const servicesWithImages = await Promise.all(response.data.map(async (service) => {
                    try {
                        const imageResponse = await axios.get(`http://localhost:5027/api/Item/GetImage/${service.itemId}/Image`, {
                            responseType: 'arraybuffer',
                        });
                        const imageUrl = URL.createObjectURL(new Blob([imageResponse.data], { type: 'image/jpeg' }));
                        return { ...service, imageUrl };
                    } catch (error) {
                        console.error('Error fetching image for service:', service.itemId, error);
                        return service;
                    }
                }));
                setServices(servicesWithImages);
                setFilteredServices(servicesWithImages);

            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm("Do you want to delete this center?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:5027/api/Item/DeletewasteItems/${itemId}`)
                .then(res => {
                    alert("Request deleted successfully");
                    console.log(itemId);
                });
        }
    };

    return (
        <>
            <div className="container" id="products">
                <div className="text-center">
                    <h2>Your History</h2>
                </div>
            </div>
            <div className="servicelist">
                <div className="">
                    <div className="products-container panel panel-default text-center">
                        {services.map((service) => (
                            <div key={service.itemId} className="product-item card">
                                <div className="card-header">
                                    <h2>Request ID: {service.itemId}</h2>
                                </div>
                                <div className="card-body">
                                    <img src={service.imageUrl} alt="Item" className="card-image" />
                                </div>
                                <div className="card-footer">
                                    <p><b>Item Name: </b>{service.itemName}</p>
                                    <p><b>Item Location: </b>{service.itemLocation}</p>
                                    <p><b>Item Condition:</b> {service.itemCondition}</p>
                                    <p><b>Request Status:</b> {service.requestStatus}</p>
                                    <p><b>Request Status:</b> {service.approvedItemStatus}</p>
                                    <button className="btn btn-danger" onClick={() => handleDelete(service.itemId)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='product-detail bg-warning'>
                        {/* Display detailed service information */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHistory