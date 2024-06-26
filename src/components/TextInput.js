const TextInput = ({ id, label, value, onChange, disabled, type, required = true }) => (
	<div className="col-span-2">
		<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
		<input
			type={type || "text"}
			id={id}
			name={id}
			disabled={disabled}
			value={value}
			onChange={onChange}
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
			required={required}
		/>
	</div>
);

export default TextInput;
