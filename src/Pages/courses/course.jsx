import React, { useEffect, useState } from "react";
import "./course.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Appbar from "../../components/common/appbar/Appbar";
import AddCourseForm from "../../components/AddCourseForm";

const CoursePage = () => {
    const [courseData, setCourseData] = useState([]);
    const [error, setError] = useState(null);
    const [provider, setProvider] = useState(null);
    const [activeTab, setActiveTab] = useState("Programs Offered");
    const [imageIndexes, setImageIndexes] = useState({}); // Keeps track of the current image index for each course

    const fetchProviderAndCourses = async () => {
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

            const coursesResponse = await axios.get(
                `http://localhost:5001/api/courses/by-providers`,
                {
                    params: {
                        providerIds: [userId],
                    },
                }
            );
            setCourseData(coursesResponse.data);

            // Initialize the image indexes for each course
            const initialIndexes = {};
            coursesResponse.data.forEach((course) => {
                initialIndexes[course._id] = 0; // Start with the first image for each course
            });
            setImageIndexes(initialIndexes);
        } catch (error) {
            console.log(`Error fetching courses: ${error}`);
            setError("Error fetching courses");
        }
    };

    useEffect(() => {
        fetchProviderAndCourses();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndexes((prevIndexes) => {
                const newIndexes = { ...prevIndexes };
                courseData.forEach((course) => {
                    const imageCount = course.images.length; // Assuming each course has an array of images
                    newIndexes[course._id] = (prevIndexes[course._id] + 1) % imageCount;
                });
                return newIndexes;
            });
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [courseData]);

    return (
        <div className="categorypage-container">
            <Appbar />
            <h3 className="category-content-h3">Courses</h3>
            <div className="categorypage-content-container">
                <div className="coursepage-content-header">
                    <button
                        className={`tab-button ${activeTab === "Programs Offered" ? "active" : ""}`}
                        onClick={() => setActiveTab("Programs Offered")}
                    >
                        Programs Offered
                    </button>
                    <button
                        className={`tab-button ${activeTab === "Add Course" ? "active" : ""}`}
                        onClick={() => setActiveTab("Add Course")}
                    >
                        Add Course
                    </button>
                </div>

                {activeTab === "Programs Offered" ? (
                    <div className="categorypage-card-container">
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            courseData.map((course) => (
                                <div className="categorypage-card" key={course._id}>
                                    <img
                                        src={course.images[imageIndexes[course._id]]}
                                        alt="course-image"
                                    />
                                    <div className="categorypage-card-details">
                                        <p>{course.name}</p>
                                        <div className="categorypage-card-actions-container">
                                            {/* <button
                                                className="categorypage-card-action-btn categorypage-card-action-edit"
                                                onClick={() => alert("Edit Course")}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button> */}
                                            <button
                                                className="categorypage-card-action-btn categorypage-card-action-delete"
                                                onClick={() => alert("Delete Course")}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <AddCourseForm providerId={provider ? provider._id : null} />
                )}
            </div>
        </div>
    );
};

export default CoursePage;
