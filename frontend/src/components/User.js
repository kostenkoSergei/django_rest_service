import React from "react";
import App from "../App";

const UserItem = ({user}) => {
    return (

        <tr>
            <td scope="col">{user.username}</td>
            <td scope="col">{user.firstName}</td>
            {/*<td scope="col">{user.first_name}</td>*/}
            <td scope="col">{user.lastName}</td>
            {/*<td scope="col">{user.last_name}</td>*/}
            <td scope="col">{user.email}</td>
        </tr>

    )
}

const UserList = ({users}) => {
    console.log('hi')
    console.log(users)
    return (

        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Email</th>
                </tr>
                </thead>
                <tbody>
                {users.results.map((user) => <UserItem key={user.id} user={user}/>)}
                </tbody>
            </table>
        </div>

    )
}
export default UserList;