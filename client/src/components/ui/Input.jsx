import { useField } from "formik";

export default function Input({ label, ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			{/* <label className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit">
				{label}
			</label> */}
			<input
				{...props}
				{...field}
				className={
					meta.touched && meta.error ? "input-error" : "register-input"
				}
				// className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] focus:outline-none placeholder:text-black/25"
			/>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
