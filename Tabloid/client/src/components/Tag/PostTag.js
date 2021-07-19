import React, { useState } from "react";
import { Card, CardBody, Button } from "reactstrap";


const PostTag = ({ tag, selectedTagIds, setSelectedTagIds }) => {
    const [isActive, setIsActive] = useState(false);

    const onCheckboxBtnClick = (selected) => {
        const index = selectedTagIds.indexOf(selected);
        if (index < 0) {
            selectedTagIds.push(selected);
        } else {
            selectedTagIds.splice(index, 1);
        }
        setSelectedTagIds([...selectedTagIds]);
        setIsActive(!isActive);
    }

    return (
        <Card >
            <CardBody>
                <h4>{tag.name}</h4>
                <Button color="primary" onClick={() => onCheckboxBtnClick(tag.id)} active={selectedTagIds.includes(tag.id)}>{isActive ? "Remove" : "Add"}</Button>
            </CardBody >
        </Card >
    )
}
export default PostTag