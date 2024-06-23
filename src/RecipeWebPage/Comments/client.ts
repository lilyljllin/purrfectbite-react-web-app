import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const COMMENTS_API = `${REMOTE_SERVER}/api/comments`;

export const createComment = async (comment: any) => {
    const response = await axios.post(`${COMMENTS_API}`, comment);
    return response.data;
};
export const findCommentsByPost = async (postId: any) => {
    const response = await axios.get(`${COMMENTS_API}/recipe/${postId}`);
    return response.data;
};
export const deleteComment = async (commentId: string) => {
    const response = await axios.delete(`${COMMENTS_API}/${commentId}`);
    return response.data;
};
export const deleteByUser = async (userId: string) => {
    const response = await axios.delete(`${COMMENTS_API}/user/${userId}`);
    return response.data;
};