import { useParams } from "react-router";
import * as client from "./client";
import { useEffect, useState } from "react";
import Comments from "../Comments/comments";
import { useSelector } from "react-redux";
import SavingButton from "../SavedRecipes/SavingButton";

export default function RecipeDetails() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { rid } = useParams();
    const [recipe, setRecipe] = useState<any>({});
    
    const fetchRecipe = async () => {
        if (rid) {
        const thisRecipe = await client.findRecipeById(rid);
        setRecipe(thisRecipe.meals[0]);
        }
    }
    const getIngredientsList = (recipe: any) => {
        const ingredients = [];
        let i = 1;
        while (recipe[`strIngredient${i}`]) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${measure ? measure : ''} ${ingredient}`);
            }
            i++;
        }
        return ingredients;
    };
    
    const ingredients = getIngredientsList(recipe);
    useEffect(() => {
        fetchRecipe();}, [rid]);
        console.log(recipe);
    return (
        <div id="recipe-detail-page" className="container">
            <div className="row">
            <h1 className="display-4 text-center my-3 fw-bold">{recipe.strMeal}</h1>
            { rid && <SavingButton rid={rid} />}
                <div className="col-md-6">
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-6">
                    <h2 className="h4 mt-4">Ingredients</h2>
                    <ul className="list-group list-group-flush">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="list-group-item">{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <h2 className="h4">Steps:</h2>
                    <p className="lead">{recipe.strInstructions}</p>
                </div>
            </div>
            <hr/>
            {rid  && <Comments pid={rid} />}
        </div>
    );
}