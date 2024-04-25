import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../api/APIRoutes";

import { jwtDecode } from "jwt-decode";

export default function SetAvatar() {
	const api = "https://api.multiavatar.com/45678945";
	const navigate = useNavigate();
	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);

	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
	}, []);

	const setProfilePicture = async () => {
		if (selectedAvatar === undefined) {
			toast.error("Please select an avatar", toastOptions);
		} else {
			const token = JSON.parse(localStorage.getItem("token"));
			const user = jwtDecode(token);
			const { data } = await axios.post(`${setAvatarRoute}/${user.id}`, {
				image: avatars[selectedAvatar],
			});

			if (data.isSet) {
				console.log(data);
				localStorage.setItem("token", JSON.stringify(user));
				navigate("/");
			} else {
				toast.error("Error setting avatar. Please try again.", toastOptions);
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = [];
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(
					`${api}/${Math.round(Math.random() * 1000)}`,
					{ responseType: "arraybuffer" }
				);

				const buffer = Buffer.from(image.data, "binary");
				const base64 = buffer.toString("base64");
				data.push(base64);
			}

			setAvatars(data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="centered flex-col gap-12 bg-[#131324] h-screen w-screen">
					<img src={loader} alt="loader" className="w-32 h-32" />
				</div>
			) : (
				<div className="centered flex-col gap-12 bg-[#131324] h-screen w-screen">
					<div className="title-container">
						<h1 className="text-white text-3xl">Pick an avatar</h1>
					</div>
					<div className="avatars flex gap-8">
						{avatars.map((avatar, index) => {
							return (
								<div
									key={index}
									className={`avatar  ${
										selectedAvatar === index ? " bg-[#4e0eff] " : ""
									}`}
								>
									<img
										className="h-24"
										src={`data:image/svg+xml;base64,${avatar}`}
										alt="avatar"
										onClick={() => setSelectedAvatar(index)}
									/>
								</div>
							);
						})}
					</div>
					<button className="btn-primary" onClick={setProfilePicture}>
						Set as Profile Picture
					</button>
				</div>
			)}
			<ToastContainer />
		</>
	);
}
