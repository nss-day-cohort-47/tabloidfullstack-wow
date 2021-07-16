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

    const handleDate = () => {

        let date = new Date(userDetails.createDateTime).toDateString();
        return date;
    };
    const image = userDetails.imageLocation

    useEffect(() => {
        getUserDetails();
    }, []);

    return (

        <Card >
            <CardBody>
                {/* {userDetails.imageLocation? } */}
                <img src={image} />
                <p>{userDetails.fullName}</p>

                <p>{userDetails.displayName}</p>
                <p>{userDetails.email}</p>
                <p>{handleDate()}</p>
                <p>{userDetails.userType?.name}</p>
            </CardBody>
        </Card>

    );
};

export default UserProfileDetails;