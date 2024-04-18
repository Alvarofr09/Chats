import axios from "axios";

const host = "http://localhost:3000";

export const registerRoute = `/api/auth/register`;

export const userApi = axios.create({
	baseURL: `${host}`,
});
