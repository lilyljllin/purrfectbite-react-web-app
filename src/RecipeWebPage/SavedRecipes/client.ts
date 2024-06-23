import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const SAVED_API = `${REMOTE_SERVER}/api/saved`;


export const createSavedRecipe = async (saved: any) => {
    try {
        const response = await axios.post(SAVED_API, saved);
        return response.data;
    } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Failed to save recipe');
    }
};

export const getSavedRecipes = async (userId: string) => {
    const response = await axios.get(`${SAVED_API}/user/${userId}`);
    return response.data;
};

export const deleteSavedRecipe = async (userId: string, recipeId: string) => {
    try {
        await axios.delete(`${SAVED_API}?userId=${userId}&recipeId=${recipeId}`);
    } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Failed to delete saved recipe');
    }
};

export const checkSavedRecipe = async ( userId: string, recipeId: string) => {
    const response = await axios.get(`${SAVED_API}/find?userId=${userId}&recipeId=${recipeId}`);
    return response.data;
}

export const getRecentSavedByUser = async (userId: string) => {
    const response = await axios.get(`${SAVED_API}/recent/${userId}`);
    return response.data;
}