import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
// import { useParams } from "react-router";
import { getAllPostsFromCurrentUser } from "../../modules/postManager";

import Post from "./Post";

const AllPostsFromCurrentUser= () => {
    const [posts, setPosts ] = useState([]);
    // const {id} = useParams();

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
                {posts.map(p => {
                    return (
                        <>
                <h2>Title: {p.title}</h2>
                <p>Author: {p.userProfile?.fullName}</p>
                <p>Category: {p.category?.name}</p> 
                </>)})}
            </div>


                    {/* {posts.map((post) => (
                        <Post post={post} key={post.id} />
                    ))} */}
            </CardBody>
        </Card>
    );
};

export default AllPostsFromCurrentUser;