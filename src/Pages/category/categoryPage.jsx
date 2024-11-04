import React, { useEffect, useState } from "react";
import "./categoryPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CategoryAddModal from "../../components/categoryAddModal/categoryAddModal";
import axios from "axios";
import CategoryEditModal from "../../components/categoryEditModal/categoryEditModal";

const CategoryPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryAddModalState, setCategoryAddModalState] = useState(false);
  const [categoryEditModalState, setCategoryEditModalState] = useState({
    isShow: false,
    data: null,
  });

  // Add categroy modal handler
  const categoryAddModalOpenHandler = () => setCategoryAddModalState(true);

  // Add categroy modal handler
  const categoryAddModalCloseHandler = () => setCategoryAddModalState(false);

  // edit category modal Open handler
  const categoryEditModalOpenHandler = (editModalData) =>
    setCategoryEditModalState({
      isShow: true,
      data: editModalData,
    });

  // edit category modal Close handler
  const categoryEditModalCloseHandler = (editModalData) =>
    setCategoryEditModalState({
      isShow: false,
      data: null,
    });

  // initial data handler
  const initialCategoryDataHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/course-category/categories"
      );
      setCategoryData(res.data);
    } catch (error) {
      console.log(`error in fetching categories error: ${error}`);
    }
  };

  // category delete handler
  const deleteCategoryHandler = async (categoryId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5001/api/course-category/delete/${categoryId}`
      );

      if (res.status === 200) {
        alert("successfully delete category");
        return;
      }
      alert(res.data.message);
    } catch (error) {
      console.log(`error in deleting category error: ${error}`);
    }
  };

  useEffect(() => {
    initialCategoryDataHandler();
  }, []);

  return (
    <div className="categorypage-container">
      <h2>Categories</h2>
      <div className="categorypage-content-container">
        <div className="categorypage-content-header">
          <p>Program Categories</p>
          <button onClick={categoryAddModalOpenHandler}>Add Category</button>
        </div>
        <div className="categorypage-card-container">
          {categoryData.map((category) => (
            <div className="categorypage-card" key={category._id}>
              <img src={category.image} alt="category-image" />
              <div className="categorypage-card-details">
                <p>{category.name}</p>
                <div className="categorypage-card-actions-container">
                  <button
                    className="categorypage-card-action-btn categorypage-card-action-edit"
                    onClick={() => categoryEditModalOpenHandler(category)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="categorypage-card-action-btn categorypage-card-action-delete"
                    onClick={() => deleteCategoryHandler(category._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add modal */}
      {categoryAddModalState && (
        <CategoryAddModal
          isShow={categoryAddModalState}
          closeHandler={categoryAddModalCloseHandler}
        />
      )}
      {/* Edit modal */}
      {categoryEditModalState.isShow && (
        <CategoryEditModal
          isShow={categoryEditModalState.isShow}
          closeHandler={categoryEditModalCloseHandler}
          categoryData={categoryEditModalState.data}
        />
      )}
    </div>
  );
};

export default CategoryPage;
