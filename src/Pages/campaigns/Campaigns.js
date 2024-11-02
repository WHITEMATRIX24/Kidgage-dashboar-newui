import React, { useState } from "react";
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

function Campaigns() {
  const [showHomeBannerModal, setShowHomeBannerModal] = useState({
    isShow: false,
    tab: null,
  });

  // home banner open modal handler
  const openHomeBannerModalHandler = (tab) =>
    setShowHomeBannerModal({ isShow: true, tab });
  // home banner close modal handler
  const closeHomeBannerModalHandler = () =>
    setShowHomeBannerModal({ isShow: false, tab: null });

  return (
    <div className="campaign-container">
      <div className="campaign-heading">
        {" "}
        <h1 className="campaign-heading-h3"> Campaigns</h1>
      </div>
      <div className="campaign-box-container">
        <div className="tabs">
          <div className="tab">
            <input
              type="radio"
              name="css-tabs"
              id="tab-1"
              checked
              class="tab-switch"
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
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
                  Add campaign
                </button>
              </div>
              <div className="grid-banner-container">
                <div className="grid-item ">
                  <img
                    className="banner-img"
                    src="https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg"
                    alt="no image"
                  />
                </div>
                <div className="grid-item ">
                  <div className="campaign-details">
                    <p>Kidga Accedemy phy activity</p>
                    <p>
                      Link :
                      https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/
                    </p>
                    <div className="campaign-date-container">
                      {" "}
                      <p>Starting Date :</p> <p>Ending Date :</p>
                    </div>
                  </div>
                </div>
                <div className="grid-item ">
                  <div className="campaign-actions">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider round"></span>
                      </label>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#106cb1" }}
                        size="2x"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#d70404" }}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab">
            <input
              type="radio"
              name="css-tabs"
              id="tab-2"
              checked
              class="tab-switch"
            ></input>
            <label for="tab-2" class="tab-label">
              Desktop Banner
            </label>
            <div className="tab-content">
              <div className="campaign-button-container">
                <button
                  className="add-campaign-button"
                  onClick={() => openHomeBannerModalHandler("desktop")}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
                  Add campaign
                </button>
              </div>
              <div className="grid-banner-container">
                <div className="grid-item ">
                  <img
                    className="banner-img"
                    src="https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg"
                    alt="no image"
                  />
                </div>
                <div className="grid-item ">
                  <div className="campaign-details">
                    <p>Kidga Accedemy phy activity</p>
                    <p>
                      Link :
                      https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/
                    </p>
                    <div className="campaign-date-container">
                      {" "}
                      <p>Starting Date :</p> <p>Ending Date :</p>
                    </div>
                  </div>
                </div>
                <div className="grid-item ">
                  <div className="campaign-actions">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider round"></span>
                      </label>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#106cb1" }}
                        size="2x"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#d70404" }}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab">
            <input
              type="radio"
              name="css-tabs"
              id="tab-3"
              checked
              class="tab-switch"
            ></input>
            <label for="tab-3" class="tab-label">
              Mobile Banner
            </label>
            <div className="tab-content">
              <div className="campaign-button-container">
                <button
                  className="add-campaign-button"
                  onClick={() => openHomeBannerModalHandler("mobile")}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
                  Add campaign
                </button>
              </div>
              <div className="grid-banner-container">
                <div className="grid-item ">
                  <img
                    className="banner-img"
                    src="https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg"
                    alt="no image"
                  />
                </div>
                <div className="grid-item ">
                  <div className="campaign-details">
                    <p>Kidga Accedemy phy activity</p>
                    <p>
                      Link :
                      https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/
                    </p>
                    <div className="campaign-date-container">
                      {" "}
                      <p>Starting Date :</p> <p>Ending Date :</p>
                    </div>
                  </div>
                </div>
                <div className="grid-item ">
                  <div className="campaign-actions">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider round"></span>
                      </label>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#106cb1" }}
                        size="2x"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#d70404" }}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-banner-container">
                <div className="grid-item ">
                  <img
                    className="banner-img"
                    src="https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg"
                    alt="no image"
                  />
                </div>
                <div className="grid-item ">
                  <div className="campaign-details">
                    <p>Kidga Accedemy phy activity</p>
                    <p>
                      Link :
                      https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/
                    </p>
                    <div className="campaign-date-container">
                      {" "}
                      <p>Starting Date :</p> <p>Ending Date :</p>
                    </div>
                  </div>
                </div>
                <div className="grid-item ">
                  <div className="campaign-actions">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider round"></span>
                      </label>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#106cb1" }}
                        size="2x"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#d70404" }}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-banner-container">
                <div className="grid-item ">
                  <img
                    className="banner-img"
                    src="https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg"
                    alt="no image"
                  />
                </div>
                <div className="grid-item ">
                  <div className="campaign-details">
                    <p>Kidga Accedemy phy activity</p>
                    <p>
                      Link :
                      https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/
                    </p>
                    <div className="campaign-date-container">
                      {" "}
                      <p>Starting Date :</p> <p>Ending Date :</p>
                    </div>
                  </div>
                </div>
                <div className="grid-item ">
                  <div className="campaign-actions">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider round"></span>
                      </label>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#106cb1" }}
                        size="2x"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#d70404" }}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* home banner Modal */}
      {showHomeBannerModal.isShow && (
        <HomeCampaignAddModal
          isShow={showHomeBannerModal.isShow}
          closeHandler={closeHomeBannerModalHandler}
          tab={showHomeBannerModal.tab}
        />
      )}
    </div>
  );
}

export default Campaigns;
