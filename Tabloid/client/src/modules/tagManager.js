import { getToken } from "./authManager";

const baseUrl = '/api/tag';

export const getAllTags = () => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get tags.");
            }
        });
    });
};

// export const getTagById = (id) => {
//     return getToken().then((token) => {

//         return fetch(`${baseUrl}/details/${id}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => {
//             if (resp.ok) {
//                 return resp.json();
//             } else {
//                 throw new Error("An unknown error occurred while trying to get post details.");
//             }
//         });
//     });
// };