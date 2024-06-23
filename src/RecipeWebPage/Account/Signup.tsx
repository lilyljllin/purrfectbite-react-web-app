import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signup() {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>({ role: "USER" });
    const navigate = useNavigate();

    const signup = async () => {
        // Client-side validation
        if (!user.username || !user.password || !user.role) {
            setError("Username, password, and role are required.");
            return;
        }

        try {
            const currentUser = await client.signup(user);
            dispatch(setCurrentUser(currentUser));
            navigate("/PurrfectBite/account/profile/editor");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    return (
        <div id="signup-page" className="container-fluid">
            <h1>Sign up</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
                <input
                    value={user.username || ""}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="form-control mb-2"
                    placeholder="Username"
                />
                <input
                    value={user.password || ""}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                />
                <legend>Please choose a role for sign up</legend>
                <div className="form-check">
                    <input
                        onClick={(e) => setUser({ ...user, role: (e.target as HTMLInputElement).value })}
                        name="type-choices"
                        className="form-check-input"
                        type="radio"
                        id="user"
                        value="USER"
                        checked={user.role === "USER"}
                    />
                    <label className="form-check-label" htmlFor="user">Normal User</label>
                </div>
                <div className="form-check">
                    <input
                        onClick={(e) => setUser({ ...user, role: (e.target as HTMLInputElement).value })}
                        name="type-choices"
                        className="form-check-input"
                        type="radio"
                        id="dietitian"
                        value="DIETITIAN"
                        checked={user.role === "DIETITIAN"}
                    />
                    <label className="form-check-label" htmlFor="dietitian">Registered Dietitian</label>
                </div>
            </form>
            <br/>
            <button onClick={signup} className="btn btn-brown">Sign up</button><br />
            <p>Already a user? <Link to="/PurrfectBite/account/signin">Sign in</Link></p>
        </div>
    );
}
