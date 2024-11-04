import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Campaigns.css";
import {
  faPenToSquare,
  faPlus,
  faToggleOff,
  faToggleOn,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeCampaignAddModal from "../../components/campaignAddModal/campaignAddModal";
import CampaignEditModal from "../../components/campaignEditModal/campaignEditModal";
import Appbar from '../../components/common/appbar/Appbar';
import CampaignDeleteModal from "../../components/campaignDeleteModal/campaignDeleteModal";
function Campaigns() {
  const [showHomeBannerModal, setShowHomeBannerModal] = useState({
    isShow: false,
    tab: null,
  });
  const [showBannerEditModal, setShowBannerEditModal] = useState({
    isShow: false,
    tab: null,
    data: null,
  });
  const [showBannerDeleteModal, setShowBannnerDeleteModal] = useState({
    idShow: false,
    tab: null,
    data: null,
  })
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("tab-1");
  const [MobileBanners, setMobileBanners] = useState([]);
  const [DesktopBanners, setDesktopBanners] = useState([]);
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);

  // home banner add open modal handler
  const openHomeBannerModalHandler = (tab) =>
    setShowHomeBannerModal({ isShow: true, tab });
  // home banner add close modal handler
  const closeHomeBannerModalHandler = () =>
    setShowHomeBannerModal({ isShow: false, tab: null });

  // banner edit modal open handler
  const openBannerEditModal = (tab, data) => {
    setShowBannerEditModal({ isShow: true, tab, data });
  };
  // banner edit modal close handler
  const closeBannerEditModal = () => {
    setShowBannerEditModal({ isShow: false, tab: null, data: null });
  };
  const openBannerDeleteModal = (tab, data) => {
    setShowBannnerDeleteModal({ isShow: true, tab, data });
  }
  const closeBannerDeleteModal = () => {
    setShowBannnerDeleteModal({ isShow: false, tab: null, data: null })
  }
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB").replace(/\//g, ".");
  };
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/banners");
      //   console.log(response.data);
      setBanners(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setLoading(false);
    }
  };
  const fetchDesktopBanners = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/desktop-banners/");
      console.log(response.data);
      setDesktopBanners(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setLoading(false);
    }
  };
  const fetchMobileBanners = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/mobile-banners/");
      // console.log(response.data);
      setMobileBanners(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
    fetchMobileBanners();
    fetchDesktopBanners();
  }, []);

  console.log(banners);

  return (
    <div className="campaign-container">
      <Appbar />
      <div className="campaign-heading">
        {" "}
        <h1 className="campaign-heading-h3"> Campaigns</h1>
      </div>
      <div className="campaign-box-container">
        {loading ? (
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "red",
            }}
          >
            {" "}
            Loading...
          </h1>
        ) : banners.length > 0 ? (
          <div className="tabs">
            <div className="tab">
              <input
                type="radio"
                name="css-tabs"
                id="tab-1"
                class="tab-switch"
                checked={selectedTab === "tab-1"}
                onChange={() => setSelectedTab("tab-1")}
              ></input>
              <label for="tab-1" class="tab-label">
                Home Banner
              </label>

              <div className="tab-content">
                <div className="campaign-button-container">
                  <button
                    className="add-campaign-button"
                    onClick={() => openHomeBannerModalHandler("home")}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#ffffff" }}
                    />
                    Add campaign
                  </button>
                </div>
                {banners.map((item) => (
                  <div className="grid-banner-container">
                    <div className="grid-item ">
                      <img
                        className="home-banner-img"
                        src={item.imageUrl}
                        alt="no image"
                      />
                    </div>
                    <div className="grid-item ">
                      <div className="campaign-details">
                        <p>{item.title}</p>
                        <p>{item.bookingLink}</p>
                        <div className="campaign-date-container">
                          {" "}
                          <p>Starting Date :{formatDate(item.startDate)}</p>{" "}
                          <p>Ending Date: {formatDate(item.endDate)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid-item ">
                      <div className="campaign-actions">
                        <label class="switch">
                          <input type='checkbox' checked={item.status} onChange={toggleChecked}></input>
                          <span class="slider round"></span>
                        </label>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: "#106cb1" }}

                          onClick={() => openBannerEditModal("home", item)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#d70404" }}
                          onClick={() => openBannerDeleteModal("home", item)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='tab'>
              <input
                type="radio"
                name="css-tabs"
                id="tab-2"
                class="tab-switch"
                checked={selectedTab === "tab-2"}
                onChange={() => setSelectedTab("tab-2")}
              ></input>              <label for="tab-2" class="tab-label">Desktop Banner</label>
              <div className='tab-content'>

                <div className='campaign-button-container'>
                  <button className='add-campaign-button' onClick={() => openHomeBannerModalHandler("desktop")}><FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff", }} />Add campaign</button>
                </div>
                {DesktopBanners.map((item) => (<div className='grid-banner-container-desk'>
                  <div className='grid-item '><div ><img className='desktop-banner-img' src={item.imageUrl} alt='no image' /></div></div>
                  <div className='grid-item '>
                    <div className='campaign-details'>
                      <p>{item.title}</p>
                      <p>{item.bookingLink}</p>
                      <div className='campaign-date-container' > <p>Starting Date :{formatDate(item.startDate)}</p> <p style={{ marginRight: "150px" }}>Ending Date :{formatDate(item.endDate)}</p></div>
                    </div>
                  </div>
                  <div className='grid-item '>

                    <div className='campaign-actions'>
                      <div >  <label class="switch">
                        <input type='checkbox' checked={item.status} onChange={toggleChecked}></input>
                        <span class="slider round"></span>
                      </label>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#106cb1", marginLeft: "20px" }} />
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#d70404", marginLeft: "15px" }} onClick={() => openBannerDeleteModal("desktop", item)} />
                      </div>
                    </div>
                  </div>

                </div>))}

              </div>
            </div>

            <div className='tab'>
              <input
                type="radio"
                name="css-tabs"
                id="tab-3"
                class="tab-switch"
                checked={selectedTab === "tab-3"}
                onChange={() => setSelectedTab("tab-3")}
              ></input>              <label for="tab-3" class="tab-label">Mobile Banner</label>
              <div className='tab-content'>

                <div className='campaign-button-container'>
                  <button className='add-campaign-button' onClick={() => openHomeBannerModalHandler("mobile")}><FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff", }} />Add campaign</button>
                </div>
                {MobileBanners.map((item) => (<div className='grid-banner-container'>
                  <div className='grid-item '><div style={{ width: '100%' }}><img className='mobile-banner-img' src={item.imageUrl} /></div></div>
                  <div className='grid-item '>
                    <div className='campaign-details'>
                      <p>{item.title}</p>
                      <p>{item.bookingLink}</p>
                      <div className='campaign-date-container' > <p>Starting Date :{formatDate(item.startDate)}</p> <p>Ending Date :{formatDate(item.endDate)}</p></div>
                    </div>
                  </div>
                  <div className='grid-item '>

                    <div className='campaign-actions'>
                      <label class="switch">
                        <input type='checkbox' checked={item.status} onChange={toggleChecked}></input>
                        <span class="slider round"></span>
                      </label>
                      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#106cb1", }} />
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#d70404", }} onClick={() => openBannerDeleteModal("mobile", item)} />

                    </div>
                  </div>

                </div>))}



              </div>
            </div>
          </div>
        ) : (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "red",
              fontSize: "30px",
              marginTop: "70px",
            }}
          >
            Nothing to Display{" "}
          </p>
        )}
      </div>
      {/* Add modal */}
      {showHomeBannerModal.isShow && (
        <HomeCampaignAddModal
          isShow={showHomeBannerModal.isShow}
          closeHandler={closeHomeBannerModalHandler}
          tab={showHomeBannerModal.tab}
        />
      )}
      {/* edit modal */}
      {showBannerEditModal.isShow && (
        <CampaignEditModal
          isShow={showBannerEditModal.isShow}
          closeHandler={closeBannerEditModal}
          tab={showBannerEditModal.tab}
          modalData={showBannerEditModal.data}
        />
      )}
      {showBannerDeleteModal.isShow && (
        <CampaignDeleteModal
          isShow={showBannerDeleteModal.isShow}
          closeHandler={closeBannerDeleteModal}
          tab={showBannerDeleteModal.tab}
          modalData={showBannerDeleteModal.data}
        />
      )}
    </div>
  );
}

export default Campaigns;
