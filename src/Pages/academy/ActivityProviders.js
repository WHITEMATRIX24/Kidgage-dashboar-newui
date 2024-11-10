import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faMagnifyingGlass, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './ActivityProviders.css';
import axios from 'axios';
import Appbar from '../../components/common/appbar/Appbar';
import RequestsPopup from '../../components/RequestsPopup';

function ActivityProviders() {
    const [Users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRequestPopup, setShowRequestPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5001/api/users/allUser', {
                params: {
                    verificationStatus: 'accepted'
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('There was an error fetching the users!', error);
        } finally {
            setLoading(false);
        }
    };

    const openRequestDetails = (user) => {
        setSelectedUser(user);
        setShowRequestPopup(true);
    };

    const closeRequestDetails = () => {
        setShowRequestPopup(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className='activity-container'>
                <Appbar />
                <div className='activity-heading'>
                    <h1 className="activity-heading-h3">Activity Providers</h1>
                </div>
                {loading ? (
                    <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>Loading...</h1>
                ) : Users?.length > 0 ? (
                    <div className='activity-table-container'>
                        <div style={{ position: 'sticky', top: '0', padding: '15px', backgroundColor: 'white' }}>
                            <h3 className="activity-table-h3" style={{ marginBottom: '3px' }}>Activity Providers</h3>
                        </div>
                        <table className='activity-details'>
                            <thead className='activity-table-head'>
                                <tr>
                                    <th>Academy Name</th>
                                    <th>Request Date</th>
                                    <th>Location</th>
                                    <th>Contact Number</th>
                                    <th>No. of Classes</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Users?.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className='activity-profile-container'>
                                                <div className='activity-img'><img src={item.logo} alt="logo" /></div>
                                                <span id='activity-profile-name'>{item?.username}</span>
                                            </div>
                                        </td>
                                        <td>{item.requestFiledDate}</td>
                                        <td className='activity-address'>{item.location}</td>
                                        <td>{item?.phoneNumber}</td>
                                        <td>{item.noOfCourses}</td>
                                        <td>
                                            <div style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', padding: '5px' }}>
                                                <FontAwesomeIcon
                                                    icon={faMagnifyingGlass}
                                                    className='activity-icon'
                                                    onClick={() => openRequestDetails(item)}
                                                />
                                                {showRequestPopup && selectedUser && (
                                                    <div className="popup-overlay">
                                                        <div className="popup-content">
                                                            <RequestsPopup
                                                                show={showRequestPopup}
                                                                selectedUser={selectedUser}
                                                                closeRequests={closeRequestDetails}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', fontSize: '30px', marginTop: '70px' }}>
                        Nothing to Display
                    </p>
                )}
            </div>
        </>
    );
}

export default ActivityProviders;
