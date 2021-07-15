import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPublishedPostById } from "../../modules/postManager";
import { getAllCommentsByPostId } from "../../modules/commentManager";
import CommentCard from "../Comment/CommentCard";


const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({});
    const [comments, setComments] = useState([]);
    const [isHidden, setIsHidden] = useState(true)
    const { id } = useParams();

    const postId = postDetails.id;

    const getCommentsByPostId = () => {
        getAllCommentsByPostId(postId).then((response) => setComments(response));
    }

    const handleViewComments = () => {
        setIsHidden(!isHidden);
    }


    const getPostDetails = () => {
        getPublishedPostById(id)
            .then(setPostDetails)
    }


    useEffect(() => {
        getPostDetails();
        getCommentsByPostId();
    }, []);

    return (
        <>
            <Card >
                <CardBody>
                    {console.log(comments)}
                    <p>{postDetails.title}</p>
                    <p>{postDetails.headerImage}</p>
                    <p>{postDetails.content}</p>
                    <p>{postDetails.publishDateTime}</p>
                    <p>{postDetails.userProfile?.displayName}</p>
                    {comments.map((comment) => <CommentCard comment={comment} key={comment.id} />)}
                </CardBody>
            </Card>
        </>
    );
};

export default PostDetails;