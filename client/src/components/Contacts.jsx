import { useState, useEffect } from "react";

import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, currentUser }) {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentUserSelected, setCurrentUserSelected] = useState(undefined);
	useEffect(() => {
		if (currentUser) {
			setCurrentUserName(currentUser.username);
			setCurrentUserImage(currentUser.avatarImage);
		}
	}, [currentUser]);

	const changeCurrentChat = (index, contact) => {};
	return (
		<>
			{currentUserImage && currentUserName && (
				<div
					className="container grid grid-rows-3 overflow-hidden bg-[#080420]"
					style={{ gridTemplateRows: "10% 75% auto" }}
				>
					<div className="brand flex justify-center items-center gap-4">
						<img src={Logo} alt="Logo" className="h-8" />
						<h1 className="titulo uppercase">Tradeium</h1>
					</div>
					<div className="contacts flex flex-col justify-center items-center overflow-auto gap-3 scrollbar-custom">
						{contacts.map((contact, index) => {
							return (
								<div
									className={`contact bg-[#ffffff39] min-h-[5rem] w-[90%] cursor-pointer rounded-[0.2rem] 
									gap-4 p-[0.4rem] items-center flex transition duration-200 ease-in-out ${
										index === currentUserSelected && "bg-[#9186f3]"
									}`}
									key={index}
								>
									<div className="avatar">
										<img
											className="h-12"
											src={`data:image/svg+xml;base64,${contact.avatarImage}`}
											alt="avatar"
										/>
									</div>
									<div className="username">
										<h3 className="text-xl text-white bold">
											{contact.username}
										</h3>
									</div>
								</div>
							);
						})}
						{contacts.map((contact, index) => {
							return (
								<div
									className={`contact bg-[#ffffff39] min-h-[5rem] w-[90%] cursor-pointer rounded-[0.2rem] 
									gap-4 p-[0.4rem] items-center flex transition duration-200 ease-in-out ${
										index === currentUserSelected && "bg-[#9186f3]"
									}`}
									key={index}
								>
									<div className="avatar">
										<img
											className="h-12"
											src={`data:image/svg+xml;base64,${contact.avatarImage}`}
											alt="avatar"
										/>
									</div>
									<div className="username">
										<h3 className="text-xl text-white bold">
											{contact.username}
										</h3>
									</div>
								</div>
							);
						})}
						{contacts.map((contact, index) => {
							return (
								<div
									className={`contact bg-[#ffffff39] min-h-[5rem] w-[90%] cursor-pointer rounded-[0.2rem] 
									gap-4 p-[0.4rem] items-center flex transition duration-200 ease-in-out ${
										index === currentUserSelected && "bg-[#9186f3]"
									}`}
									key={index}
								>
									<div className="avatar">
										<img
											className="h-12"
											src={`data:image/svg+xml;base64,${contact.avatarImage}`}
											alt="avatar"
										/>
									</div>
									<div className="username">
										<h3 className="text-xl text-white bold">
											{contact.username}
										</h3>
									</div>
								</div>
							);
						})}
						{contacts.map((contact, index) => {
							return (
								<div
									className={`contact bg-[#ffffff39] min-h-[5rem] w-[90%] cursor-pointer rounded-[0.2rem] 
									gap-4 p-[0.4rem] items-center flex transition duration-200 ease-in-out ${
										index === currentUserSelected && "bg-[#9186f3]"
									}`}
									key={index}
								>
									<div className="avatar">
										<img
											className="h-12"
											src={`data:image/svg+xml;base64,${contact.avatarImage}`}
											alt="avatar"
										/>
									</div>
									<div className="username">
										<h3 className="text-xl text-white bold">
											{contact.username}
										</h3>
									</div>
								</div>
							);
						})}
					</div>
					<div className="current-user bg-[#0d0d30] flex justify-center items-center gap-8">
						<div className="avatar h-16">
							<img
								className="h-full max-i"
								src={`data:image/svg+xml;base64,${currentUserImage}`}
								alt="avatar"
							/>
						</div>
						<div className="username">
							<h3 className="text-xl text-white bold">{currentUserName}</h3>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
