import React, { useEffect, useState } from "react";
import Post from './Post';
import { getAllPosts } from "../../modules/postManager";


const PostList = () => {
    const [posts, setPosts] = useState([]);
 

    const getPosts = () => {
        getAllPosts().then(post => setPosts(post));
    };

    useEffect(() => {
        getPosts();

    }, []);

    return (
        <div className="m-3">

            <div className="container">
                <div className="row m-3 justify-content-center">

                    {posts.map((post) => (
                        <Post post={post} key={post.id} showEditAndDelete={false}/>
                    ))}
                    

                </div>
            </div>
        </div>
    );
};

export default PostList;
