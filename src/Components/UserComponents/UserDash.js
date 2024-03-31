import React from 'react';
import './UserDash.css';
import { useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';

import SubmitRequest from './SubmitRequest.js'; // Import the SubmitRequest component

import UserHome from './UserHome.js';

function UserDash() {
    const [showSideNav, setShowSideNav] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const location = useLocation();
    const { username } = location.state || {};
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

    return (
        <div className="dashboard">
            <div className="top-nav">
                <button className="menu-btn" onClick={toggleSideNav}>
                <span class="glyphicon glyphicon-menu-hamburger"></span>
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
                   
                </ul>
            </div>
            <div className="main-content">
                {/* Render different components based on the activePage state */}
                {activePage === 'home' && <UserHome/>}
                {activePage === 'submit' && <SubmitRequest />}
              
            </div>
        </div>
    );
}

export default UserDash;
