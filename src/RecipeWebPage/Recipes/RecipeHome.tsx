import * as client from "./client";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import RecipeDetails from "./RecipeDetails";
import { Link } from "react-router-dom";

export default function RecipeHome() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const location = useLocation();

    const fetchRecipes = async (search: string) => {
        const allRecipes = await client.searchRecipeByName(search);
        setRecipes(allRecipes.meals);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('search') || '';
        fetchRecipes(searchQuery);
    }, [location.search]);

    return (
        <div id="recipe-page">
            <Routes>
                <Route path="details/:rid" element={<RecipeDetails />} />
            </Routes>
            <div className="container-fluid">
                <h2>Recipes({recipes ? recipes.length : 0}):</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {recipes && recipes.map((recipe) => (
                        <div className="col" style={{ width: "250px" }} key={recipe.idMeal}>
                            <Link to={`/PurrfectBite/recipes/details/${recipe.idMeal}`} className="text-decoration-none">
                                <div className="card">
                                    <img src={recipe.strMealThumb} className="card-img-top" alt="/images/recipe.png" />
                                    <div className="card-body">
                                        <h4>{recipe.strMeal}</h4>
                                        <p>Category: {recipe.strCategory}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
