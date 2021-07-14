import React from "react";
import { Card, CardBody } from "reactstrap";

const Post = ({ post }) => {
    return (
        <Card >
            <CardBody>
                <p>{post.title}</p>
                <p>{post.userProfile.displayName}</p>
                <p>{post.category.name}</p>
            </CardBody>
        </Card>
    );
};

export default Post;