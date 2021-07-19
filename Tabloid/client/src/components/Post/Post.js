import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
import { deletePost } from '../../modules/postManager'
import { useHistory } from "react-router";
    
const Post = ({ post, showEditAndDelete }) => {
    const postId = post.id
    const history = useHistory();

    const handleDeletePost = (id) => {
        if (window.confirm("are you sure you want to delete this post?"))
        {
            deletePost(id)
            .then((p) => {
                history.push(`/post`);
            })
        }
    
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