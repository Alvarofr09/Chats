import { Formik, Form } from "formik";
import { SignalFormInitialValues } from "../../consts/InitialValues";
import { SignalFormSchema } from "./SignalFormSchema";

import Input from "../ui/Input";
import Select from "../ui/Select";

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
							<Select
								label="Moneda"
								name="coin"
								placeholder="Please select a coin"
							>
								<option value="">Please select a coin</option>
								<option value="BTC">BTC</option>
								<option value="ETH">ETH</option>
								<option value="Doge">Doge</option>
							</Select>

							<Input placeholder="Buy Price" name="buyPrice" type="number" />
							<Input placeholder="Sell Price" name="sellPrice" type="number" />

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
