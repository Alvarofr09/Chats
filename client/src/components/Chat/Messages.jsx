import { v4 as uuidv4 } from "uuid";

export default function Messages({ messages, scrollRef }) {
	return (
		<div className="chat-messages scrollbar-custom py-4 px-8 flex flex-col gap-4 overflow-auto">
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
	);
}
