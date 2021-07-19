import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getById,  } from "../../modules/categoryManager";

const PostEdit = () => {
    const [postEdit, setPostCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const postCopy = { ...editPost };

        postCopy[key] = value;
        setEditPost(postCopy);
    };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        const editedPost = {
            id: editPost.id,
            name: editPost.name
        };
        updatePost(editedPost).then((c) => {
            history.push("/post");
        });

    };
    useEffect(() => {
        getById(id)
            .then(c => {
                setEditPost(p);
                setIsLoading(false)
            });
    }, [id])

    return (
        <Form>
            <h2>Edit Post</h2>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="category name"
                    value={editCategory.name}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleUpdate}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/category`)}>Cancel</Button>
        </Form>
    );
        
};

export default PostEdit;
