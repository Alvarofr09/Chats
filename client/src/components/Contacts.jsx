import { useState, useEffect } from "react";

import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, currentUser, changeChat }) {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
	useEffect(() => {
		if (currentUser) {
			setCurrentUserName(currentUser.username);
			setCurrentUserImage(currentUser.avatarImage);
		}
	}, [currentUser]);

	useEffect(() => {
		console.log("currentSelected en el useEffect:", currentSelected);
	}, [currentSelected]);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	return (
		<>
			{currentUserImage && currentUserName && (
				<div
					className="container grid grid-rows-3 overflow-hidden bg-[#080420]"
					style={{ gridTemplateRows: "10% 75% auto" }}
				>
					<div className="brand ">
						<img src={Logo} alt="Logo" className="h-8" />
						<h1 className="titulo uppercase">Tradeium</h1>
					</div>
					<div className="contacts ">
						{contacts.map((contact, index) => {
							return (
								<div
									className={`contact  ${
										index === currentSelected && "selected-contact"
									}`}
									key={index}
									onClick={() => changeCurrentChat(index, contact)}
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
					<div className="current-user bg-[#0d0d30] centered gap-8">
						<div className="avatar h-16">
							<img
								className="h-full "
								src={`data:image/svg+xml;base64,${currentUserImage}`}
								alt="avatar"
							/>
						</div>
						<div className="username">
							<h3 className="text-xl titulo">{currentUserName}</h3>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
