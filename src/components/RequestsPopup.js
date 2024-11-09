import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faArrowLeft,
  faLocationDot,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmationPopup from "./ConfirmationPopup"; // Import the confirmation popup
import RejectionReasonPopup from "./RejectionReasonPopup";
import "./requestsPopup.css"; // Create a new CSS file for popup-specific styles
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const RequestsPopup = ({ show, closeRequests, selectedUser }) => {
  const popupRef = useRef(null);

  // Handle click outside the popup to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closeRequests();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, closeRequests]);
  const downloadFile = () => {
    const base64String = selectedUser.crFile; // Assuming this is the Base64 string
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64String}`; // Change mime type if needed
    link.download = "CRFile.pdf"; // Provide a default name
    link.click();
  };

  if (!show || !selectedUser) return null;

  console.log(selectedUser);

  return (
    <>
      <div className="popup-overlay"></div>
      <div className="popup-window" ref={popupRef}>
        <button className="request-popup-close-button" onClick={closeRequests}>
          <FontAwesomeIcon
            icon={faTimes}
            className="request-popup-close-icon"
          />
        </button>
        <h3>Request Details</h3>
        <div className="request-popup-wrapper">
          <div className="pending-form">
            <div className="request-popup-header">
              <h4>{selectedUser.username}</h4>
              <div className="request-popup-header-icons">
                <a
                  href={selectedUser?.website}
                  target="_blank"
                  className="request-popup-header-icon-globe-container"
                >
                  <FontAwesomeIcon
                    icon={faGlobe}
                    size="xl"
                    color="#ffffff"
                    className="request-popup-header-icon-globe"
                  />
                </a>
                <a
                  href={`https://www.instagram.com/${selectedUser?.instaId}/`}
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2xl"
                    className="request-popup-header-icon-instagram"
                  />
                </a>
              </div>
            </div>
            <div className="request-popup-content">
              <span className="request-popup-location">
                <strong>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#c02626" }}
                    size="xl"
                  />
                </strong>
                <p>{selectedUser.location}</p>
              </span>
              <p className="request-popup-content-bio">
                {selectedUser.description}
              </p>
              <div className="pending-form-contacts-container">
                <p>
                  <strong>Contact Phone:</strong> {selectedUser.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={downloadFile}
          className="request-popup-download-button"
        >
          Download Uploaded File
        </button>
      </div>
    </>
  );
};

export default RequestsPopup;
