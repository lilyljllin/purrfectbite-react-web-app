import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client"
 
export default function Signin() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState<any>({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const signin = async () => {
        try{
        const currentUser = await client.signin(credentials);
        dispatch(setCurrentUser(currentUser));
        navigate("/PurrfectBite/account/profile");
        } catch(err: any) {
            setError(err.response.data.message);
        }
    };
    return (
        <div id="sign-in-page" className="container-fluid">
            <h1>Sign in</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <input onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                value={credentials.username} className="form-control mb-2" placeholder="username" />
            <input onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                value={credentials.password} className="form-control mb-2" placeholder="password" type="password" />
            <button onClick={signin} className="btn btn-yellow"> Sign in </button>
            <br />
            <Link to="/PurrfectBite/account/signup">Sign up</Link>

        </div>
    );
}