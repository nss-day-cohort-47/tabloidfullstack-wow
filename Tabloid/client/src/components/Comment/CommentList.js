import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentCard from './CommentCard';
import { getAllCommentsByPostId } from "../../modules/commentManager";


const CommentList = () => {

    const [comments, setComments] = useState([]);
    const { id } = useParams();

    // const postId = Id;
    const getCommentsByPostId = () => {
        getAllCommentsByPostId(id).then((response) => setComments(response));
    }

    useEffect(() => {
        getCommentsByPostId();
    }, [])

    return (
        <div>
            {comments.map((comment) =>
                <CommentCard comment={comment} key={comment.id} />
            )}
        </div>
    );
}

export default CommentList;