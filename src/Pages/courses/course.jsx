import React, { useEffect, useState } from "react";
import "./course.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Appbar from "../../components/common/appbar/Appbar";
import AddCourseForm from "../../components/AddCourseForm";
import CourseDeleteModal from "../../components/courseDeleteModal/courseDeleteModal"; // Import the modal

const CoursePage = () => {
    const [courseData, setCourseData] = useState([]);
    const [error, setError] = useState(null);
    const [provider, setProvider] = useState(null);
    const [activeTab, setActiveTab] = useState("Programs Offered");
    const [imageIndexes, setImageIndexes] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCourseId, setDeleteCourseId] = useState(null);

    const fetchProviderAndCourses = async () => {
        setError(null);

        const userId = sessionStorage.getItem("userid");
        if (!userId) {
            setError("No user ID found in session storage.");
            return;
        }

        try {
            const providerResponse = await axios.get(
                `https://kidgage-dashboar-newui.onrender.com/api/users/user/${userId}`
            );
            setProvider(providerResponse.data);

            const coursesResponse = await axios.get(
                `https://kidgage-dashboar-newui.onrender.com/api/courses/by-providers`,
                {
                    params: { providerIds: [userId] },
                }
            );
            setCourseData(coursesResponse.data);

            const initialIndexes = {};
            coursesResponse.data.forEach((course) => {
                initialIndexes[course._id] = 0;
            });
            setImageIndexes(initialIndexes);
        } catch (error) {
            console.log(`Error fetching courses: ${error}`);
            setError("Error fetching courses");
        }
    };

    const deleteCourse = async (id) => {
        try {
            const res = await axios.delete(`https://kidgage-dashboar-newui.onrender.com/api/courses/delete/${id}`);
            if (res.status === 200) {
                setCourseData((prevData) => prevData.filter(course => course._id !== id));
                alert("Course deleted successfully");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            alert("Failed to delete course");
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteCourseId(id);
        setShowDeleteModal(true);
    };

    useEffect(() => {
        fetchProviderAndCourses();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndexes((prevIndexes) => {
                const newIndexes = { ...prevIndexes };
                courseData.forEach((course) => {
                    const imageCount = course.images.length;
                    newIndexes[course._id] = (prevIndexes[course._id] + 1) % imageCount;
                });
                return newIndexes;
            });
        }, 3000);

        return () => clearInterval(interval);
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
                                            <button
                                                className="categorypage-card-action-btn categorypage-card-action-delete"
                                                onClick={() => handleDeleteClick(course._id)}
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

            {/* Render the delete modal */}
            {showDeleteModal && (
                <CourseDeleteModal
                    isShow={showDeleteModal}
                    closeHandler={() => setShowDeleteModal(false)}
                    courseDeleteId={deleteCourseId}
                    onConfirmDelete={() => {
                        deleteCourse(deleteCourseId);
                        setShowDeleteModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default CoursePage;
