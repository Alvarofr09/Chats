import Picker from "emoji-picker-react";
import { IconSend2 } from "@tabler/icons-react";
import { IconMoodSmileFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function ChatInput({ handleSendMsg }) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [isSignal, setIsSignal] = useState(false);
	const [message, setMessage] = useState("");
	const [signal, setSignal] = useState({
		coin: "",
		buyPrice: "",
		sellPrice: "",
	});

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

	const handleSignalChange = (event) => {
		setIsSignal(event.target.checked);
	};

	return (
		<div
			className="container  grid grid-cols-2 items-center bg-[#000000] px-8 py-0 pb-[0.3rem]"
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
				className="input-container  w-[100%] rounded-[2rem] flex content-center gap-8 bg-[#D9D9D9]"
			>
				<input
					type="checkbox"
					checked={isSignal}
					onChange={handleSignalChange}
					className="mr-2"
				/>
				<label htmlFor="isSignal" className="text-white">
					Signal
				</label>
				{!isSignal ? (
					<>
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Type your message here"
							className="w-[90%]  bg-transparent border-none pl-4 text-xl text-[#585858] focus:outline-none"
						/>
						<button
							type="submit"
							className="submit-btn md:py-0 px-8 lg:py-1 rounded-[2rem] centered  border-none"
						>
							<IconSend2 color="#585858" size={32} />
						</button>
					</>
				) : (
					<>
						<select name="" id="">
							<option value="BTC">BTC</option>
							<option value="ETH">ETH</option>
							<option value="Doge">Doge</option>
						</select>

						<input
							type="Number"
							value={signal.buyPrice}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Type the price to buy"
							className="w-[90%]  bg-transparent border-none pl-4 text-xl text-[#585858] focus:outline-none"
						/>

						<input
							type="Number"
							value={signal.sellPrice}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Type the price to sell"
							className="w-[90%]  bg-transparent border-none pl-4 text-xl text-[#585858] focus:outline-none"
						/>

						<button
							type="submit"
							className="submit-btn md:py-0 px-8 lg:py-1 rounded-[2rem] centered  border-none"
						>
							Enviar
						</button>
					</>
				)}
			</form>
		</div>
	);
}
