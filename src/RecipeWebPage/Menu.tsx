import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
export default function Menu() {
    const navigate = useNavigate();
    
    const [searchType, setSearchType] = useState('recipes');
    const [searchString, setSearchString] = useState("");

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchType === 'recipes') {
            navigate(`/PurrfectBite/recipes/search?search=${searchString}`);
        } else if (searchType === 'articles') {
            navigate(`/PurrfectBite/articles/search?search=${searchString}`);
        }
    };
    const handleSelectChange = (event: any) => {
        const selectedOption = event.target.value;
        if (selectedOption === 'profile') {
          navigate('/PurrfectBite/account/profile');
        } else if (selectedOption === 'saved') {
          navigate(`/PurrfectBite/account/${currentUser._id}/saved`);
        } else if (selectedOption === "signin") {
            navigate('/PurrfectBite/account/signin')
        } else if (selectedOption === "published") {
            navigate (`/PurrfectBite/articles/author/${currentUser._id}`)
        } else if (selectedOption === "users") {
            navigate (`/PurrfectBite/users`)
        }
      };
      const { currentUser } = useSelector((state: any) => state.accountReducer);
      
      const isDietitian = currentUser && (currentUser.role === "DIETITIAN");
      const isAdmin = currentUser && (currentUser.role ==="ADMIN");
      useEffect(() => { 
    }, []);
    
    return (
        <div id="recipe-home-page-menu-bar" className="mid-menu-bar">
            <div id="recipe-menu-bar" className="row container-fluid">
            <form className="col-8 col-md-6">
            <div id="recipe-search-input" className="input-group">
                <span className="input-group-text" id="basic-addon1">
                    <CiSearch className="m-2" />
                </span>
                <input
                    id="recipe-search-field"
                    type="text"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    className="form-control"
                    placeholder="Search"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="form-select"
                >
                    <option value="recipes">Recipes</option>
                    <option value="articles">Articles</option>
                </select>
                <button className="btn btn-brown btn-sm" onClick={handleSearch}>Search</button>
            </div>
        </form>
                <button className="btn btn-brown btn-sm d-none d-md-block col-1 mx-1" onClick={() => navigate("/PurrfectBite/recipes")}>Recipes</button>
                <button className="btn btn-brown btn-sm d-none d-md-block col-1 mx-1" onClick={() => navigate("/PurrfectBite/articles")}>Articles</button>
                <select className="form-select col" onChange={handleSelectChange}>
                    <option selected>Menu</option>
                    {currentUser && <option value="profile">My Profile</option>}
                    {currentUser && <option value="saved">Saved</option>}
                    {isDietitian && <option value="published">Published Articles</option>}
                    {isAdmin && <option value="users">All Users</option>}
                    {!currentUser && <option value="signin">Sign in</option>}
                </select>
            </div>

        </div>
    );
};