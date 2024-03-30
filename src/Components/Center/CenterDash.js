import React from 'react'
import { useState } from 'react';
import { useLocation, NavLink, Navigate, useNavigate } from 'react-router-dom';
import ViewRequests from '../AdminComponents/ViewRequests';

import ApproveRequest from './ApproveRequest';
function CenterDash() {
    const [showSideNav, setShowSideNav] = useState(false);
    const [activePage, setActivePage] = useState('viewRequests');

    const toggleSideNav = () => {
        setShowSideNav(!showSideNav);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        setShowSideNav(false); // Close side nav after selecting a page
    };

    return (
        <div className="admin-dashboard">
            <div className="top-nav">
                <button className="menu-btn" onClick={toggleSideNav}>
                    Menu
                </button>
                <div className="user-info">
                    <span>Welcome, Center</span>
                    <NavLink to='/'>
                        <button className='logout-btn' onClick={() => alert('Logout')}>Logout</button>
                    </NavLink>
                </div>
            </div>
            
            <div className={`side-nav ${showSideNav ? 'open' : ''}`}>
                <ul>
                    <li className={activePage === 'viewRequests' ? 'active' : ''} onClick={() => handlePageChange('viewRequests')}>Manage Request</li>
                    <li className={activePage === 'approveStatus' ? 'active' : ''} onClick={() => handlePageChange('approveStatus')}>Approved Items Status </li>
                </ul>
            </div>
            <div className="main-content">
                {/* Render different components based on the activePage state */}

                {activePage === 'viewRequests' && <ViewRequests />}
                {activePage === 'approveStatus' && <ApproveRequest />}
            </div>
        </div>
    )
}




export default CenterDash
