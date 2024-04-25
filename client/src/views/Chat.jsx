import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllUsersRoute } from "../api/APIRoutes";
import Contacts from "../components/Contacts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./Welcome";
import ChatContainer from "../components/Chat/ChatContainer";

import { jwtDecode } from "jwt-decode";
// import jwt from "jsonwebtoken";

export default function Chat() {
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			if (!localStorage.getItem("token")) {
				navigate("/login");
				return;
			}

			const token = localStorage.getItem("token");
			console.log(token);
			console.log(typeof token);

			const user = jwtDecode(token);

			console.log(user);

			setCurrentUser(user);
			setIsLoaded(true);

			if (!user.isAvatarImageSet) {
				navigate("/setAvatar");
				return;
			}

			try {
				const response = await axios.get(`${getAllUsersRoute}/${user.id}`);
				setContacts(response.data.users);
			} catch (error) {
				console.error("Error fetching contacts:", error);
				toast.error("Error fetching contacts. Please try again.", {
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					theme: "dark",
				});
			}
		};

		fetchData();
	}, [navigate]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<div className="h-screen w-screen centered flex-col gap-4  bg-[#131324]">
			<div
				className="container h-[85%] w-[85%] bg-[#00000076] grid grid-cols-2 lg:grid-cols-[35% 65%]"
				style={{
					gridTemplateColumns: "25% 75%",
					// "@media (min-width: 720px) and (max-width: 1080px)": {
					// 	gridTemplateColumns: "35% 65%",
					// },
				}}
			>
				<Contacts
					contacts={contacts}
					currentUser={currentUser}
					changeChat={handleChatChange}
				/>
				{isLoaded && currentChat === undefined ? (
					<Welcome currentUser={currentUser} />
				) : (
					<ChatContainer currentChat={currentChat} />
				)}
			</div>
			<ToastContainer />
		</div>
	);
}
