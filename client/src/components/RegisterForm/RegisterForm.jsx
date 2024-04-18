import { Formik, Form } from "formik";
import { initialValues } from "./InitialValues";
import { RegisterFormSchema } from "./RegisterFormSchema";

import Logo from "../../assets/logo.svg";

import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import { Link } from "react-router-dom";

async function onSubmit(values, actions) {
	console.log(values);
	console.log(actions);

	await new Promise((resolve) => setTimeout(resolve, 1000));
	actions.resetForm();
}

export default function RegisterForm() {
	return (
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
						<Input
							// label="Username"
							name="username"
							type="text"
							placeholder="Enter your username"
						/>
						<Input
							// label="Email"
							name="email"
							type="email"
							placeholder="Enter your email"
						/>
						<Input
							// label="Password"
							name="password"
							type="password"
							placeholder="Enter your password"
						/>
						<Input
							// label="Confirm Password"
							name="confirmPassword"
							type="password"
							placeholder="Confirm your password"
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
						{/* <pre>{JSON.stringify({ values, errors }, null, 1)}</pre> */}
					</Form>
				</div>
			)}
		</Formik>
	);
}
