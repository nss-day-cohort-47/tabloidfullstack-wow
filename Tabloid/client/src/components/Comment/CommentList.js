import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import CommentCard from './CommentCard';
import { getAllCommentsByPostId } from "../../modules/commentManager";
import { getPublishedPostById } from "../../modules/postManager";


const CommentList = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    const getPost = () => {
        getPublishedPostById(id).then((res) => setPost(res));
    }

    const getCommentsByPostId = () => {
        getAllCommentsByPostId(id).then((response) => setComments(response));
    }



    useEffect(() => {
        getPost();
        getCommentsByPostId();
    }, [])

    return (
        <div className="container m-2">
            <div className="row justify-content-center">
                <Card >
                    <CardBody>
                        <p><b>Title: </b>{post.title}</p>
                        <p><b>Image: </b>{post.headerImage}</p>
                        <p><b>Content: </b>{post.content}</p>
                        <p><b>Date: </b>{post.publishDateTime}</p>
                        <p><b>Author: </b>{post.userProfile?.fullName}</p>
                        <Link to={`/comment/add/${post.id}`}>
                            <Button className="btn btn-success">Add Comment</Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
            <div className="row justify-content-center">
                {comments.map((comment) =>
                    <CommentCard comment={comment} key={comment.id} getComments={getCommentsByPostId} />
                )}
            </div>
        </div>
    );
}

export default CommentList;