import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router";
import { activateUser, getAllUsers, } from "../../modules/userManager";

const DeactiveUser = ({ user }) => {
    const history = useHistory();

    const handleActivate = (id) => {
        // e.preventDefault();
        var confirm = window.confirm(`Are you sure you want to Activate ${user.firstName}?`);
        if (confirm) {
            activateUser(id)
                .then(history.push(`/userprofile`))
        }
    }



    return (
        <Card >
            <CardBody className="card-content">
                <img src={user.imageLocation} />
                <p>{user.displayName}</p>
                <p>{user.fullName}</p>
                <p>{user.userType.name}</p>
            </CardBody>
            <button className="btn btn-secondary" onClick={handleActivate}>Activate</button>
        </Card>
    );
};

export default DeactiveUser;