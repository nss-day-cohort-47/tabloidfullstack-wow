import React, { useEffect, useState } from "react";
import { getAllTags, saveTagsToPost } from "../../modules/tagManager"
import { Link, useHistory, useParams } from "react-router-dom";
import PostTag from "./PostTag";
import { Button } from "reactstrap"



const AddTagToPost = () => {
    const [tags, setTags] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const getTags = () => {
        getAllTags().then(tag => setTags(tag));
    };

    const handleSave = (evt) => {
        evt.preventDefault();

        saveTagsToPost(id, selectedTagIds).then((res) => {
            history.push(`/post/details/${id}`);
        });
    }

    useEffect(() => {
        getTags();
    }, []);

    return (
        <div className="container">
            <h1>Select Tags For Post</h1>

            {tags.map((tag) => (
                <PostTag tag={tag} key={tag.id} selectedTagIds={selectedTagIds} setSelectedTagIds={setSelectedTagIds} />
            ))}

            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};

export default AddTagToPost;
