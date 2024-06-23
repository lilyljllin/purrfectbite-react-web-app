import Heading from "../Heading"
import { CiSearch } from "react-icons/ci";
import Menu from "../Menu";
import * as client from "./client";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import RecipeDetails from "./RecipeDetails";
import { Link } from "react-router-dom";
import RecipeHome from "./RecipeHome";
export default function Recipes() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const fetchRecipes = async () => {
        const allRecipes = await client.getAllRecipes();
        setRecipes(allRecipes.meals);
    }
    useEffect(() => {
        fetchRecipes();
    }, []);
    console.log(recipes);
    return (

        <div id="recipe">
            <Routes>
            <Route path="/" element={<Navigate to="search" />} />
                <Route path="search" element={<RecipeHome />}/>
                <Route path="details/:rid" element={<RecipeDetails />} />
            </Routes>
            </div>
            
    );
}