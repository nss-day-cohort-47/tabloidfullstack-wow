import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addCategory } from "../../modules/categoryManager";

const CategoryForm = () => {
    const emptyCategory = {
        name: ''
    };

    const [category, setCategory] = useState(emptyCategory);
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const categoryCopy = { ...category };

        categoryCopy[key] = value;
        setCategory(categoryCopy);
    };

    const handleSave = (evt) => {
        evt.preventDefault();

        addCategory(category).then((c) => {
            history.push("/category");
        });

    };

    return (
        <Form>
            <h2>New Category</h2>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="category name"
                    value={category.name}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
        </Form>
    );
};

export default CategoryForm;
