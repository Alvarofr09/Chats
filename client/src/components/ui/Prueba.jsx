export default function InputPrueba() {
	return (
		<label className="relative">
			<input
				type="text"
				className="h-20 w-96 px-6 text-4xl bg-black border-2 
                rounded-lg border-white border-opacity-50 outline-none
                focus:border-b-sky-800 focus:text-white
                transition duration-200 "
			/>
			<span
				className="text-4xl text-white text-opacity-80 absolute left-0 top-4
                mx-6 px-2 transition duration-200
                input-text"
			>
				Input
			</span>
		</label>
	);
}
