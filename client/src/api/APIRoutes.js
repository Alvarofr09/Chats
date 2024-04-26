import axios from "axios";

const host = "http://localhost:3000";

export const registerRoute = `/api/auth/register`;
export const loginRoute = `/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getAllUsersRoute = `${host}/api/auth/allUsers`;

export const sendMessageRoute = `${host}/api/messages/add-message`;
export const getAllMessages = `${host}/api/messages/getMessages`;

export const userApi = axios.create({
	baseURL: `${host}`,
});
