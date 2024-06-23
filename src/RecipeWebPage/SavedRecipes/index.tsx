import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as client from './client';
import { Link, useParams } from 'react-router-dom';

export default function SavedRecipes() {
    const { uid} = useParams();
    // const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [savedRecipes, setSavedRecipes] = useState([]);

    const fetchSavedRecipes = async () => {
        if (uid) {
            const recipes = await client.getSavedRecipes(uid);
            setSavedRecipes(recipes);
        }
    };

    useEffect(() => {
        fetchSavedRecipes();
    }, [uid]);

    return (
        <div className="container-fluid">
            <h2>Saved Recipes ({savedRecipes? savedRecipes.length : 0}):</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {savedRecipes && savedRecipes.map((saved: any) => (
                     <div className="col" style={{ width: "250px" }}>
                     <Link to={`/PurrfectBite/recipes/details/${saved.idMeal}`} className="text-decoration-none">
                     <div className="card">
                         <img src={saved.strMealThumb} className="card-img-top" alt="/images/recipe.png" />

                         <div className="card-body">
                             <h4>{saved.strMeal}</h4>
                             <p>Note: {saved.note}</p>
                         </div>
                     </div>
                     </Link>
                 </div>
                ))}
                </div>
            
        </div>
    );
}
