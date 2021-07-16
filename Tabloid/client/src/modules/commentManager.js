import { getToken } from "./authManager";

const baseUrl = '/api/comment';

export const getAllCommentsByPostId = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/PostId?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get comments.");
            }
        });
    });
};

export const addComment = (comment) => {
    return getToken().then((token) => {

        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }).
            then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error("An unknown error occurred while trying to save a new comment.");
                }
            });
    });
};

