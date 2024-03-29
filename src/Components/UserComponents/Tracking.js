import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Tracking.css'
const Tracking = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5027/api/Item/GetItems');
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

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5027/api/Item/DeletewasteItems/${itemId}`);
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', itemId, error);
        }
    };

    return (
        <>
            <div className="container" id="products">
                <div className="text-center">
                    <h2>Track your Items</h2>
                </div>
            </div>
            <div className="servicelist">
                <div className="">
                    <div className="products-container panel panel-default text-center">
                        {filteredServices.map((service) => (
                            <div key={service.itemId} className="product-item card">
                                <div className="card-header">
                                    <h2>Request ID: {service.itemId}</h2>
                                </div>
                                <div className="card-body">
                                    <img src={service.imageUrl} alt="Item" className="card-image" />
                                </div>
                                <div className="card-footer">
                                    <p>Item Name: {service.itemName}</p>
                                    <p>Request Status: {service.requestStatus}</p>
                                    <p>Approved Item Status: {service.approvedItemStatus}</p>
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
    );
}

export default Tracking;
