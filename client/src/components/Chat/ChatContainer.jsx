import ChatInput from "./ChatInput";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { getAllMessages, sendMessageRoute } from "../../api/APIRoutes";
import { useEffect, useRef, useState } from "react";

export default function ChatContainer({ currentChat, currentUser, socket }) {
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();

	useEffect(() => {
		async function fetchData() {
			if (!currentChat) return;
			const response = await axios.post(getAllMessages, {
				from: currentUser.id,
				to: currentChat.id,
			});

			setMessages(response.data);
		}

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChat]);

	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-recieve", (msg) => {
				setArrivalMessage({ fromSelf: false, message: msg });
			});
		}
	}, []);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMsg = async (msg) => {
		try {
			await axios.post(sendMessageRoute, {
				from: currentUser.id,
				to: currentChat.id,
				text: msg,
			});

			socket.current.emit("send-msg", {
				to: currentChat.id,
				from: currentUser.id,
				message: msg,
			});

			const msgs = [...messages];
			msgs.push({ fromSelf: true, message: msg });
			setMessages(msgs);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<>
			{currentChat && (
				<div
					className="container pt-4 grid grid-rows-3 gap-1 overflow-hidden"
					style={{ gridTemplateRows: "10% 78% 12%" }}
				>
					<div className="chat-header flex justify-between items-center px-8 py-0">
						<div className="user-details flex items-center gap-4">
							<div className="user-image">
								<img
									className="h-12"
									src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
									alt="avatar"
								/>
							</div>
							<div className="username">
								<h3 className="text-white text-xl font-bold">
									{currentChat.username}
								</h3>
							</div>
						</div>
					</div>
					<div className="chat-messages py-4 px-8 flex flex-col gap-4 overflow-auto">
						{messages.map((message) => {
							return (
								<div ref={scrollRef} key={uuidv4()}>
									<div
										className={`message  flex items-center ${
											message.fromSelf ? "sended" : "recieved"
										}`}
									>
										<div className="content max-w-[40%] overflow-wrap-break-word p-4 text-lg rounded-2xl text-[#d1d1d1]">
											{message.message}
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<ChatInput handleSendMsg={handleSendMsg} />
				</div>
			)}
		</>
	);
}
