import { Formik, Form } from "formik";
import { LoginFormInitialValues } from "../../consts/InitialValues";
// import { ToastContainer, toast } from "react-toastify";
import { LoginFormSchema } from "./LoginFormSchema";

import Logo from "../../assets/logo.svg";

import InputPrueba from "../ui/Prueba";
import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginForm() {
	const { login } = useAuthContext();
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (localStorage.getItem("user")) {
	// 		navigate("/");
	// 	}
	// }, []);

	async function onSubmit(values) {
		await login(values);
		navigate("/");
	}
	return (
		<>
			<Formik
				initialValues={LoginFormInitialValues}
				validationSchema={LoginFormSchema}
				onSubmit={onSubmit}
			>
				{(values, errors, isSubmitting) => (
					<div className="container-form">
						<Form className="register-form">
							<div className="brand ">
								<img src={Logo} alt="Logo" className="h-20" />
								<h1 className="titulo">Tradeium</h1>
							</div>

							<InputPrueba label="Email" name="email" type="email" />

							<InputPrueba label="Password" name="password" type="password" />

							<button
								className="btn-primary"
								type="submit"
								disabled={isSubmitting}
							>
								Login
							</button>
							<span className="titulo">
								Don´t have an account ?{" "}
								<Link className="link" to="/register">
									Register
								</Link>
							</span>
						</Form>
					</div>
				)}
			</Formik>
			{/* <ToastContainer /> */}
		</>
	);
}
