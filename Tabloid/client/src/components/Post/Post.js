import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
    
const Post = ({ post }) => {
    const postId = post.id
    return (
        <Card >
            <CardBody>
                <Link to={`/post/details/${postId}`}>
                <p>{post.title}</p>
                </Link>
                <p>{post.userProfile.displayName}</p>
                <p>{post.category.name}</p>
            </CardBody>
        </Card>
    );
};

export default Post;