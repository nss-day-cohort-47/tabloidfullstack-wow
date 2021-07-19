import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router";
import { activateUser } from "../../modules/userManager";

const DeactiveUser = ({ user, getUsers }) => {
    const history = useHistory();

    const handleActivate = (e) => {
        e.preventDefault();
        var confirm = window.confirm(`Are you sure you want to Activate ${user.firstName}?`);
        if (confirm) {
            activateUser(user.id)
                .then(() => getUsers())
        }
    }



    return (
        <Card >
            <CardBody className="card-content">
                <img src={user.imageLocation} />
                <p>{user.displayName}</p>
                <p>{user.fullName}</p>
                <p>{user.userType.name}</p>
                <button className="btn button btn-secondary" onClick={handleActivate}>Activate</button>

            </CardBody>
        </Card>
    );
};

export default DeactiveUser;