import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
const Users = () => {
    const [savedUsers, setSaveUsers] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users")
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setSaveUsers(responseData.message);
            } catch (err) {
                alert(err.message, () => {
                    setError(null);
                });
                setError(err.message);
            }
        }
        sendRequest();
    }, [])

    // const ALL_USERS =
    //     [
    //         { id: 'u1', name: 'xyz', pic: 'https://picsum.photos/200', numberoflocation: 2, },
    //         { id: 'u2', name: 'qwe', pic: 'https://picsum.photos/200', numberoflocation: 1, }

    //     ];
    return (
        <React.Fragment>
            {savedUsers && <UsersList items={savedUsers} />}
        </React.Fragment>
    );
};


export default Users;