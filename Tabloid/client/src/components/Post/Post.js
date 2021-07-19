import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
import { deletePost, updatePost } from '../../modules/postManager'
import { useHistory } from "react-router";
    
const Post = ({ post, showEditAndDelete }) => {
    const postId = post.id
    const history = useHistory();
    // const [isLoading, setIsLoading] = useState(false);
    // const [editPost, setEditPost] = useState([]);

    const handleDeletePost = (id) => {
        if (window.confirm("are you sure you want to delete this post?"))
        {
            deletePost(id)
            .then((p) => {
                history.push(`/post`);
            })
        }

    // const handleEdit = (evt) => {
    //     evt.preventDefault();
    //     setIsLoading(true);


    //      const editedPost = {
    //         title: editPost.title,
    //         content: editPost.content,
    //         headerImage: editPost.headerImage,
    //         publishDateTime: editPost.publishDateTime
    //     };
    //     updatePost(editedPost).then((p) => {
    //         history.push("/post");
    //     });
    // }

    // useEffect(() => {
        
    // })
    
    }
    if (showEditAndDelete === true)
    {
        return (
            <Card >
                <CardBody>
                    <Link to={`/post/details/${postId}`}>
                    <p><b>Title: </b>{post.title}</p>
                    </Link>
                    <p><b>Author: </b>{post.userProfile.fullName}</p>
                    <p><b>Category: </b>{post.category.name}</p>
                    <div>              
                    <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </div> 
                    <Link to={`/post/edit/${postId}`}>
                    <button className="btn btn-light">Edit</button>
                    </Link>
                </CardBody>
            </Card>
        );
    }
    else
    {
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

    }
};

export default Post;