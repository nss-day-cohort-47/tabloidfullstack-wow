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

            <div className="container">
                {tags.map((tag) => (
                    <Tag tag={tag} key={tag.id} />
                ))}
            </div>
        </div>
    );
};

export default TagList;
