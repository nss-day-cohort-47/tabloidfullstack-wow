import DeactiveUser from './UserDeactivate';
import React, { useState, useEffect } from 'react';

import { getAllDeactivatedUsers } from "../../modules/userManager";

const UserDeactivateList = () => {
    const [users, setUsers] = useState([]);


    const getUsers = () => {
        getAllDeactivatedUsers().then(u => setUsers(u));
    };

    useEffect(() => {
        getUsers();

    }, []);

    return (
        <div>
            <div className="container">

                {users.map((user) => {
                    return <DeactiveUser user={user} key={user.id} />
                })}

            </div>
        </div>
    );
};
export default UserDeactivateList;