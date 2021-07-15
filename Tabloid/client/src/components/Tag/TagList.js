import React, { useEffect, useState } from "react";
import Tag from './Tag';
import { getAllTags } from "../../modules/tagManager"


const TagList = () => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        getAllTags().then(tag => setTags(tag));
    };

    useEffect(() => {
        getTags();
    }, []);

    return (
        <div>
            <button className="btn btn-primary">Add Tag</button>
            <div className="container">
                {tags.map((tag) => (
                    <Tag tag={tag} key={tag.id} />
                ))}
            </div>
        </div>
    );
};

export default TagList;
