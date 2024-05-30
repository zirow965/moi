const carYears = Array.from({ length: 61 }, (_, i) => 1980 + i);

const CarYearDropdown = ({ value, onChange, disabled }) => (
	<div className="col-span-2">
		<label htmlFor="carYear" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Year</label>
		<select
			id="carYear"
			name="carYear"
			value={value}
			disabled
			onChange={onChange}
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
			required
		>
			<option value="">Select Car Year</option>
			{carYears.map(year => (
				<option key={year} value={year}>{year}</option>
			))}
		</select>
	</div>
);

export default CarYearDropdown;
