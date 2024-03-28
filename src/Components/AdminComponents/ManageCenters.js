import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
function AdminView() {
    const [center, setcenter] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5027/api/Admin')
            .then(res => setcenter(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (centerId) => {
        const confirm = window.confirm("Do you like to Delete ?");
        if (confirm) {
            await axios.delete('http://localhost:5027/api/Admin/' + centerId)

                .then(res => {
                    alert("Center Deleted")
                    console.log(centerId)
                })

        }
    }
    
    return (
        <>
            <h1>List of center</h1>
            <div className="d-flex flex-column  align-items-center backgroundcolorset vh-100">
                <div className="w-100 rounded bg-dark border shadow p-4">
                    <div className="d-flex justify-content-end">
                        <Link to ="/addCenters" className="btn btn-sm btn-success">Add +</Link>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Center ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Location</th>
                            
                                <th>personal Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                center.map((center, index) => (
                                    <tr key={index}>
                                        <td>{center.centerId}</td>
                                        <td>{center.center_Name}</td>
                                        <td>{center.email}</td>
                                        <td>{center.phone_number}</td>
                                        
                                        <td>{center.centerLocation}</td>
                                        <td>{center.password}</td>
                                        
                                        <td>{center.personal_Email}</td>
                                        
                                       
                
                                        <td> <button onClick={() => handleDelete(center.centerId)} className="btn btn-danger m-1">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
 
export default AdminView;