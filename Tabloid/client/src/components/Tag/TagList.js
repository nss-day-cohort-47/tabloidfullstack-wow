import React, { useEffect, useState } from "react";
import Tag from './Tag';
import { getAllTags } from "../../modules/tagManager"
import { Link } from "react-router-dom";


const TagList = () => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        getAllTags().then(tag => setTags(tag));
    };

    useEffect(() => {
        getTags();
    }, []);

    return (
        <div className="container">
            <Link to="/tag/add">
                <button className="btn btn-primary">Add Tag</button>
            </Link>
            <div>
                {tags.map((tag) => (
                    <Tag tag={tag} key={tag.id} />
                ))}
            </div>
        </div>
    );
};

export default TagList;
