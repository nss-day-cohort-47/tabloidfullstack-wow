import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addCategory } from "../../modules/categoryManager";

const CategoryForm = () => {
    const emptyCategory = {
        name: ''
    };

    const [newCategory, setNewCategory] = useState(emptyCategory);
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const categoryCopy = { ...newCategory };

        categoryCopy[key] = value;
        setNewCategory(categoryCopy);
    };

    const handleSave = (evt) => {
        evt.preventDefault();

        addCategory(newCategory).then((c) => {
            history.push("/category");
        });



    };



    return (
        <Form>
            <h2>New Category</h2>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="category name"
                    value={newCategory.name}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/category`)}>Cancel</Button>

        </Form>
    );
};

export default CategoryForm;
