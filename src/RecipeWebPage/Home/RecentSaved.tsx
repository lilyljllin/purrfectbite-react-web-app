import { useSelector } from "react-redux";
import * as client from  "../SavedRecipes/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
export default function RecentSaved() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [recent, setRecent] = useState<any>({});
    const fetchRecentSaved = async () => {
        const recentSaved = await client.getRecentSavedByUser(currentUser._id);
        setRecent(recentSaved);
    }
    useEffect(() => {fetchRecentSaved();}, []);
    return (
        <div className="container-fluid mb-1">
            <h2 className="fw-bold">Welcome {currentUser.firstName},</h2>
            {!recent && <p >
                <FaRegHeart className="me-1" />Save your favorite{' '}
                <Link to={`/PurrfectBite/recipes/search`} className="brown-link d-inline me-1">
                    recipes 
                </Link>
                now! 
            </p>}
            {recent && 
            <p >
                <FaRegHeart className="me-1" />Check out your{' '}
                <Link to={`/PurrfectBite/recipes/details/${recent.recipeId}`} className="brown-link d-inline">
                    most recently saved recipe
                </Link>
                ! 
            </p>}
        </div>
    );
}