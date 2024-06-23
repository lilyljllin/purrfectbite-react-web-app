import { useEffect, useState } from "react";
import * as client from "../Recipes/client";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RecipeCards() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const fetchRecipes = async () => {
        const allRecipes = await client.getAllRecipes();
        setRecipes(allRecipes.meals);
    }
    useEffect(() => {
        fetchRecipes();
    }, []);
    return (
        <div id="recipes" className="col-6">
            <h2 className="mb-3 text-start fw-bold">Recipes:</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {recipes.slice(0, 9).map((recipe) => 
                <div className="col" style={{ width: "200px" }}>
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
            )}

            </div>

        </div>
    )
}