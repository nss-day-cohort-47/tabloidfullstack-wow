import DeactiveUser from './UserDeactivate';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
                <Link to={`/userProfile`}>
                    <button>Go Back</button>
                </Link>

                {users.map((user) => {
                    return <DeactiveUser user={user} key={user.id} getUsers={getUsers} />
                })}

            </div>
        </div>
    );
};
export default UserDeactivateList;