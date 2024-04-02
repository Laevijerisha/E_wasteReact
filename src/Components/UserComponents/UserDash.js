import React from 'react';
import './UserDash.css';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import SubmitRequest from './SubmitRequest.js'; // Import the SubmitRequest component

import UserHome from './UserHome.js';
import UserHistory from './UserHistory';

function UserDash() {
    useEffect(() => {
        axios.post('http://localhost:5027/api/Login/User/cookie', {
            email: Cookies.get('email')
        })
            .then(res => {
                Cookies.set('userid', res.data.userId, { expires: 7 });
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [])

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
    const Navigate=useNavigate();
    function Logout(){
        Cookies.remove('email');
        Cookies.remove('userid');
        Navigate('/');
    }

    return (
        <div className="dashboard">
            <div className="top-nav">
                <button className="menu-btn" onClick={toggleSideNav}>
                    <span class="glyphicon glyphicon-menu-hamburger"></span>
                </button>
                <div className="user-info">

                    <span>Welcome, {username || 'User'}</span>
                    
                        <button className='logout-btn' onClick={Logout}>Logout</button>
                    
                </div>
            </div>

            <div className={`side-nav ${showSideNav ? 'open' : ''}`}>
                <ul>
                    <li className={activePage === 'home' ? 'active' : ''} onClick={() => handlePageChange('home')}>Home</li>

                    <li className={activePage === 'submit' ? 'active' : ''} onClick={() => handlePageChange('submit')}>Submit Request</li>
                    <li className={activePage === 'userHistory' ? 'active' : ''} onClick={() => handlePageChange('userHistory')}>User History</li>

                </ul>
            </div>
            <div className="main-content">
                {/* Render different components based on the activePage state */}
                {activePage === 'home' && <UserHome />}
                {activePage === 'submit' && <SubmitRequest />}
                {activePage === 'userHistory' && <UserHistory />}

            </div>
        </div>
    );
}

export default UserDash;
