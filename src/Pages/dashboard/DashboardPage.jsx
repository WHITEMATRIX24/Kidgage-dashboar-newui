import React, { useEffect, useState } from "react";
import "./dashboardPage.css";
import Appbar from "../../components/common/appbar/Appbar";
import axios from "axios";
import { toRedableDateAndTime } from "../../components/utils/redableDate";

const DashboardPage = () => {
  const [activeProviderCounts, setActiveProviderCounts] = useState(0);
  const [campaignsCounts, setCampaignsCounts] = useState(0);
  const [coursesCounts, setCoursesCounts] = useState(0);
  const [leadsGeneratedCount, setLeadsGeneratedCount] = useState(0);
  const [upcommingMeetingsData, setUpcommingMeetingsData] = useState([]);

  // Activity Provider initial data fetching
  const activityProviderInitialDataHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/users/all");
      const count = res.data.length;
      setActiveProviderCounts(count);
    } catch (error) {
      console.log(`Error fetching Activity Providers error:${error}`);
    }
  };

  // Active Campaigns initial Data Handler
  const campaignsInitialDataHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/banners");
      const count = res.data.length;
      setCampaignsCounts(count);
    } catch (error) {
      console.log(`Error fetching Campaigns error: ${error}`);
    }
  };

  // Programs & courses initial Data Handler
  const coursesInitialDataHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/courses/get-all-courses"
      );
      const count = res.data.courseCounts;
      setCoursesCounts(count);
    } catch (error) {
      console.log(`Error fetching courses & Programs error: ${error}`);
    }
  };

  // Leads genetaed initial data Handler
  const leadsGeneratedinitialDataHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/leads/get-all-leads-count"
      );
      const count = res.data.leadsCount;
      setLeadsGeneratedCount(count);
    } catch (error) {
      console.log("Error in fetching leads data", error);
    }
  };

  // upcomming meetings data fetch
  const upcommingMeetingsInitialDataHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/users/meeting-scheduled-users"
      );
      setUpcommingMeetingsData(response.data);
    } catch (error) {
      console.log(
        `error in fetching upcomming meetings data in dashboard error: ${error}`
      );
    }
  };

  useEffect(() => {
    activityProviderInitialDataHandler();
    campaignsInitialDataHandler();
    coursesInitialDataHandler();
    leadsGeneratedinitialDataHandler();
    upcommingMeetingsInitialDataHandler();
  }, []);

  return (
    <div className="dashboardpage-container">
      <Appbar />
      <div className="dashboard-content-wrapper">
        <h3 className="dashboard-content-h3">Dashboard</h3>
        <div className="dashboardpage-tiles-container">
          <div className="dashboardpage-tiles">
            <h2 className="dashboardpage-blue">{activeProviderCounts}</h2>
            <h1 className="dashboard-tile-text">Activity Provider</h1>
          </div>
          <div className="dashboardpage-tiles">
            <h2 className="dashboardpage-green">{leadsGeneratedCount}</h2>
            <h1 className="dashboard-tile-text">Leads generated</h1>
          </div>
          <div className="dashboardpage-tiles">
            <h2 className="dashboardpage-red">{coursesCounts}</h2>
            <h1 className="dashboard-tile-text">Programs & Courses</h1>
          </div>
          <div className="dashboardpage-tiles">
            <h2 className="dashboardpage-yellow">{campaignsCounts}</h2>
            <h1 className="dashboard-tile-text">Active Campaigns</h1>
          </div>
        </div>
        <div className="dashboardpage-table-container">
          <div className="dashboardpage-tables">
            <div className="dashboardpage-table-header">
              <h3 className="dashboardpage-table-header-h3">
                Upcoming Meetings
              </h3>
            </div>
            <div className="dashboardpage-table-wrapper">
              <table className="dashboardpage-table">
                <thead>
                  <tr>
                    <th>Academy Name</th>
                    <th>Meeting Date</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {upcommingMeetingsData &&
                    upcommingMeetingsData.map((meetings) => (
                      <tr key={meetings._id}>
                        <td>{meetings.fullName}</td>
                        <td>
                          {toRedableDateAndTime(meetings.meetingScheduleDate)}
                        </td>
                        <td>{meetings.location}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="dashboardpage-tables">
            <div className="dashboardpage-table-header">
              <h3 className="dashboardpage-table-header-h3">Upcoming Events</h3>
            </div>
            <div className="dashboardpage-table-wrapper">
              <table className="dashboardpage-table">
                <thead>
                  <tr>
                    <th>Academy Name</th>
                    <th>Meeting Date</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>kidga Academy</td>
                    <td>27.03.2021</td>
                    <td>Office, Qata dhoha</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
