import React, { useEffect, useState } from "react";
import Category from "./Category";
import { Link } from "react-router-dom";
import { getAllCategories, deleteCategory } from "../../modules/categoryManager";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then(c => setCategories(c));
    };

    const deleteCat = (id) => {

        deleteCategory(id)
            .then(() => getCategories())

    }

    useEffect(() => {
        getCategories();

    }, []);

    return (
        <div>

            <div className="container">
                <Link to={`/category/add`}>
                    <button className="btn btn-secondary" >Add New Category</button>
                </Link>

                {categories.map((category) => (
                    <Category category={category} key={category.id} deleteCat={deleteCat} />
                ))}

            </div>

        </div>
    );
};

export default CategoryList;
