import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';

const CommentCard = ({ comment }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <strong>{comment.subject}</strong>
                </CardTitle>
                <CardText>
                    <p>Author: {comment.userProfile.displayName}</p>
                    {comment.content}
                    <hr />
                    <p>Created On: {comment.createDateTime}</p>
                </CardText>
            </CardBody>
        </Card>
    );
}

export default CommentCard;