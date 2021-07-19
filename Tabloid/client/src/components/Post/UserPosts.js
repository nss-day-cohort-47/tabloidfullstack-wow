import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllPostsFromCurrentUser, getPublishedPostById } from "../../modules/postManager";

import Post from "./Post";

const AllPostsFromCurrentUser= () => {
    const [posts, setPosts ] = useState([]);
   

    const getAllPostsFromUser = () => {
        getAllPostsFromCurrentUser()
        .then(posts => setPosts(posts))
        
    }

    useEffect(() => {
        getAllPostsFromUser()
       
    }, []);

    return (
        <Card >
            <CardBody>
            <div className="row justify-content-center">
                {posts.map((post) => (
                    <Post post={post} key={post.id} showEditAndDelete={true}/>
                ))}
            </div>
            </CardBody>
        </Card>
    );
};

export default AllPostsFromCurrentUser;