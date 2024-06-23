import { useSelector } from "react-redux";
import * as client from "./client";
import { useEffect, useState } from "react";
import { PiCatBold } from "react-icons/pi";

export default function Following() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [users, setUsers] = useState<any[]>([]);
    const fetchFollowings = async () => {
        if (currentUser.following.length !== 0 ) {
        const users = await client.findUsersByIdList(currentUser.following);
        setUsers(users);
        }
      };
      useEffect(() => {
        fetchFollowings();
      }, []);
      console.log(currentUser);
      console.log(currentUser.following);
    return (
        <div id="following-table" className="container-fluid">
            <h2>Following({users? users.length: 0})</h2>
            <table className="table">
                <thead>
                    <tr>
                    <th>Name</th><th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td className="text-nowrap"> <a href={`#/PurrfectBite/account/profile/${user._id}`} className="brown-link"><PiCatBold className="icon" /> {user.firstName} {user.lastName}</a></td>
                            <td> {user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}