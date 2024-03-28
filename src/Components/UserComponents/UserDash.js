import React from 'react'
import './UserDash.css';
import { useState} from 'react';
import { useLocation, NavLink, Navigate, useNavigate } from 'react-router-dom';
import Tracking from './Tracking.js'
import UserHistory from './UserHistory';
import ViewRequests from '../AdminComponents/ViewRequests';



function UserDash() {
    const [showSideNav, setShowSideNav] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const location = useLocation();
    const {username} = location.state || {};
    const navigate = useNavigate();
    const toggleSideNav = () => {
        setShowSideNav(!showSideNav);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        setShowSideNav(false); // Close side nav after selecting a page
    };

    const Home = () => {
        return <h2>Home Page</h2>;
    }
    
    const SubmitRequest = () => {
        navigate('/submit');
    }

    return (
        <div className="dashboard">
            <div className="top-nav">
                <button className="menu-btn" onClick={toggleSideNav}>
                    Menu
                </button>
                <div className="user-info">
                    <span>Welcome, {username || 'User'}</span>
                    <NavLink to='/'>
                        <button className='logout-btn' onClick={() => alert('Logout')}>Logout</button>
                    </NavLink>
                    
                </div>
            </div>            
            <div className={`side-nav ${showSideNav ? 'open' : ''}`}>
                <ul>
                    <li className={activePage === 'home' ? 'active' : ''} onClick={() => handlePageChange('home')}>Home</li>
                    <li className={activePage === 'submit' ? 'active' : ''} onClick={() => handlePageChange('submit')}>Submit Request</li>
                    <li className={activePage === 'tracking' ? 'active' : ''} onClick={() => handlePageChange('tracking')}>Tracking</li>
                    
                </ul>
            </div>
            <div className="main-content">
                {/* Render different components based on the activePage state */}
                {activePage === 'home' && <Home />}
                {activePage === 'submit' && <SubmitRequest />}
                {activePage === 'tracking' && <Tracking/>}
              
            </div>
        </div>
    )
}

export default UserDash
