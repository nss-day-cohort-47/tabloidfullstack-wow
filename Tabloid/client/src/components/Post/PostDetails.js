import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { getPublishedPostById } from "../../modules/postManager";
import { Link } from "react-router-dom";


const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({});
    const { id } = useParams();


    const getPostDetails = () => {
        getPublishedPostById(id)
            .then(setPostDetails)
    }

    const handleDate = () => {

        let date = new Date(postDetails.publishDateTime).toDateString();
        return date;
    };

    useEffect(() => {
        getPostDetails();
    }, []);

    return (
        <Card >
            <CardBody>
                <p><b>Title: </b>{postDetails.title}</p>
                <p><b>Image: </b>{postDetails.headerImage}</p>
                <p><b>Content: </b>{postDetails.content}</p>
                <p><b>Date: </b>{handleDate()}</p>
                <p><b>Author: </b>{postDetails.userProfile?.fullName}</p>
                <Link to={`/comment/PostId/${postDetails.id}`}>
                    <Button className="btn btn-primary">View Comments</Button>
                </Link>
                <Link to={`/comment/add/${postDetails.id}`}>
                    <Button className="btn btn-success">Add Comment</Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default PostDetails;