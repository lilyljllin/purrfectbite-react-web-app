import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import * as commentClient from "../Comments/client";
import * as articleClient from "../Articles/client";
import * as client from "../Users/client";
import { useSelector } from "react-redux";
export default function UserTable() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [users, setUsers] = useState<any[]>([]);
    const [role, setRole] = useState("");
    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const fetchUsers = async () => {
      const users = await client.findAllUsers();
      setUsers(users);
    };
    const deleteUser = async (userId: string) => {
        await commentClient.deleteByUser(userId);
        await articleClient.deleteArticlesByAuthor(userId);
        await client.deleteUserFromFollowing(userId);
        await client.deleteUser(userId);
        fetchUsers();

    }
    useEffect(() => {
      fetchUsers();
    }, []);
    return (
        <div id="users-table" className="container-fluid" >
            <select value={role} onChange={(e) => filterUsersByRole(e.target.value)} className="form-select float-start w-25" >
                <option value="">All Roles</option>
                <option value="USER">Users</option>
                <option value="DIETITIAN">Dietitians</option>
                <option value="ADMIN">Administrations</option>
            </select>
            <table className="table">
                <thead>
                    <tr>
                    <th>Name</th><th>Role</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td className="text-nowrap"> <a href={(currentUser && user._id === currentUser._id) ? `#/PurrfectBite/account/profile`:`#/PurrfectBite/account/profile/${user._id}`} className="brown-link">{user.firstName} {user.lastName}</a></td>
                            <td> {user.role}</td>
                            <td> <button className="btn btn-sm btn-brown" onClick={() => deleteUser(user._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  
}