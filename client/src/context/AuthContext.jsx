import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { loginRoute, userApi } from "../api/APIRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};
	let userStorage = JSON.parse(localStorage.getItem("user") || null);

	const [auth, setAuth] = useState(userStorage);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(auth));
	}, [auth]);

	async function login(user) {
		const { email, password } = user;

		const { data } = await userApi.post(loginRoute, {
			email,
			password,
		});

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
			setErrorMessage("Error al introducir credenciales");
		} else {
			setAuth(user);
			setErrorMessage("");
			toast.success(data.msg, toastOptions);
			navigate("/");
		}
	}

	function logout() {
		setAuth(null);
		localStorage.removeItem("user");
		navigate("/login");
	}

	const value = { auth, login, logout, errorMessage };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
