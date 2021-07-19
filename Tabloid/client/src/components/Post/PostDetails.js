import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPublishedPostById } from "../../modules/postManager";
import { Link } from "react-router-dom";
import { getAllTagsByPostId } from "../../modules/tagManager";


const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({});
    const [tagsList, setTagsList] = useState([]);
    const { id } = useParams();

    const getTags = () => {
        getAllTagsByPostId(id)
            .then(res => setTagsList(res))
    }

    const getPostDetails = () => {
        getPublishedPostById(id)
            .then(setPostDetails)
    }

    const handleDate = () => {

        let date = new Date(postDetails.publishDateTime).toDateString();
        return date;
    };

    useEffect(() => {
        getTags();
        getPostDetails();
    }, []);

    return (
        <>
        <h2 className="text-center">Details </h2>
        <Card className="w-75 mx-auto">
            <CardBody>
                
                <p><b>Title: </b>{postDetails.title}</p>
                <p><b>Image: </b>{postDetails.headerImage}</p>
                <p><b>Content: </b>{postDetails.content}</p>
                <p><b>Date: </b>{handleDate()}</p>
                <p><b>Author: </b>{postDetails.userProfile?.fullName}</p>
                <Link to={`/comment/PostId/${postDetails.id}`}>
                    <Button className="btn btn-primary">View Comments</Button>
                </Link>
                <Link to={`/comment/add/${postDetails.id}`}>
                    <Button className="btn btn-success">Add Comment</Button>
                </Link>
                <Link to={`/tag/addtag/${postDetails.id}`}>
                    <button>Manage Tags</button>
                </Link>
                <div>
                    <strong>Tags</strong>
                </div>
                <ListGroup horizontal>
                    {tagsList.map(tag => {
                        return (
                            <ListGroupItem className="justify-content-between">{tag.name}</ListGroupItem>
                        )
                    })}
                </ListGroup>
            </CardBody>
        </Card >
        </>
    );
};

export default PostDetails;