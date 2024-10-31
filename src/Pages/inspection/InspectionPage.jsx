import React, { useEffect, useState } from "react";
import axios from "axios";

import "./inspectionPage.css";
import Appbar from "../../components/common/appbar/Appbar";
import SuccessIcon from "../../components/iconsSvg/successIcon";
import RejectIcon from "../../components/iconsSvg/rejectIcon";
import { toRedableDate, toRedableDateAndTime } from "../../components/utils/redableDate";
import InspectionRejectModal from "../inspections/reject-modal/inspectionRejectModal";
import InspectionApproveModal from "../inspections/approve-modal/inspectionApproveModal";

const InspectionPage = () => {
  const [meetingScheduledUsers, setMeetingScheduledUsrs] = useState([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false);

  // approve modal open handler
  const openApproveModalHandler = () => setIsApprovedModalOpen(true);
  // approve modal close handler
  const closeApproveModalHandler = () => setIsApprovedModalOpen(false);

  // rejection modal close handler
  const closeRejectModalHandler = () => setIsRejectModalOpen(false);

  // rejection modal open handler
  const openRejectModalHandler = () => setIsRejectModalOpen(true);

  // initial scheduled meeting user data handler
  const meetingScheduledUserDataHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/users/meeting-scheduled-users"
      );
      setMeetingScheduledUsrs(response.data);
    } catch (error) {
      console.log(
        `error in fetching meeting scheduled users initial data error: ${error}`
      );
    }
  };

  useEffect(() => {
    meetingScheduledUserDataHandler();
  }, []);

  return (
    <div className="inspectinPage-container">
      <Appbar />
      <div className="inspectionPage-content">
        <h3 className="inspectionPage-content-h3">Inspection Schedule</h3>
        <div className="inspectionPage-content-container">
          <h3 className="inspectionPage-table-h3">Inspection schedule</h3>
          <div className="inspectionPage-table-wrapper">
            <table className="inspectionPage-content-table">
              <thead>
                <tr>
                  <th>Meeting Date & Time</th>
                  <th>Academy Name</th>
                  <th>Request Date</th>
                  <th>Locations</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {meetingScheduledUsers.length > 0 &&
                  meetingScheduledUsers.map((scheduledUsers, index) => (
                    <tr key={index}>
                      <td>
                        {toRedableDateAndTime(
                          scheduledUsers?.meetingScheduleDate
                        )}
                      </td>
                      <td className="inspectionPage-content-table-academytitle">
                        {/* <img src="" alt="" /> */}
                        {scheduledUsers?.username}
                      </td>
                      <td>{toRedableDate(scheduledUsers?.requestFiledDate)}</td>
                      <td>{scheduledUsers?.location}</td>
                      <td>{scheduledUsers?.phoneNumber}</td>
                      <td>
                        <div className="inspectionPage-content-table-actions">
                          <button onClick={openRejectModalHandler}>
                            <RejectIcon />
                          </button>
                          <button onClick={openApproveModalHandler}>
                            <SuccessIcon />
                          </button>
                        </div>
                      </td>
                      {/* reject modal */}
                      <InspectionRejectModal
                        isShow={isRejectModalOpen}
                        closeHandler={closeRejectModalHandler}
                        userId={scheduledUsers._id}
                      />
                      {/* aprrove modal */}
                      <InspectionApproveModal
                        isShow={isApprovedModalOpen}
                        closeHandler={closeApproveModalHandler}
                        providerData={{
                          username: scheduledUsers?.licenseNo,
                          phoneNumber: scheduledUsers?.phoneNumber,
                          noOfCourses: scheduledUsers?.noOfCourses,
                          email: scheduledUsers?.email,
                          fullName: scheduledUsers?.fullName,
                          userId: scheduledUsers?._id,
                        }}
                      />
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionPage;
