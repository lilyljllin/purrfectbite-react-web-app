import { useState, useEffect  } from "react";
import { useNavigate } from "react-router";
import * as client from "./client";

export default function ProfileEditor() {
    const [profile, setProfile] = useState<any>({});
    const fetchProfile = async () => {
        const thisProfile = await client.profile();
        setProfile(thisProfile);
    };
    useEffect(() => { fetchProfile();}, []);
    const editUser = async () => {
        const thisProfile = await client.updateUser(profile);
        setProfile(thisProfile);
        navigate("/PurrfectBite/account/profile");
    }
    const navigate = useNavigate();
    const formatDateForInput = (dateString: string | undefined) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
      };
    return (
        <div id="profile-editor">
        
        <form className="container-fluid">
            <h3>Profile Editor:</h3>
            <div className="mb-3 row">
                <label htmlFor="first-name" className="form-label col-sm-2">First Name</label>
                <div className="col-sm-10">
                <input className="form-control" id="first-name" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="last-name" className="form-label col-sm-2">Last Name</label>
                <div className="col-sm-10">
                <input className="form-control" id="last-name" value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="date-of-birth" className="form-label col-sm-2">Date of Birth</label>
                <div className="col-sm-10">
                <input type="date" className="form-control" id="date-of-birth" value={formatDateForInput(profile.dob)} onChange={(e) => setProfile({...profile, dob: e.target.value})}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="email" className="form-label col-sm-2">Email</label>
                <div className="col-sm-10">
                <input className="form-control" id="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="biography" className="form-label col-sm-2">Biography</label>
                <div className="col-sm-10">
                <textarea className="form-control" id="biography" value={profile.biography} onChange={(e) => setProfile({...profile, biography: e.target.value})}/>
                </div>
            </div>
            <button className="btn btn-brown float-end" onClick={() => editUser()}>Save</button>
            <button className="btn btn-yellow float-end mx-3" onClick={() => navigate("/PurrfectBite/account/profile")}>Cancel</button>
        </form>
        </div>
    );
}