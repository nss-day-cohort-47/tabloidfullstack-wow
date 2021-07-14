import React from "react";
import { Card, CardBody } from "reactstrap";


const Tag = ({ tag }) => {
    //TODO: Add a link on the Name of the Tag that will route to a Tag Edit Form

    return (
        <Card >
            <CardBody>
                <h4>{tag.name}</h4>
            </CardBody>
        </Card>
    );
};

export default Tag;