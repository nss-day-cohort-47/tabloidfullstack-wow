import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addTag } from "../../modules/tagManager";

export default function TagAddForm() {
    const history = useHistory();
    const [tagText, setTagText] = useState();

    const submitForm = (event) => {
        event.preventDefault();
        addTag({ text: tagText })
            .then(() => history.push("/tag"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="tagText">Tag</Label>
                <Input id="tagText" type="textarea" onChange={event => setTagText(event.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button>Save</Button>
            </FormGroup>
        </Form>
    );
}