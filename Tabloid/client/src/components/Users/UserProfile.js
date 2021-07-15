import React from "react";
import { Link } from "react-router-dom";

import { Card, CardBody } from "reactstrap";

const UserProfile = ({ userProfile }) => {


    return (
        <Card >
            <CardBody>
                <p>{userProfile.displayName}</p>
                <p>{userProfile.fullName}</p>
                <p>{userProfile.userType.name}</p>
            </CardBody>

        </Card>
    );
};

export default UserProfile;