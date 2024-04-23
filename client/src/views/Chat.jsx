import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { getAllUsersRoute } from "../api/APIRoutes";

import Contacts from "../components/Contacts";

export default function Chat() {
	const navigate = useNavigate();
	const [contacs, setContacs] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		const getCurrentUser = async () => {
			if (!localStorage.getItem("user")) {
				navigate("/login");
			} else {
				setCurrentUser(await JSON.parse(localStorage.getItem("user")));
			}
		};

		getCurrentUser();
	}, []);
	useEffect(() => {
		const getAllUsers = async () => {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					const data = await axios.get(`${getAllUsersRoute}/${currentUser.id}`);
					setContacs(data.data);
				} else {
					navigate("/setAvatar");
				}
			}
		};

		getAllUsers();
	}, [currentUser]);
	return (
		<div
			className="h-screen w-screen flex flex-col justify-center gap-4
		items-center bg-[#131324] "
		>
			<div
				className="container h-[85%] w-[85%] bg-[#00000076]
			grid grid-cols-[25% 75%] lg:grid-cols-[35% 65%]"
			>
				<Contacts contacs={contacs} currentUser={currentUser} />
			</div>
		</div>
	);
}
