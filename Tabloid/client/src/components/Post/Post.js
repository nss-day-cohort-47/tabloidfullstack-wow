import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
    
const Post = ({ post }) => {
    const postId = post.id
    return (
        <Card >
            <CardBody>
                <Link to={`/post/details/${postId}`}>
                <p><b>Title: </b>{post.title}</p>
                </Link>
                <p><b>Author: </b>{post.userProfile.fullName}</p>
                <p><b>Category: </b>{post.category.name}</p>
                
            </CardBody>
        </Card>
    );
};

export default Post;