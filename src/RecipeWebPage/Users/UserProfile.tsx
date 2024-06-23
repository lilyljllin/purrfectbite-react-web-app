import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../Account/reducer";
import { FaHeart } from "react-icons/fa6";
import { IoPersonRemove } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
export default function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { uid } = useParams();
    const [user, setUser] = useState<any>({});
    const [follow, setFollow] = useState(currentUser ? currentUser.following.includes(uid) : false);
    const isDietitian = (user && (user.role === "DIETITIAN"))
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid.toString());
        setUser(user);
    }

    useEffect(() => {
        fetchUser();
    }, [uid]);

    const formatDob = (dob: string | undefined) => {
        if (!dob) return '';
        const date = new Date(dob);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US');
    };

    const followUser = async () => {
        if (!currentUser) {
            navigate("/PurrfectBite/account/signin");
            return;
        }
        if (uid) {
            const user = await client.addFollowing(currentUser._id, uid.toString());
            dispatch(setCurrentUser(user));
            setFollow(true);
        }
    }

    const unfollowUser = async () => {
        if (!currentUser) {
            navigate("/PurrfectBite/account/signin");
            return;
        }
        if (uid) {
            const user = await client.deleteFollowing(currentUser._id, uid.toString());
            dispatch(setCurrentUser(user));
            setFollow(false);
        }
    }

    console.log(uid);
    console.log(currentUser);

    return (
        <div id="user-public-profile" className="container-fluid">
            <h2>{`Welcome to ${user.firstName} ${user.lastName}'s profile`}</h2>
            <div id="user-profile-table" className="table-responsive d-flex justify-content-center align-items-center">
                <table className="table">
                    <tbody className="align-top">
                        <tr>
                            <td><strong>Name: </strong></td>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                        </tr>
                        <br />
                        <tr>
                            <td><strong>Date of Birth:</strong></td>
                            <td>{formatDob(user.dob)}</td>
                        </tr>
                        <br />
                        <tr>
                            <td><strong>Type:</strong></td>
                            <td>{user.role}</td>
                        </tr>
                        <br />
                        <tr>
                            <td><strong>Biography:</strong></td>
                            <td>{user.biography}</td>
                        </tr>
                        <br />
                        <tr>
                            <td><strong>Saved:</strong></td>
                            <td><a href={`#/PurrfectBite/account/${user._id}/saved`} className="brown-link" ><FaHeart className="me-1"/> {`${user.firstName}'s Saved List`}</a></td>
                        </tr>
                        <br />
                        {isDietitian && <tr>
                            <td><strong>Articles Published:</strong></td>
                            <td><a href={`#/PurrfectBite/articles/author/${user._id}`} className="brown-link" ><MdArticle className="me-1"/> {`${user.firstName}'s Published Article`}</a></td>
                        </tr>
                      }
                    </tbody>
                </table>
            </div>
            {!follow && <button className="btn btn-yellow btn-lg float-end" onClick={followUser}><IoPersonAdd className="me-2"/> Follow</button>}
            {follow && <button className="btn btn-yellow btn-lg float-end" onClick={unfollowUser}> <IoPersonRemove className="me-2"/>Unfollow</button>}
        </div>
    );
}
