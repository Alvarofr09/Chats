import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/Register";
import Chat from "./views/Chat";
import Login from "./views/Login";
import AuthContextProvider from "./context/AuthContext";
import SetAvatar from "./views/SetAvatar";

export default function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/setAvatar" element={<SetAvatar />} />
					<Route path="/" element={<Chat />} />
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}
