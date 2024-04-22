import { Formik, Form } from "formik";
import { initialValues } from "./InitialValues";
import { ToastContainer, toast } from "react-toastify";
import { RegisterFormSchema } from "./RegisterFormSchema";

import Logo from "../../assets/logo.svg";

import InputPrueba from "../ui/Prueba";
import Checkbox from "../ui/Checkbox";
import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { registerRoute, userApi } from "../../api/APIRoutes";

export default function RegisterForm() {
	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	async function onSubmit(values) {
		const { username, email, password } = values;
		const { data } = await userApi.post(registerRoute, {
			username,
			email,
			password,
		});

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
		} else {
			localStorage.setItem("chat-app-user", JSON.stringify(data.user));
			toast.success(data.msg, toastOptions);
			navigate("/");
		}
	}
	return (
		<>
			<Formik
				initialValues={initialValues}
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
		</>
	);
}
