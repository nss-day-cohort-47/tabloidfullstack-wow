import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addComment, getAllCommentsByPostId } from "../../modules/commentManager";

const CommentEditForm = () => {



    return (
        <Form>
            <h2>Edit Comment</h2>
            <FormGroup>
                <Label for="subject">Subject</Label>
                <Input type="text" name="subject" id="subject" placeholder="Subject" required
                    value={newComment.subject}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content</Label>
                <Input type="text" name="content" id="content" placeholder="Enter Message Here" required
                    value={newComment.content}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-danger" onClick={() => history.push(`/post/details/${id}`)}>Cancel</Button>
        </Form>
    );

};

export default CommentEditForm;