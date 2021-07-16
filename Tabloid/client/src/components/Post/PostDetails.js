import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPublishedPostById } from "../../modules/postManager";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";


const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({});
    const { id } = useParams();

    const getPostDetails = () => {
        getPublishedPostById(id)
            .then(setPostDetails)
    }

    useEffect(() => {
        getPostDetails();
    }, []);

    return (
        <>
            <Card >
                <CardBody>
                    <p>{postDetails.title}</p>
                    <p>{postDetails.headerImage}</p>
                    <p>{postDetails.content}</p>
                    <p>{postDetails.publishDateTime}</p>
                    <p>{postDetails.userProfile?.displayName}</p>
                    <Link to={`/comment/PostId/${postDetails.id}`}>
                        <Button className="btn btn-primary">View Comments</Button>
                    </Link>
                    <Link to={`/comment/add/${postDetails.id}`}>
                        <Button className="btn btn-success">Add Comment</Button>
                    </Link>
                </CardBody>
            </Card>
        </>
    );
};

export default PostDetails;