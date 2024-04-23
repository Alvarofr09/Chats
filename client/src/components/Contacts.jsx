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
				<div className="container">
					<div className="brand">
						<img src={Logo} alt="Logo" />
						<h1>Tradeium</h1>
					</div>
					<div className="contacts">
						{contacts.map((contact, index) => {
							return (
								<div
									className={`contact ${
										index === currentUserSelected && "selected"
									}`}
									key={index}
								>
									<div className="avatar"></div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
}
