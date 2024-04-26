import Picker from "emoji-picker-react";
import { IconSend2 } from "@tabler/icons-react";
import { IconMoodSmileFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function ChatInput({ handleSendMsg }) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [message, setMessage] = useState("");

	const handleEmojiPickerHideShow = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const handleEmojiClick = (emoji) => {
		let msg = message;
		msg += emoji.emoji;
		setMessage(msg);
	};

	const sendChat = async (event) => {
		event.preventDefault();
		if (message.length > 0) {
			handleSendMsg(message);
			setMessage("");
		}
	};

	return (
		<div
			className="container  grid grid-cols-2 items-center bg-[#080420] px-8 py-0 pb-[0.3rem]"
			style={{
				gridTemplateColumns: "5% 95%",
			}}
		>
			<div className="button-container flex items-center text-white gap-4">
				<div className="emoji relative">
					{showEmojiPicker && (
						<Picker className="" onEmojiClick={handleEmojiClick} />
					)}
					<IconMoodSmileFilled
						onClick={handleEmojiPickerHideShow}
						color="#ffff00c8"
						className="cursor-pointer"
						size={30}
					/>
				</div>
			</div>
			<form
				onSubmit={(e) => sendChat(e)}
				className="input-container w-[100%] rounded-[2rem] flex content-center gap-8 bg-[#ffffff34]"
			>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type your message here"
					className="w-[90%]  bg-transparent border-none pl-4 text-xl text-white selection:bg-[#9186f3] focus:outline-none"
				/>
				<button
					type="submit"
					className="submit-btn px-8 py-1 rounded-[2rem] centered bg-[#9a86f3] border-none"
				>
					<IconSend2 color="#ffffff" size={32} />
				</button>
			</form>
		</div>
	);
}
