import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllPostsFromCurrentUser } from "../../modules/postManager";

const AllPostsFromCurrentUser= () => {
    const [posts, setPosts ] = useState([]);
    const {id} = useParams();

    const getAllPostsFromUser = () => {
        getAllPostsFromCurrentUser(id)
        .then(posts => setPosts(posts))
    }

    useEffect(() => {
        getAllPostsFromUser()
 
    }, []);

    return (
        <Card >
            <CardBody>
                <p>{posts.title}</p>
                <p>{posts.userProfile.displayName}</p>
                <p>{posts.category.name}</p>
                
            </CardBody>
        </Card>
    );
};

export default AllPostsFromCurrentUser;