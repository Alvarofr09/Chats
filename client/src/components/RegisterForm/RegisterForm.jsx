import { Formik, Form } from "formik";
import { RegisterFormInitialValues } from "../../consts/InitialValues";
import { ToastContainer, toast } from "react-toastify";
import { RegisterFormSchema } from "./RegisterFormSchema";

import Checkbox from "../ui/Checkbox";
import { useNavigate } from "react-router-dom";
import { registerRoute, userApi } from "../../api/APIRoutes";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import Input from "../ui/Input";

export default function RegisterForm() {
	const api = "https://api.multiavatar.com/45678945";
	const [avatar, setAvatar] = useState(undefined);
	const { login } = useAuthContext();
	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	// useEffect(() => {
	// 	if (localStorage.getItem("user")) {
	// 		navigate("/");
	// 	}
	// }, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const image = await axios.get(
					`${api}/${Math.round(Math.random() * 1000)}`,
					{ responseType: "arraybuffer" }
				);

				const buffer = Buffer.from(image.data, "binary");
				const base64 = buffer.toString("base64");

				setAvatar(base64);
			} catch (error) {
				console.error("Error fetching image:", error);
			}
		};

		fetchData();
	}, []);

	async function onSubmit(values) {
		console.log(values);
		const { username, email, password } = values;
		const { data } = await userApi.post(registerRoute, {
			username,
			email,
			password,
			avatarImage: avatar,
		});
		const user = {
			email,
			password,
		};

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
		} else {
			await login(user);

			navigate("/");
		}
	}
	return (
		<>
			<Formik
				initialValues={RegisterFormInitialValues}
				validationSchema={RegisterFormSchema}
				onSubmit={onSubmit}
			>
				{(values, errors, isSubmitting) => (
					<div className="container-form">
						<Form className="register-form">
							<Input placeholder="Username" name="username" type="text" />

							<Input placeholder="Email" name="email" type="email" />
							<Input
								placeholder="Confirmar Email"
								name="confirmEmail"
								type="email"
							/>

							<Input placeholder="Password" name="password" type="password" />
							<Input
								placeholder="Confirm Password"
								name="confirmPassword"
								type="password"
							/>
							<Checkbox type="checkbox" name="acceptedTC" />
							<button
								className="btn-primary"
								type="submit"
								disabled={isSubmitting}
							>
								Register
							</button>
							{/* <ButtonGroup /> */}
							{/* <span className="titulo">
								Already have an account ?{" "}
								<Link className="link" to="/login">
									Login
								</Link>
							</span> */}
						</Form>
					</div>
				)}
			</Formik>
			<ToastContainer />

			{/* Llama al componente SetAvatar si se ha registrado un usuario */}
			{/* {localStorage.getItem("user") && <SetAvatar />} */}
		</>
	);
}
