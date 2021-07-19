import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, CardBody, ListGroup } from "reactstrap";
import { deactivateUser } from "../../modules/userManager";

const UserProfile = ({ user, getUsers }) => {
    const userId = user.id;

    const handleDeactivate = (e) => {
        e.preventDefault();
        var confirm = window.confirm(`Are you sure you want to deactivate ${user.firstName}?`);
        if (confirm) {
            deactivateUser(user.id)
                .then(() => getUsers())

        }

    }

    return (
        <Card >
            <CardBody className="card-content">
                <img src={user.imageLocation} />

                <Link to={`/userProfile/details/${userId}`}>
                    <p>{user.displayName}</p>
                </Link>
                <p>{user.fullName}</p>
                <p>{user.userType.name}</p>
                <div className="button">
                    <button className="btn btn-danger" onClick={handleDeactivate} hidden={!user.active}>{user.active && "Deactivate"}</button>
                </div>
            </CardBody>
        </Card >
    );
};

export default UserProfile;