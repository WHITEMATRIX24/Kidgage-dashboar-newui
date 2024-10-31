import React from "react";
import "./appbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const Appbar = () => {
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
        {/* bell */}
        <FontAwesomeIcon icon={faBell} className="appbar-bellicon" size="xl" />
        <div className="profile">
          <div className="avatar"></div>
          <div className="profile-info">
            <h1>Abdulvaris</h1>
            <p>ID:3245463656</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
