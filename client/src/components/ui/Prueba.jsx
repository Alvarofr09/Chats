import { useField } from "formik";

export default function InputPrueba({ label, ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			<label className="relative">
				<input
					{...props}
					{...field}
					className={
						meta.touched && meta.error
							? "input-error"
							: "h-20 w-96 px-6 text-4xl bg-black border-2 rounded-lg border-white border-opacity-50 outline-none focus:border-sky-500 focus:text-white transition duration-200 "
					}
				/>
				<span
					className="text-4xl text-white text-opacity-80 absolute left-0 top-4
                mx-6 px-2 transition duration-200
                input-text"
				>
					{label}
				</span>
			</label>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
