import RegisterForm from "../components/RegisterForm/RegisterForm";
import InputPrueba from "../components/ui/Prueba";

export default function Prueba() {
	return (
		<div className="bg-black h-screen flex justify-center items-center">
			{/* <InputPrueba label="Username" name="username" type="text" /> */}
			<RegisterForm />
		</div>
	);
}
