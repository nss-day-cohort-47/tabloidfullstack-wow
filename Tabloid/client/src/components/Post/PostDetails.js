import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPublishedPostById } from "../../modules/postManager";
import { Link } from "react-router-dom";


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
                        <button>View Comments</button>
                    </Link>
                </CardBody>
            </Card>
        </>
    );
};

export default PostDetails;