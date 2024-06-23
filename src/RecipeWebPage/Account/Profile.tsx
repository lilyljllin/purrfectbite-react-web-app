import { Route, Routes, Navigate, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import * as client from "./client";
import { log } from "console";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import { FaUserFriends } from "react-icons/fa";
export default function Profile() {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState<any>({});
    const fetchProfile = async () => {
        try {
        const thisProfile = await client.profile();
        setProfile(thisProfile);
        } catch (err: any) {
            navigate("/PurrfectBite/account/signin");
        }
    };
    useEffect(() => { fetchProfile();}, []);
    const navigate = useNavigate();
    const formatDob = (dob: string | undefined) => {
        if (!dob) return '';
        const date = new Date(dob);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US');
      };
    const logout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/PurrfectBite/account/signin");
    }
    const { currentUser} = useSelector((state: any) => state.accountReducer);
    console.log(currentUser)
    return (
        <div id="profile-page" >
            <div className="container-fluid" >
                <h2>My Profile:</h2>
                <div className="d-flex">
                    <div className="col-4 d-none d-sm-block">

                        <br /> <br />
                        <h4>{`Hello ${profile.firstName}! Welcome Back `}</h4>
                    </div>
                    <div className="col-10 col-sm-6">
                        <table>
                            <tbody className="align-top">
                                <tr>
                                    <td><strong>First Name:</strong></td>
                                    <td>{profile.firstName}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td><strong>Last Name:</strong></td>
                                    <td>{profile.lastName}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td><strong>Date of Birth:</strong></td>
                                    <td>{formatDob(profile.dob)}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td><strong>Email:</strong></td>
                                    <td>{profile.email}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td><strong>Biography:</strong></td>
                                    <td>{profile.biography}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td><strong>Type:</strong></td>
                                    <td>{profile.role}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td><strong>Following:</strong></td>
                                    <td><a href={"#/PurrfectBite/account/profile/following"} className="brown-link"> <FaUserFriends className="me-1"/> My Following List</a></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="col-2 d-flex flex-column">
                        <button className="btn btn-yellow mb-2 " onClick={() => navigate("/PurrfectBite/account/profile/editor")}>Edit Profile</button>
                        <button className="btn btn-brown" onClick={logout}>Log out</button>
                    </div>
                </div>
            </div>


        </div>
    );
}