import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getTagById, updateTag } from "../../modules/tagManager";

const TagEditForm = () => {
    const [editTag, setEditTag] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();


    const getById = () => {
        getTagById(id).then(t => setEditTag(t));
    }

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const tagCopy = { ...editTag };

        tagCopy[key] = value;
        setEditTag(tagCopy);
    };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        const tag = {
            id: editTag.id,
            name: editTag.name
        };
        updateTag(tag).then((t) => {
            history.push("/tag");
        });
    }

    useEffect(() => {
        getById();
        setIsLoading(false)
    }, [])

    return (
        <Form>
            <h2>Edit Tag</h2>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Tag name"
                    value={editTag.name}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" disabled={isLoading} onClick={handleUpdate}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/tag`)}>Cancel</Button>
        </Form>
    );
}
export default TagEditForm;