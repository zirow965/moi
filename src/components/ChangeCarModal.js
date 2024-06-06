import { useState } from 'react';
import BaseModal from './BaseModal';
import TextInput from './TextInput';
import CarYearDropdown from './CarYearDropdown';

const ChangeCarModal = ({ isOpen, onClose, onSubmit, companyId }) => {
	const [formValues, setFormValues] = useState({
		plate: '',
		VIN: '',
		carMake: '',
		carModel: '',
		carYear: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formValues);
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title="Change Car" companyId={companyId} onSubmit={handleSubmit}>
			<div className="grid gap-4 mb-4 grid-cols-1">
				<TextInput
					label="Plate"
					id="plate"
					name="plate"
					value={formValues.plate}
					onChange={handleChange}
				/>
				<TextInput
					label="VIN"
					id="VIN"
					name="VIN"
					value={formValues.VIN}
					onChange={handleChange}
				/>
				<TextInput
					label="Car Make"
					id="carMake"
					name="carMake"
					value={formValues.carMake}
					onChange={handleChange}
				/>
				<TextInput
					label="Car Model"
					id="carModel"
					name="carModel"
					value={formValues.carModel}
					onChange={handleChange}
				/>
				<CarYearDropdown
					id="carYear"
					name="carYear"
					disabled={false}
					value={formValues.carYear}
					onChange={handleChange}
				/>
			</div>
		</BaseModal>
	);
};

export default ChangeCarModal;
