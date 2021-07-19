import React from "react";
import { Link } from "react-router-dom";

import { Card, CardBody } from "reactstrap";

const Category = ({ category, deleteCat }) => {


    return (
        <Card className="container w-50 m-2 p-2">
            <CardBody className="card-content-category">
                <p>{category.name}</p>
                <div className="category-buttons">
                    <Link to={`/category/${category.id}`}>
                        <button className="btn btn-light">Edit</button>
                    </Link>

                    <button className="btn btn-danger" onClick={() => deleteCat(category.id)}>Delete</button>

                </div>
            </CardBody>

        </Card>
    );
};

export default Category;