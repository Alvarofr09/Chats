import { useState } from "react";

export default function ButtonGroup() {
	const [activeButton, setActiveButton] = useState("login");

	const handleButtonClick = (buttonName) => {
		setActiveButton(buttonName);
	};

	return (
		<div className="flex gap-4 rounded-3xl bg-[#2e2d2d] ">
			<button
				onClick={() => handleButtonClick("login")}
				className={`px-4 rounded-3xl py-2 transition ease-in-out duration-300 ${
					activeButton === "login"
						? "bg-white text-[#2e2d2d]"
						: "bg-transparent text-white"
				}`}
			>
				Login
			</button>
			<button
				onClick={() => handleButtonClick("register")}
				className={`px-4 rounded-3xl py-2 transition ease-in-out duration-300 ${
					activeButton === "register"
						? "bg-white text-[#2e2d2d]"
						: "bg-transparent text-white"
				}`}
			>
				Register
			</button>
		</div>
	);
}
