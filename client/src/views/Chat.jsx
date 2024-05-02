import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllGroups, getAllUsersRoute, host } from "../api/APIRoutes";
import Contacts from "../components/Contacts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./Welcome";
import ChatContainer from "../components/Chat/ChatContainer";
import { io } from "socket.io-client";

import { jwtDecode } from "jwt-decode";

export default function Chat() {
	const socket = useRef();
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [groups, setGroups] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);

	// const token = JSON.parse(localStorage.getItem("token"));

	useEffect(() => {
		const fetchData = async () => {
			if (!localStorage.getItem("token")) {
				navigate("/forms");
				return;
			}

			const token = localStorage.getItem("token");
			// console.log(token);

			const user = jwtDecode(token);

			// console.log(user);

			setCurrentUser(user);
			setIsLoaded(true);

			// if (!user.isImageSet) {
			// 	navigate("/setAvatar");
			// 	return;
			// }

			try {
				const response = await axios.get(`${getAllUsersRoute}/${user.id}`);
				const response2 = await axios.get(`${getAllGroups}/${user.id}`);
				setContacts(response.data.users);
				console.log(response.data.users);
				console.log(response2.data.groups);
				if (response2.data.groups > 0) {
					setContacts([...contacts, response2.data.groups]);
				}
				console.log(contacts);
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

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", currentUser.id);
		}
	}, [currentUser]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<div className="h-screen w-screen centered flex-col gap-4  bg-[#131324]">
			<div
				className="container h-[85%] w-[85%] bg-[#00000076] grid grid-cols-2 lg:grid-cols-[35% 65%]"
				style={{
					gridTemplateColumns: "25% 75%",
					"@media (min-width: 720px) and (max-width: 1080px)": {
						gridTemplateColumns: "35% 65%",
					},
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
					<ChatContainer
						currentChat={currentChat}
						currentUser={currentUser}
						socket={socket}
					/>
				)}
			</div>
			<ToastContainer />
		</div>
	);
}
