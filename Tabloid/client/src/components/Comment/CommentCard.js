import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { deleteComment } from '../../modules/commentManager';
import { Link } from "react-router-dom";


const CommentCard = ({ comment, getComments }) => {

    // const history = useHistory();

    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this comment?")) {
            deleteComment(comment.id).then(() => getComments());

        }
    }
    return (
        <Card className="m-2 w-50">
            <CardBody>
                <CardTitle>
                    <strong>Subject: {comment.subject}  |  Author: {comment.userProfile.displayName}  |  Created On: {comment.createDateTime}</strong>
                    <hr />
                </CardTitle>
                <CardText>
                    <p>Comment: {comment.content}</p>
                </CardText>
                <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
                <Link to={`/comment/edit/${comment.id}`}>
                    <Button className="btn btn-info">Edit Comment</Button>
                </Link>

            </CardBody>
        </Card>
    );
}

export default CommentCard;