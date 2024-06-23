import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const appId = "da25cb5a";
const appKey = "5bdf054bae8a1ed7544c7619761545e2";
export const REMOTE_SERVER = process.env.REACT_APP_RECIPE_SERVER
export const USERS_API = "https://www.themealdb.com/api/json/v1/1";


export const getAllRecipes = async ()=> {
    const response = await axios.get(`${USERS_API}/search.php?s=`);
    return response.data;
};
export const findRecipeById = async (rid: string) => {
    const response = await axios.get(`${USERS_API}/lookup.php?i=${rid}`);
    return response.data;
}
export const searchRecipeByName = async(name: string) => {
    const response = await axios.get(`${USERS_API}/search.php?s=${name}`);
    return response.data;
}