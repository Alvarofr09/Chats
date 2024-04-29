import { Formik, Form } from "formik";
import { LoginFormInitialValues } from "../../consts/InitialValues";
// import { ToastContainer, toast } from "react-toastify";
import { LoginFormSchema } from "./LoginFormSchema";

import Logo from "../../assets/logo.svg";

import ButtonGroup from "../ui/ButtonGroup";
import Input from "../ui/Input";
import { useNavigate } from "react-router-dom";
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
				{() => (
					<div className="container-form">
						<Form className="register-form">
							<div className="brand ">
								<img src={Logo} alt="Logo" className="h-20" />
								<h1 className="titulo">Trademiun</h1>
							</div>

							<Input placeholder="Email" name="email" type="email" />

							<Input placeholder="Password" name="password" type="password" />

							<ButtonGroup />

							{/* <span className="titulo">
								Don´t have an account ?{" "}
								<Link className="link" to="/register">
									Register
								</Link>
							</span> */}
						</Form>
					</div>
				)}
			</Formik>
			{/* <ToastContainer /> */}
		</>
	);
}
