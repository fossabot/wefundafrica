import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import no_profile from '../../assets/image/no_profile_picture.svg';
import StaticNavBar from '../StaticNavBar/StaticNavBar';
import Navbar from '../Navbar/Navbar';
import DashboardNavbar from '../Dashboard_Navbar/Dashboard_Navbar';
import "./UserDetails.css";
import axios from 'axios';

function UserDetails() {
    const location = useLocation();
    const { selectedUser } = location.state;

    const [selectedStatus, setSelectedStatus] = useState(selectedUser.status);

    const navigate = useNavigate();

    const handleStatusChange = async () => {
        const backendRoot = 
        "http://54.236.11.151";
        // "http://127.0.0.1:8000";
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

        try {
            await axios.put(
                `${backendRoot}/getusers/`,
                { username: selectedUser.username, new_status: selectedStatus },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log('status change successfully');
            navigate("/user/dashboard");
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        // Set the initial selected status when the component mounts
        setSelectedStatus(selectedUser.status);
        // setSelectedStatus(selectedStatus);
    }, [selectedUser.status]);



    if (!selectedUser) {
        return <div>No user details available</div>;
    }

    return (

        <div className="Homepage_master_div">
            <div>
                <StaticNavBar />
            <div className="navbar-for-dashboard">
                <Navbar showApplyNowButton={false} isDashboard={true} />
                </div>
            </div>
            <div>
                <DashboardNavbar />
            </div>
            <div className="dashboard_master_div">

            <div className="details-section">
                <div className='user_detail_heading'>
                    <h2>Details for {selectedUser.username}</h2>
                </div>
                        <div className='user_detail_image'>
                            {/* Show profile picture if available, else display a placeholder image */}
                            {selectedUser.uploaded_files && Object.keys(selectedUser.uploaded_files.profile_pictures).length > 0 ? (
                                Object.keys(selectedUser.uploaded_files.profile_pictures).map((imageName) => (
                                    <img key={imageName} className="user_detail_profile_img" src={`data:image/png;base64,${selectedUser.uploaded_files.profile_pictures[imageName]}`} alt="Profile" />
                                ))
                            ) : (
                                <img className="user_detail_profile_img" src={no_profile} alt='no_profile' />
                            )}
                        </div>
                        <div class="user-info-container">
                            <div class="header">Basic Info</div>
                            <div class="info-row">
                                <div class="info-column">
                                    <strong>First Name:</strong> {selectedUser.first_name}
                                </div>
                                <div class="info-column">
                                    <strong>Last Name:</strong> {selectedUser.last_name}
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-column">
                                    <strong>Username:</strong> {selectedUser.username}
                                </div>
                                <div class="info-column">
                                    <strong>Email:</strong> {selectedUser.email}
                                </div>
                                </div>
                                <div class="info-row">
                                    <div class="info-column">
                                        <strong>Year In Business:</strong> {selectedUser.years_in_business}
                                    </div>
                                    <div class="info-column">
                                        <strong>Monthly Revenue:</strong> {selectedUser.monthly_revenue}
                                    </div>
                                </div>
                                <div class="info-row">
                                    <div class="info-column">
                                        <strong>PO Value:</strong> {selectedUser.po_value}
                                    </div>
                                    <div class="info-column">
                                        <strong>Supplier Quote:</strong> {selectedUser.supplier_quote}
                                    </div>
                                </div>
                                <div class="info-row">
                                    <div class="info-column">
                                        <strong>Status:</strong> {selectedStatus}
                                    </div>
                                    {/* <div class="info-column">
                                        <strong>Change Status:</strong>
                                        <select
                                            value={selectedStatuses[user.id] || ""}
                                            onChange={(e) => setSelectedStatuses({ ...selectedStatuses, [user.id]: e.target.value })}
                                        >
                                            <option value="In Progress">In Progress</option>
                                            <option value="Incomplete">Incomplete</option>
                                            <option value="Complete">Complete</option>
                                        </select>
                                    </div> */}
                                    <div className="info-column">
                                <strong>Change Status:</strong>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="In Progress">In Progress</option>
                                    <option value="Incomplete">Incomplete</option>
                                    <option value="Complete">Complete</option>
                                </select>
                                <button onClick={handleStatusChange}>
                                    Update Status
                                </button>
                            </div>
                                </div>
                            </div>

                        <div class="uploaded-documents-container">
                            {/* <h4>Uploaded Documents</h4> */}
                            <div class="header">Uploaded Documents</div>
                            <div class="uploaded-files-list">
                                <ul>
                                    {selectedUser.uploaded_files && Object.keys(selectedUser.uploaded_files.uploaded_documents).length > 0 ? (
                                        Object.keys(selectedUser.uploaded_files.uploaded_documents).map((fileName, index) => (
                                        <li key={fileName}>
                                            <a
                                            href={`data:application/octet-stream;base64,${selectedUser.uploaded_files.uploaded_documents[fileName]}`}
                                            download={`${selectedUser.username}_${fileName}`}
                                            >
                                            {fileName}
                                            </a>
                                        </li>
                                        ))
                                    ) : (
                                        <li>N/A</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

        
    );
}

export default UserDetails;
