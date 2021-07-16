import React from "react";
import { Card, CardBody } from "reactstrap";
import { activateUser, getAllUsers, } from "../../modules/userManager";

const DeactiveUser = ({ user }) => {

    const handleActivate = (e) => {
        e.preventDefault();
        var confirm = window.confirm(`Are you sure you want to Activate ${user.firstName}?`);
        if (confirm) {
            activateUser(user.Id)
                .then(getAllUsers)
        }
    }



    return (
        <Card >
            <CardBody>
                <p>{user.displayName}</p>
                <p>{user.fullName}</p>
                <p>{user.userType.name}</p>
            </CardBody>
            <button className="btn btn-primary" onClick={handleActivate}>Activate</button>
        </Card>
    );
};

export default DeactiveUser;