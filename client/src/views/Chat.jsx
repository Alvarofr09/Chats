import { useAuthContext } from "../context/AuthContext";

export default function Chat() {
	const { logout } = useAuthContext();
	return (
		<div>
			<h1>Chat</h1>
			<button onClick={logout}>Logout</button>
		</div>
	);
}
