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
        <div>

            <div className="container">
                <div className="row justify-content-center">

                    {posts.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}

                </div>
            </div>
        </div>
    );
};

export default PostList;
