
import { getToken } from "./authManager";

const baseUrl = '/api/userprofile';


export const getAllUsers = () => {
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
                throw new Error("An unknown error occurred while trying to get users.");
            }
        });
    });
};

export const getAllDeactivatedUsers = () => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/deactivated`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get users.");
            }
        });
    });
};

export const getUserById = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get user details.");
            }
        });
    });
};

export const activateUser = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/activate/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to activate this user.');
            }
        })

    });
};

export const deactivateUser = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/deactivate/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to deactivate this user.');
            }

        })

    });
};

