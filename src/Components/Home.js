import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Home.css';
function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const LearnMore = "https://www.who.int/news-room/fact-sheets/detail/electronic-waste-(e-waste)";
  return (
    <div class="container-fluid">
      <nav className="navbar">
        <div className="nav-wrapper">
          <div className={isOpen ? "navbar-links active" : "navbar-links"}>
            <div className="navbar-logo">E-Waste Management System</div>
            <a href="#home" onClick={toggleNavbar}>
           Home
            </a>
            <a href="#about" onClick={toggleNavbar}>
             About
            </a>
            <a href="#services" onClick={toggleNavbar}>
              Services
            </a>
            <a href="#contact" onClick={toggleNavbar}>
              Contact
            </a>
            <div className="admin-button">
              <NavLink to='/login'>
                <button className="navbarbtn">Login</button>
              </NavLink>
              <NavLink to='/signup'>
                <button className="navbarbtn" style={{ marginLeft: "20px" }}>Signup</button>
              </NavLink>
            </div>
          </div>
          <div className="navbar-toggle" onClick={toggleNavbar}>
            <button className="btn btn-link">
              <span
                className={
                  isOpen
                    ? "glyphicon glyphicon-remove"
                    : "glyphicon glyphicon-menu-hamburger"
                }
              ></span>
            </button>
          </div>
        </div>
      </nav>
      <div class="container" id="home">
      <div className="home-container" style={{textAlign:"center"}}>
            <h1>Welcome to E-Waste Management System</h1>
            <p>Proper disposal of electronic waste is crucial for environmental sustainability.</p>
            <div className="features">
                <div className="feature">
                    <h2>Drop-off Locations</h2>
                    <p>Find the nearest drop-off points for your e-waste.</p>
                    <button>Find Locations</button>
                </div>
                <div className="feature">
                    <h2>Recycling Your E_Waste</h2>
                    <p> You can earn money by just giving your damaged Electronics</p>
                    <button>Schedule Pickup</button>
                </div>
                <div className="feature">
                    <h2>Learn & Educate</h2>
                    <p>Learn about e-waste and how to manage it responsibly.</p>
                    <a href={LearnMore} target="_blank">
                      <button>Learn More</button>
                    </a>
                </div>
            </div>
        </div>
      </div>
      <section class="container" id="about">
      <div className="about-container">
            <h1>About E-Waste Management System</h1>
            <div className="content">
                <p>
                    Our E-Waste Management System is dedicated to promoting responsible disposal and recycling of electronic waste.
                    With the rapid advancement of technology, electronic devices have become an integral part of our lives.
                    However, improper disposal of these devices leads to environmental pollution and health hazards.
                </p>
                <p>
                    At E-Waste Management System, we provide convenient solutions for individuals and businesses to safely dispose of their electronic waste.
                    Whether you're looking to recycle old smartphones, laptops, or other electronic devices, we've got you covered.
                </p>
                <p>
                    Our mission is to raise awareness about the importance of e-waste recycling and to encourage sustainable practices.
                    By partnering with certified recycling facilities, we ensure that your electronic waste is handled responsibly, minimizing its impact on the environment.
                </p>
                <p>
                    Join us in our efforts to create a cleaner and greener future. Together, we can make a difference in e-waste management and environmental conservation.
                </p>
            </div>
        </div>
      </section>

      <section class="container" id="services">
         <div className="about-container">
            <h1>Our Services</h1>
            <div className="content">
                <p>
                    Welcome to our E-Waste Management System, dedicated to promoting responsible disposal and recycling of electronic waste.
                    We offer comprehensive services to make e-waste disposal easy and environmentally friendly.
                </p>
                <div className="services">
                    <div className="service">
                        <h2>Doorstep Collection</h2>
                        <p>Conveniently schedule a doorstep pickup for your electronic waste items.</p>
                    </div>
                    <div className="service">
                        <h2>Recycling Process</h2>
                        <p>Our advanced recycling process ensures that e-waste is properly recycled and disposed of in an eco-friendly manner.</p>
                    </div>
                    <div className="service">
                        <h2>Centers Near You</h2>
                        <p>Find our authorized e-waste recycling centers located near you for drop-off and disposal.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section class="container" id="contact">
        <div className="contact-container">
            <h1>Contact Us</h1>
            <div className="contact-info">
                <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>No 28, Kamaraj street, Virudhunagar-625001</p>
                </div>
                <div className="contact-item">
                    <i className="fas fa-phone-alt"></i>
                    <p>+91 6381786925</p>
                </div>
                <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <p>info@ewastemanagement.com</p>
                </div>
            </div>
            <form className="contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
      </section>
    </div>
  );
}

export default Home;