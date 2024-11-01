import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faMagnifyingGlass, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './ActivityProviders.css';
import axios from 'axios';
// import RequestDetails from './RequestDetails';
import Appbar from '../../components/common/appbar/Appbar';
import RequestsPopup from '../../components/RequestsPopup';




function ActivityProviders() {
    const [Users, setUsers] = useState([]);// State to store all users
    const [showRequests, setShowRequests] = useState(false); // Track requests list visibility
    const [loading, setLoading] = useState(true); // Loading state
    const [showRequestPopup, setShowRequestPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const fetchUsers = async () => {
        try {
            setLoading(true);

            const response = await axios.get('http://localhost:5001/api/users/allUser');
            console.log(response.data);
            setUsers(response.data); // Set the all user data
            // } else if (activeTab === 'accepted') {
            //     const response = await axios.get('http://localhost:5001/api/users/accepted'); // Adjust the endpoint for accepted users
            //     setAcceptedUsers(response.data); // Set the accepted users data

        } catch (error) {
            console.error('There was an error fetching the users!', error);

        } finally {
            setLoading(false); // Stop loading after fetch
        }
    };
    const openRequestDetails = (user) => {
        setSelectedUser(user);
        setShowRequestPopup(true);
    };

    const closeRequestDetails = () => {
        setShowRequestPopup(false);
    };

    const toggleRequests = () => {
        setShowRequests(!showRequests); // Toggle requests list visibility
    };


    const closeRequests = () => {
        setShowRequests(false); // Close the requests list
    };

    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <>

            <div className='activity-container'>
                <Appbar />
                <div className='activity-heading'> <h1 className="activity-heading-h3">Activity Providers</h1>
                </div>
                {loading ? (
                    <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}> Loading...</h1>
                ) : Users?.length > 0 ? (<div className='activity-table-container'>
                 <div style={{position:'sticky',top:'0',padding:'15px',backgroundColor:'white'}}>  <h3 className="activity-table-h3" style={{ marginBottom: '3px' }}>Activity Providers</h3></div>
                    <table className='activity-details '>
                    
                        <thead className='activity-table-head'>
                            <th>Academy Name </th>
                            <th> Request Date</th>
                            <th> Address</th>
                            <th>Contact Number</th>
                            <th>No. of Classes</th>
                            <th></th>


                        </thead>
                        <tbody>
                            {Users?.map((item) => (<tr>
                                {/* {console.log(item) } */}
                                <td> <div className='activity-profile-container'>
                                    <div className='activity-img'><img src={item.logo}></img></div>
                                    <td id='activity-profile-name'> {item?.username}</td>
                                </div></td>

                                <td >{item.requestFiledDate}</td>
                                <td className='activity-address'> Doha</td>
                                <td >{item?.phoneNumber}</td>
                                < td >5</td>

                                <td>
                                    <div style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', padding: '5px' }} >
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faMagnifyingGlass}
                                                style={{ color: "#acc9e0", fontSize: "20px", marginRight: "20px" }}

                                                onClick={() => openRequestDetails(item)}
                                            />
                                            {showRequestPopup && selectedUser && (
                                                <div className="popup-overlay">
                                                    <RequestsPopup
                                                        show={showRequestPopup}
                                                        selectedUser={selectedUser}
                                                        closeRequests={closeRequestDetails}
                                                    />
                                                </div>
                                            )}
                                        </div>


                                    </div>

                                </td>
                            </tr>))
                            }

                        </tbody>
                    </table>

                </div>) : <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', fontSize: '30px', marginTop: '70px' }}>
                    Nothing to Display   </p>}


            </div >

        </>
    )
}

export default ActivityProviders