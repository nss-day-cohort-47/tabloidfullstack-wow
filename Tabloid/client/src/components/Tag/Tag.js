import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link, } from "react-router-dom";



const Tag = ({ tag, deleteCurrentTag }) => {

    return (
        <Card >
            <CardBody>
                <h4>{tag.name}</h4>
                <Link to={`/tag/${tag.id}`}>
                    <Button>Edit</Button>
                </Link>
                <Button onClick={() => deleteCurrentTag(tag.id)}>Delete</Button>
            </CardBody >
        </Card >
    );
};

export default Tag;