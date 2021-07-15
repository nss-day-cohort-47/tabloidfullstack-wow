import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getCategoryById, updateCategory } from "../../modules/categoryManager";

const CategoryEdit = () => {
    const [editCategory, setEditCategory] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const categoryCopy = { ...editCategory };

        categoryCopy[key] = value;
        setEditCategory(categoryCopy);
    };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        // setIsLoading(true);
        const editedCategory = {
            id: editCategory.id,
            name: editCategory.name
        };
        updateCategory(editedCategory).then((c) => {
            history.push("/category");
        });

    };
    useEffect(() => {
        getCategoryById(id)
            .then(c => {
                setEditCategory(c);
                // setIsLoading(false)
            });
    }, [id])

    return (
        <Form>
            <h2>Edit Category</h2>
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

export default CategoryEdit;
