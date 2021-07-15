import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link, } from "react-router-dom";


const Tag = ({ tag }) => {

    return (
        <Card >
            <CardBody>
                <h4>{tag.name}</h4>
                <Link to={`/tag/${tag.id}`}>
                    <Button>Edit</Button>
                </Link>
            </CardBody >
        </Card >
    );
};

export default Tag;