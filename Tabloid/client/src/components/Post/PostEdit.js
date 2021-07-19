import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updatePost, getPublishedPostById  } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

const PostEdit = () => {
    const [editPost, setEditPost] = useState([]);
    const [category, setCategory] = useState([]);
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

    const getCategories = () => {
        return getAllCategories()
        .then(categoriesFromAPI => {
            setCategory(categoriesFromAPI)
        })
    }    

    const handleUpdate = (evt) => {
        evt.preventDefault();
        setIsLoading(true);
    
        const editedPost = {
            id: id,
            title: editPost.title,
            content: editPost.content,
            headerImage: editPost.headerImage,
            publishDateTime: editPost.publishDateTime,
            categoryId: editPost.categoryId
        };
        updatePost(editedPost)
        .then((p) => {
            history.push(`/post/details/${editedPost.id}`);
        });

    };
    useEffect(() => {
        getCategories();
        getPublishedPostById(id)
            .then(p => {
                setEditPost(p);
                setIsLoading(false)
            });
    }, [id])

    return (
        <Form className="container w-75">
            <h2 className="text-center">Edit Post</h2>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="post title"
                    value={editPost.title}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="headerImage">Image</Label>
                <Input type="text" name="headerImage" id="headerImage" placeholder="post headerImage"
                    value={editPost.headerImage}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
           <Label for="category">Category </Label>
            <select value={editPost.categoryId} name="categoryId" id="categoryId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Category</option>
                    {category.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </FormGroup>         
            <FormGroup>
                <Label for="publishDateTime">Publication Date</Label>
                <Input type="date" name="publishDateTime" id="publishDateTime" placeholder="post publish Date Time"
                    value={editPost.publishDateTime}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content</Label>
                <textarea  type="text" name="content" id="content" placeholder="content"
                    value={editPost.content} 
                    rows="10" cols="145" 
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleUpdate}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/myPosts`)}>Cancel</Button>
        </Form>
    );
        
};

export default PostEdit;
