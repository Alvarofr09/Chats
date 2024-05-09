import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/Register";
import Chat from "./views/Chat";
import Login from "./views/Login";
import AuthContextProvider from "./context/AuthContext";
// import SetAvatar from "./views/SetAvatar";
import Forms from "./views/Forms";
import UserDetails from "./views/UserDetails";
import CreateGroup from "./views/CreateGroup";

export default function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Routes>
					{/* <Route path="/register" element={<Register />} /> */}
					<Route path="/user/:id" element={<UserDetails />} />
					<Route path="/create-group/:id" element={<CreateGroup />} />
					{/* <Route path="/login" element={<Login />} /> */}
					<Route path="/forms" element={<Forms />} />
					<Route path="/" element={<Chat />} />
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}
