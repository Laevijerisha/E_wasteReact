// import React from 'react'
// import './ViewRequests.css';
// import axios from 'axios';
// import { useEffect,useState } from 'react';
// import Cookies from 'js-cookie';
// function UserHistory() {
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         const userId = Cookies.get('userId');

//         axios.get(`http://localhost:5027/api/Login/User/cookie`)
//             .then(res => {
//                 setItems(res.data);
//                 console.log(res.data);
//             })
//             .catch(err => console.log(err));
//     }, []);

//     return (
//         <div>
//                 <div className="view-requests-page">
//             <h2>View Requests</h2>
//             <div className="requests-table">
//                 <div className="header-row">
//                     <div className="header">item_Name</div>
//                     <div className="header">item_type</div>
//                     <div className="header">item_Quantity</div>
//                     <div className="header">item_Condition</div>
//                     <div className="header">userId</div>
//                 </div>
//                 {requests.map((request, index) => (
//                     <div key={index} className="data-row">
//                         <div className="data">{request.item_Name}</div>
//                         <div className="data">{request.item_type}</div>
//                         <div className="data">{request.item_Quantity}</div>
//                         <div className="data">{request.item_Condition}</div>
//                         <div className="data">{request.userId}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         </div>
//     )
// }

// export default UserHistory
