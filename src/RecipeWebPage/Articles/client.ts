import axios from "axios"
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ARTICLES_API = `${REMOTE_SERVER}/api/articles`;
export const createArticle = async (article: any) => {
    const response = await axios.post(`${ARTICLES_API}`, article);
    return response.data;
};
export const deleteArticle = async (articleId: string) => {
    const response = await axios.delete(`${ARTICLES_API}/${articleId}`);
    return response.data;
};
export const editArticle = async (articleId: string, article: any) => {
    const response = await axios.put(`${ARTICLES_API}/${articleId}`, article);
    return response.data;
};
export const findArticlesByAuthor = async (userId: string) => {
    const response = await axios.get(`${ARTICLES_API}/${userId}/find`);
    return response.data;
};
export const getAuthorOfArticle = async (articleId: string) => {
    const response = await axios.get(`${ARTICLES_API}/author/${articleId}`);
    return response.data;
};
export const getAllArticles = async() => {
    const response = await axios.get(ARTICLES_API);
    return response.data;
};
export const findArticleById = async (articleId: string) => {
    const response = await axios.get(`${ARTICLES_API}/${articleId}`);
    return response.data;
};
export const searchArticles = async (search: string) => {
    const response = await axios.get(`${ARTICLES_API}?search=${search}`);
    return response.data;
};
export const deleteArticlesByAuthor = async (userId: string) => {
    const response = await axios.delete(`${ARTICLES_API}/author/${userId}`);
    return response.data
}
