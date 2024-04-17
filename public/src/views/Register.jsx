import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (handleValidation()) {
			const { username, email, password } = values;
			const { data } = await axios.post(registerRoute, {
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
	};

	const handleValidation = () => {
		const { username, email, password, confirmPassword } = values;
		if (username.length < 3) {
			toast.error("Username tiene que ser mayor de 3 caracteres", toastOptions);
			return false;
		} else if (password.length < 8) {
			toast.error(
				"Password tiene que tener al menos 8 caracteres",
				toastOptions
			);
			return false;
		} else if (password !== confirmPassword) {
			toast.error("Password and confirm password did not match", toastOptions);
			return false;
		} else if (email === "") {
			toast.error("Email is required", toastOptions);
			return false;
		}
		return true;
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<>
			<FormContainer>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="brand">
						<img src={Logo} alt="Logo" />
						<h1>Tradeium</h1>
					</div>
					<input
						type="text"
						name="username"
						id="username"
						value={values.username}
						placeholder="Username"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="email"
						name="email"
						id="email"
						value={values.email}
						placeholder="Email"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						name="password"
						id="password"
						value={values.password}
						placeholder="Password"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						value={values.confirmPassword}
						placeholder="Confirm Password"
						onChange={(e) => handleChange(e)}
					/>
					<button type="submit">Create User</button>
					<span>
						Already have an account ? <Link to="/login">Login</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 5rem;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
        }
    }
    button {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #4e0eff;
        }
    }
    span {
        color: white;
        text-transform: uppercase;
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;
