import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserById } from "../../modules/userManager";


const UserProfileDetails = () => {
    const [userDetails, setUserDetails] = useState({});
    const { id } = useParams();

    const getUserDetails = () => {
        getUserById(id)
            .then(setUserDetails)
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (

        <Card >
            <CardBody>
                {/* <img alt="image">{userDetails.imageLocation}</img> */}

                <p>{userDetails.fullName}</p>

                <p>{userDetails.displayName}</p>
                <p>{userDetails.email}</p>
                <p>{userDetails.createDateTime}</p>
                <p>{userDetails.userType?.name}</p>
            </CardBody>
        </Card>

    );
};

export default UserProfileDetails;