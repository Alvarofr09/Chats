import ChatInput from "./ChatInput";
import Logout from "../Logout";
import Messages from "./Messages";

import axios from "axios";
import { sendMessageRoute } from "../../api/APIRoutes";

export default function ChatContainer({ currentChat, currentUser }) {
	const handleSendMsg = async (msg) => {
		try {
			await axios.post(sendMessageRoute, {
				from: currentUser.id,
				to: currentChat.id,
				text: msg,
			});
		} catch (error) {
			alert(error);
		}
	};
	return (
		<>
			{currentChat && (
				<div className="container pt-4">
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
						<Logout />
					</div>
					<Messages />
					<ChatInput handleSendMsg={handleSendMsg} />
				</div>
			)}
		</>
	);
}
