import React from "react";

import { Card, CardBody } from "reactstrap";

const UserProfile = ({ user }) => {


    return (
        <Card >
            <CardBody>
                <p>{user.displayName}</p>
                <p>{user.fullName}</p>
                <p>{user.userType.name}</p>
            </CardBody>

        </Card>
    );
};

export default UserProfile;