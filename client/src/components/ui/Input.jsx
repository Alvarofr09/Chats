import { useField } from "formik";

export default function Input({ label, ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			<label>{label}</label>
			<input
				{...props}
				{...field}
				className={meta.touched && meta.error ? "input-error" : ""}
			/>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
