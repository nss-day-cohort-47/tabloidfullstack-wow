import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addCategory } from "../../modules/categoryManager";

const PostForm = () => {
    const emptyPost = {
        title: '',
        content: '',
        imageLocation: '',
        createDateTime: '',
        publishDateTime: '',
        isApproved: '',
        CategoryId: '',
        userProfileId: '',
        isDeleted: ''

    };

    const [newPost, setNewPost] = useState(emptyPost);
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const postCopy = { ...newPost };

        postCopy[key] = value;
        setNewPost(postCopy);
    };

    const handleSave = (evt) => {
        evt.preventDefault();

        addPost(newPost).then((p) => {
            history.push("/post/details/");
        });



    };



    return (
        <Form>
            <h2>New Category</h2>
            <FormGroup>
                <Label for="title">Name</Label>
                <Input type="text" name="name" id="name" placeholder="category name"
                    value={newCategory.name}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/post`)}>Cancel</Button>

        </Form>
    );
};

export default CategoryForm;