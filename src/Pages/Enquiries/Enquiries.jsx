import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Enquiries.css";
import Appbar from "../../components/common/appbar/Appbar";


const Enquiries = () => {

  const [enquiryData, setEnquiryData] = useState([]);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);

  const fetchProviderAndEnquiry = async () => {
    setError(null);

    const userId = sessionStorage.getItem("userid");
    if (!userId) {
      setError("No user ID found in session storage.");
      return;
    }

    try {
      const providerResponse = await axios.get(
        `http://localhost:5001/api/users/user/${userId}`
      );
      setProvider(providerResponse.data);

      const enquiryResponse = await axios.get(
        `http://localhost:5001/api/enquiries/enquiry-by-providers`,
        {
          params: { providerIds: [userId] },
        }
      );
      setEnquiryData(enquiryResponse.data);
    } catch (error) {
      console.log(`Error fetching courses: ${error}`);
      setError("Error fetching courses");
    }
  };

  useEffect(() => {
    fetchProviderAndEnquiry();
  }, []);
  console.log(enquiryData);
  console.log(provider);




  return (
    <div className="enquiriesPage-container">
      <Appbar />
      <div className="enquiriesPage-content">
        <h3 className="enquiriesPage-content-h3">Enquiries </h3>
        <div className="enquiriesPage-content-container">
          <div className="enquiriesPage-table-wrapper">
            <table className="enquiriesPage-content-table">
              <thead>
                <tr>
                  <th>Parent Name</th>
                  <th>Child's Age</th>
                  <th>Parent Phone</th>
                  <th>Parent Email</th>
                </tr>
              </thead>
              <tbody>
                {
                  error ? (
                    <tr>
                      <td colSpan="6">{error}</td>
                    </tr>
                  ) : (enquiryData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.parentDetails.name}</td>
                      <td>{item.childDetails.age}</td>
                      <td>{item.parentDetails.phone}</td>
                      <td>{item.parentDetails.email}</td>
                    </tr>
                  )))
                }


              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Enquiries;
