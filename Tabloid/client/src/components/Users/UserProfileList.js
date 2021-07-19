import React, { useEffect, useState } from "react";
import UserProfile from './UserProfile';
import { Link } from "react-router-dom";
import { getAllUsers } from "../../modules/userManager";

const UserProfileList = () => {
    const [users, setUsers] = useState([]);
    let isSelected = false;

    const getUsers = () => {
        getAllUsers().then(u => setUsers(u));
    };


    useEffect(() => {
        getUsers();

    }, []);

    return (
        <div>
            <div className="container">
                <Link to={`/userProfile/deactivated`}>
                    <button>View Deactivated</button>
                </Link>
                {users.map((user) => {
                    return <UserProfile user={user} key={user.id} isSelected={isSelected} getUsers={getUsers} />
                })}

            </div>
        </div>
    );
};
export default UserProfileList;