import { Route, Routes, Navigate, useNavigate } from "react-router";
import ProfileEditor from "./ProfileEditor";
import Signin from "./Signin";
import { useSelector } from "react-redux";
import Signup from "./Signup";
import Following from "./Following";
import UserProfile from "../Users/UserProfile";
import Profile from "./Profile";
import SavedRecipes from "../SavedRecipes";

export default function Account() {
    
    const {currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="account-routes">
        <Routes>
          <Route path="/" element={<Navigate to={currentUser ? "/profile" : "signin"} />} />
          <Route path="profile/:uid" element={<UserProfile />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="profile/editor" element={<ProfileEditor/>} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile/following" element={<Following />} />
          <Route path=":uid/saved" element={<SavedRecipes />} />
          
        </Routes>
        </div>
    );
}