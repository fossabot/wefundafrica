import React, { useState, useContext, useEffect } from 'react';
import './AdminDashboard.css';
import AppContext from '../utils/AppContext';
import axios from 'axios';
import { MdCloudUpload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import no_profile from '../../assets/image/no_profile_picture.svg';

function AdminDashboard() {
    const { userDetail, setUserDetail } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [selectedStatus, setSelectedStatus] = useState(""); // Step 1
    const [selectedStatuses, setSelectedStatuses] = useState({});


    useEffect(() => {
        const backendRoot =
            "http://54.236.11.151";
            // "http://127.0.0.1:8000";
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendRoot}/getusers/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUsers(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleViewDetails = (user) => {
        navigate(`/user-details/${user.id}`, { state: { selectedUser: user } });
    };


    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>User Image</th>
                                <th>Full Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>Details</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        {user.uploaded_files && Object.keys(user.uploaded_files.profile_pictures).length > 0 ? (
                                            // Render images if uploaded_files is not empty
                                            Object.keys(user.uploaded_files.profile_pictures).map((imageName) => (
                                                <img key={imageName} className="profile_images" src={`data:image/png;base64,${user.uploaded_files.profile_pictures[imageName]}`} alt="Profile" />
                                            ))
                                        ) : (
                                            // Display "N/A" if no images are found
                                            <img className="profile_images" src={no_profile} alt='no_profile' />
                                        )}
                                    </td>
                                    <td>{`${user.first_name} ${user.last_name}`}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <button onClick={() => handleViewDetails(user)}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default AdminDashboard;
