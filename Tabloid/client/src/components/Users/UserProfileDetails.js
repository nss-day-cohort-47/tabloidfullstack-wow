import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getUserById } from "../../modules/userManager";


const UserProfileDetails = () => {
    const [userDetails, setUserDetails] = useState({});
    const { id } = useParams();

    const getUserDetails = () => {
        getUserById(id)
            .then(setUserDetails)
    }

    const handleDate = () => {

        let date = new Date(userDetails.createDateTime).toDateString();
        return date;
    };


    useEffect(() => {
        getUserDetails();
    }, []);

    return (

        <Card className="card" >
            <CardBody className="card-details">

                <img src={userDetails.imageLocation} />
                <p><strong>Name:</strong> {userDetails.fullName}</p>

                <p><strong>Display Name:</strong> {userDetails.displayName}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Created:</strong> {handleDate()}</p>
                <p><strong>User Type:</strong> {userDetails.userType?.name}</p>
                <Link to="/userprofile">Go Back</Link>
            </CardBody>
        </Card>

    );
};

export default UserProfileDetails;