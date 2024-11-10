import React, { useEffect, useState } from "react";
import "./appbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const Appbar = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    // Fetch pending requests from the backend
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch("https://kidgage-dashboar-newui.onrender.com/api/users/pending"); // Adjust the URL as needed
        const data = await response.json();
        setPendingRequests(data);
      } catch (error) {
        console.error("Error fetching pending users:", error.message);
      }
    };

    fetchPendingRequests();
  }, []);

  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  // Get name, username, and role from session storage
  const name = sessionStorage.getItem("Name");
  const username = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("adminRole");  // Assuming role is stored in sessionStorage

  return (
    <div className="appbar-container">
      {/* search bar */}
      <div className="appbar-serarch-container">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="searchbar-magnifyglass"
        />
        <input type="search" placeholder="search" className="search-inputbar" />
      </div>
      {/* profile tab */}
      <div className="profile-container">
        {/* bell icon visible only if role is admin */}
        {role === "admin" && (
          <div className="appbar-notification-icon-container" onClick={togglePopup}>
            <FontAwesomeIcon icon={faBell} className="appbar-bellicon" size="xl" />
            {pendingRequests.length > 0 && (
              <span className="appbar-notification-count">{pendingRequests.length}</span>
            )}
          </div>
        )}

        {isPopupVisible && (
          <div className="appbar-notification-popup">
            {/* Close button */}
            <button className="appbar-popup-close-button" onClick={closePopup}>
              &times;
            </button>
            <h2 className="appbar-notification-popup-title">Requests</h2>
            {pendingRequests.length > 0 ? (
              <ul className="appbar-notification-popup-list">
                {pendingRequests.map((request, index) => (
                  <li key={request._id} className="appbar-notification-popup-item">
                    <span className="appbar-request-number">{index + 1}.</span>{" "}
                    {request.fullName} has requested to join Kidgage.
                  </li>
                ))}
              </ul>
            ) : (
              <p className="appbar-notification-popup-item">No pending requests.</p>
            )}
          </div>
        )}
        {/* Profile info */}
        <div className="profile">
          <div className="avatar"></div>
          <div className="profile-info">
            <h1>{name || "User Name"}</h1>
            <p>ID: {username || "No Username"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
