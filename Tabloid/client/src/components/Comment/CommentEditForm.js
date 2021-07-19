import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updateComment, getCommentById } from "../../modules/commentManager";

const CommentEditForm = () => {

    const [editComment, setEditComment] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getComment = () => {
        getCommentById(id).then(comment => setEditComment(comment));
    }

    const handleInputChange = (event) => {
        const selectedVal = event.target.value;
        const key = event.target.id;
        const commentCopy = { ...editComment };
        commentCopy[key] = selectedVal;
        setEditComment(commentCopy);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const editedComment = {
            id: editComment.id,
            subject: editComment.subject,
            content: editComment.content
        };
        updateComment(editedComment).then(history.push(`/comment/PostId/${id}`))
    }


    useEffect(() => {
        getComment();
    }, [])

    return (
        <Form>
            <h2>Edit Comment</h2>
            <FormGroup>
                <Label for="subject">Subject</Label>
                <Input type="text" name="subject" id="subject" placeholder="Subject" required
                    value={editComment.subject}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content</Label>
                <Input type="text" name="content" id="content" placeholder="Enter Message Here" required
                    value={editComment.content}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-danger" onClick={() => history.push(`/post/details/${id}`)}>Cancel</Button>
        </Form>
    );
};

export default CommentEditForm;