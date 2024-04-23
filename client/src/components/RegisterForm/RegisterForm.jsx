import { Formik, Form } from "formik";
import { RegisterFormInitialValues } from "../../consts/InitialValues";
import { ToastContainer, toast } from "react-toastify";
import { RegisterFormSchema } from "./RegisterFormSchema";

// import SetAvatar from "../../views/SetAvatar";

import Logo from "../../assets/logo.svg";

import InputPrueba from "../ui/Prueba";
import Checkbox from "../ui/Checkbox";
import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { registerRoute, userApi } from "../../api/APIRoutes";
// import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function RegisterForm() {
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

	async function onSubmit(values) {
		const { username, email, password } = values;
		const { data } = await userApi.post(registerRoute, {
			username,
			email,
			password,
		});
		const user = {
			email,
			password,
		};

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
		} else {
			login(user);

			navigate("/setAvatar");
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
							<div className="brand ">
								<img src={Logo} alt="Logo" className="h-20" />
								<h1 className="titulo">Tradeium</h1>
							</div>

							<InputPrueba label="Username" name="username" type="text" />

							<InputPrueba label="Email" name="email" type="email" />

							<InputPrueba label="Password" name="password" type="password" />
							<InputPrueba
								label="Confirm Password"
								name="confirmPassword"
								type="password"
							/>
							<Checkbox type="checkbox" name="acceptedTC" />
							<button
								className="register-button"
								type="submit"
								disabled={isSubmitting}
							>
								Register
							</button>
							<span className="titulo">
								Already have an account ?{" "}
								<Link className="link" to="/login">
									Login
								</Link>
							</span>
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
