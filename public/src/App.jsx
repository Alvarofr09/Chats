import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/Register";
import Chat from "./views/Chat";
import Login from "./views/Login";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Chat />} />
			</Routes>
		</BrowserRouter>
	);
}
