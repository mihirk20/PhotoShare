import React from "react";
import "./UsersList.css"
import Usersitems from "./Usersitems";
const UsersList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No users exists</h2>
            </div>
        );
    };
    return (
        <ul className="userlist">
            {props.items.map((user) => {
                return (
                    <Usersitems
                        key={user._id}
                        id={user._id}
                        name={user.name}
                        pic={user.pic}
                        locationcount={user.locationsid.length} />
                )
            })}
        </ul>
    )
};

export default UsersList;