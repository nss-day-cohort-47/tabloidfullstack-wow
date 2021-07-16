import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody } from "reactstrap";
import { deactivateUser, getAllUsers, } from "../../modules/userManager";

const UserProfile = ({ user }) => {
    const userId = user.id;
    // const [deactivate, setDeactivate] = useState(false);

    const handleDeactivate = (e) => {
        e.preventDefault();
        var confirm = window.confirm(`Are you sure you want to deactivate ${user.firstName}?`);
        if (confirm) {
            deactivateUser(user.Id)
                .then(getAllUsers)
        }
    }



    return (
        <Card >
            <CardBody>
                <Link to={`/userProfile/details/${userId}`}>
                    <p>{user.displayName}</p>
                </Link>

                <p>{user.fullName}</p>
                <p>{user.userType.name}</p>
            </CardBody>
            <button className="btn btn-primary" onClick={handleDeactivate} hidden={!user.active}>{user.active && "Deactivate"}</button>
        </Card>
    );
};

export default UserProfile;