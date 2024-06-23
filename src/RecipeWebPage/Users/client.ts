import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
  };
  export const findUsersByRole = async (role: string) => {
      const response = await
      axiosWithCredentials.get(`${USERS_API}?role=${role}`);
      return response.data;
    };
  export const findUsersByPartialName = async (name: string) => {
      const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
      return response.data;
    };
  export const findUserById = async (id: string) => {
      const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
      return response.data;
    };
  export const deleteUser = async (userId: string) => {
      const response = await axiosWithCredentials.delete( `${USERS_API}/${userId}` );
      return response.data;
    };
  
    export const createUser = async (user: any) => {
      const response = await axiosWithCredentials.post(`${USERS_API}`, user);
      return response.data;
    };
    export const findUsersByIdList = async (list: any) => {
      const response = await axiosWithCredentials.get(`${USERS_API}?list=${list}`);
      return response.data;
    }
    export const addFollowing = async (userId: string, followingId: string) => {
      const response = await axiosWithCredentials.put(`${USERS_API}/${userId}/addFollowing/${followingId}`);
      return response.data;
    }
    export const deleteFollowing = async (userId: string, followingId: string) => {
      const response = await axiosWithCredentials.put(`${USERS_API}/${userId}/deleteFollowing/${followingId}`);
      return response.data;
    }
    export const deleteUserFromFollowing = async(userId: string) => {
      const response = await axiosWithCredentials.put(`${USERS_API}/remove/${userId}`);
      return response.data;
    }
    