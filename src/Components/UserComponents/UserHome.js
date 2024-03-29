import React from 'react'

function UserHome() {
    return (
        <div>
              <div className='content'>
                <h1 style={{textAlign:"center"}}>E-Waste Management</h1>
                <div className="services-container">
                    <div className="service-card">
                        <h2>Collecting E-Waste</h2>
                        <p>We collect e-waste from your location</p>
                    </div>
                 
                    <div className="service-card">
                        <h2>Processing of E-Waste</h2>
                        <p>We process e-waste to extract valuable materials</p>
                    </div>
                    <div className="service-card">
                        <h2>Repairing of E-Waste</h2>
                        <p>We repair usable e-waste for reuse</p>
                    </div>
                    <div className="service-card">
                        <h2>Recycling of E-Waste</h2>
                        <p>We recycle e-waste using environmentally friendly methods</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHome
