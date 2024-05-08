import { Formik, Form } from "formik";
import { SignalFormInitialValues } from "../../consts/InitialValues";
import { SignalFormSchema } from "./SignalFormSchema";

import Input from "../ui/Input";
import Select from "../ui/Select";
import Image from "../ui/Image";

export default function SignalForm() {
	async function onSubmit(values) {
		console.log(values);
		// const { username, email, password } = values;
		// const { data } = await userApi.post(registerRoute, {
		// 	username,
		// 	email,
		// 	password,
		// 	image: avatar,
		// });
	}
	return (
		<>
			<Formik
				initialValues={SignalFormInitialValues}
				validationSchema={SignalFormSchema}
				onSubmit={onSubmit}
			>
				{(values, errors, isSubmitting) => (
					<div className="">
						<Form className="form">
							<Image />

							<Input
								placeholder="Signal Description"
								name="description"
								type="textarea"
							/>

							<Select name="coin" placeholder="Please select a coin">
								<option value="">Please select a coin</option>
								<option value="BTC">BTC</option>
								<option value="ETH">ETH</option>
								<option value="Doge">Doge</option>
							</Select>

							<Input placeholder="Entrada" name="entrada" type="number" />
							<Input placeholder="Salida" name="salida" type="number" />
							<Input placeholder="TP" name="tp" type="number" />
							<Input placeholder="%" name="porcentaje" type="number" />

							<button
								className="btn-primary"
								type="submit"
								disabled={isSubmitting}
							>
								Enviar
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</>
	);
}
