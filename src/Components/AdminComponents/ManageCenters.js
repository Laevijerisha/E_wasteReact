import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminView() {
    const [center, setCenter] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5027/api/Admin')
            .then(res => setCenter(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (centerId) => {
        const confirmDelete = window.confirm("Do you want to delete this center?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:5027/api/Admin/${centerId}`)
                .then(res => {
                    alert("Center deleted successfully");
                    console.log(centerId);
                });
        }
    };

    return (
        <>
            <h1>List of Centers</h1>
            <div className="d-flex flex-column align-items-center backgroundcolorset vh-100">
                <div className="w-100 rounded bg-dark border shadow p-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/addCenters" className="btn btn-sm btn-success">Add +</Link>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th className="bg-primary text-white">Center ID</th>
                                <th className="bg-primary text-white">Name</th>
                                <th className="bg-primary text-white">Email</th>
                                <th className="bg-primary text-white">Contact Number</th>
                                <th className="bg-primary text-white">Location</th>
                              
                                <th className="bg-primary text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {center.map((center, index) => (
                                <tr key={index}>
                                    <td>{center.centerId}</td>
                                    <td>{center.center_Name}</td>
                                    <td>{center.email}</td>
                                    <td>{center.phone_number}</td>
                                    <td>{center.centerLocation}</td>
                               
                                    <td>
                                        <button onClick={() => handleDelete(center.centerId)} className="btn btn-danger m-1">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminView;