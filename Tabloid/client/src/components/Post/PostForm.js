import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllCategories } from "../../modules/categoryManager";
import { addPost } from '../../modules/postManager';

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
    const [category, setCategory] = useState([]);
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const postCopy = { ...newPost };

        postCopy[key] = value;
        setNewPost(postCopy);
    };

    const getCategories = () => {
        return getAllCategories()
        .then(categoriesFromAPI => {
            setCategory(categoriesFromAPI)
        })
    }    

    const handleSave = (evt) => {
        evt.preventDefault();

        addPost(newPost).then((p) => {
            history.push("/post/details/:id");
        });
    };

    useEffect(() => {
        getCategories();
    }, [])



    return (
        <Form>
            <h2>New Post</h2>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="Title"
                    value={newPost.title}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="title">Content</Label>
                <Input type="text" name="content" id="content" placeholder="content"
                    value={newPost.content} rows="4" cols="40"
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="title">imageLocation </Label>
                <Input type="text" name="imageLocation" id="imageLocation" placeholder="imageLocation"
                    value={newPost.imageLocation}
                    onChange={handleInputChange} />
            </FormGroup>
           <FormGroup>
           <Label for="category">Category </Label>
            <select value={newPost.categoryId} name="categoryId" id="categoryId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Category</option>
                    {category.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </FormGroup>         

            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/post/details/:id`)}>Cancel</Button>

        </Form>
    );
};

export default PostForm;