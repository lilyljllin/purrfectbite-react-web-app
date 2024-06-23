import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as client from "./client";

export default function ProfileEditor() {
    const [profile, setProfile] = useState<any>({ firstName: "", lastName: "", dob: "", email: "", biography: "" });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const thisProfile = await client.profile();
        setProfile(thisProfile || { firstName: "", lastName: "", dob: "", email: "", biography: "" });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const editUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile.firstName?.trim() || !profile.lastName?.trim()) {
            setError("first name and last name cannot be empty.");
            return;
        }
        const thisProfile = await client.updateUser(profile);
        setProfile(thisProfile);
        navigate("/PurrfectBite/account/profile");
    };

    const formatDateForInput = (dateString: string | undefined) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    return (
        <div id="profile-editor">
            <form className="container-fluid" onSubmit={editUser}>
                <h3>Profile Editor:</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3 row">
                    <label htmlFor="first-name" className="form-label col-sm-2">First Name</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            id="first-name"
                            value={profile.firstName}
                            placeholder="first name"
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="last-name" className="form-label col-sm-2">Last Name</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            id="last-name"
                            value={profile.lastName}
                            placeholder="last name"
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="date-of-birth" className="form-label col-sm-2">Date of Birth</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            className="form-control"
                            id="date-of-birth"
                            value={formatDateForInput(profile.dob)}
                            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="email" className="form-label col-sm-2">Email</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            id="email"
                            value={profile.email}
                            placeholder="email(xxx@yyy.com)"
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="biography" className="form-label col-sm-2">Biography</label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            id="biography"
                            value={profile.biography}
                            placeholder="bio"
                            onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                        />
                    </div>
                </div>
                <button className="btn btn-brown float-end" type="submit">Save</button>
                <button className="btn btn-yellow float-end mx-3" type="button" onClick={() => navigate("/PurrfectBite/account/profile")}>Cancel</button>
            </form>
        </div>
    );
}
