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
        <Card >
            <CardBody>
                <p><b>Title: </b>{postDetails.title}</p>
                <p><b>Image: </b>{postDetails.headerImage}</p>
                <p><b>Content: </b>{postDetails.content}</p>
                <p><b>Date: </b>{postDetails.publishDateTime}</p>
                <p><b>Author: </b>{postDetails.userProfile?.fullName}</p>
                <Link to={`/comment/PostId/${postDetails.id}`}>
                    <button>View Comments</button>
                </Link>
                <Link to={`/tag/addtag/${postDetails.id}`}>
                    <button>Manage Tags</button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default PostDetails;