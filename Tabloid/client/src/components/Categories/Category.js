import React from "react";
import { Link } from "react-router-dom";

import { Card, CardBody } from "reactstrap";

const Category = ({ category, deleteCat }) => {


    return (
        <Card >
            <CardBody>
                <p>{category.name}</p>
            </CardBody>
            <div className="category-buttons">
                <Link to={`/category/${category.id}`}>
                    <button className="btn btn-primary" >Edit</button>
                </Link>
                <div >
                    <button className="btn btn-primary" onClick={() => deleteCat(category.id)}>Delete</button>
                </div>
            </div>
        </Card>
    );
};

export default Category;