import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function SavingButton({ rid }: { rid: string }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [save, setSave] = useState({ userId: currentUser?._id, recipeId: rid, note: '' });
    const [savecheck, setSavecheck] = useState(false); // Initial state as false
    const navigate = useNavigate();

    const checkIfRecipeIsSaved = async () => {
        if (currentUser) {
            const saved = await client.checkSavedRecipe(currentUser._id, rid);
            return !!saved; // Ensure it returns a boolean
        }
        return false;
    };

    useEffect(() => {
        const initializeSaveCheck = async () => {
            const isSaved = await checkIfRecipeIsSaved();
            setSavecheck(isSaved);
        };
        if (currentUser) {
            initializeSaveCheck();
        }
    }, [currentUser, rid]); // Dependencies for useEffect

    const saveRecipe = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!currentUser) {
            navigate("/PurrfectBite/account/signin");
            return;
        }
        try {
            await client.createSavedRecipe(save);
            setSavecheck(true); // Recipe is now saved
        } catch (err: any) {
            console.error('Failed to save recipe:', err);
        }
    };

    const unsaveRecipe = async () => {
        if (!currentUser) {
            navigate("/PurrfectBite/account/signin");
            return;
        }
        try {
            await client.deleteSavedRecipe(save.userId, save.recipeId);
            setSavecheck(false); // Recipe is now unsaved
        } catch (err: any) {
            console.error('Failed to unsave recipe:', err);
        }
    };

    return (
        <div id="save-recipe" className="d-flex justify-content-center mb-4">
            {savecheck ? (
                <button className="btn btn-yellow btn-sm" onClick={unsaveRecipe}><FaHeart className="me-1"/> Saved</button>
            ) : (
                <form className="col-8 col-md-6 mb-3" onSubmit={saveRecipe}>
                    <div id="recipe-comment-input" className="input-group">
                        <input
                            id="recipe-save-field"
                            type="text"
                            value={save.note}
                            onChange={(e) => setSave({ ...save, note: e.target.value })}
                            className="form-control"
                            placeholder="Save note"
                        />
                        <button className="btn btn-brown btn-sm" type="submit"><FaRegHeart className="me-1"/> Save</button>
                    </div>
                </form>
            )}
        </div>
    );
}
