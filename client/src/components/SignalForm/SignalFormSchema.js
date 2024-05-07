import * as yup from "yup";

export const SignalFormSchema = yup.object().shape({
	username: yup.string().required("Tienes que elejir una moneda"),
	buyPrice: yup.number().required("Buy Price Required"),
	sellPrice: yup.number().required("Sell Price Required"),
});
