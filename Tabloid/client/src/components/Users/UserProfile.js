import React from "react";
import { Link } from 'react-router-dom';
import { Card, CardBody } from "reactstrap";

const UserProfile = ({ user }) => {
    const userId = user.id

    return (
        <Card >
            <CardBody>
                <Link to={`/userProfile/details/${userId}`}>
                    <p>{user.displayName}</p>
                </Link>

                <p>{user.fullName}</p>
                <p>{user.userType.name}</p>
            </CardBody>

        </Card>
    );
};

export default UserProfile;