export default function ChatHeader({ currentChat }) {
	return (
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
	);
}
