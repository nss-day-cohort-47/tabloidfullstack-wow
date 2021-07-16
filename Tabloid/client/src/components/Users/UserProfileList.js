import React, { useEffect, useState } from "react";
import UserProfile from './UserProfile';

import { getAllUsers } from "../../modules/userManager";

const UserProfileList = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        getAllUsers().then(u => setUsers(u));
    };

    useEffect(() => {
        getUsers();

    }, []);

    return (
        <div>
            <div className="container">

                {users.map((user) => {
                    return <UserProfile user={user} key={user.id} />
                })}

            </div>
        </div>
    );
};
export default UserProfileList;