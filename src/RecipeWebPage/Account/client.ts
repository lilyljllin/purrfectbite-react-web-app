import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;


export const signin = async (credentials: any) => {
    const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
    return response.data;
  };
  export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  };
  export const signup = async (credentials: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, credentials);
    return response.data;
  };
  export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
  };
  export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
  };
  export const findUsersByIdList = async (list: string[]) => {
    const response = await axiosWithCredentials.get(`${USERS_API}`, {
      params: { list: list }
    });
    return response.data;
  };
