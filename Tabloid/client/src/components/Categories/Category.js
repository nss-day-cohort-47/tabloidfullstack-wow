import React from "react";
import { Card, CardBody } from "reactstrap";

const Category = ({ category }) => {
    return (
        <Card >
            <CardBody>
                <p>{category.name}</p>
            </CardBody>
        </Card>
    );
};

export default Category;