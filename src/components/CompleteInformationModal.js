'use client'
import {useEffect, useState} from 'react';
import BaseModal from './BaseModal';
import TextInput from './TextInput';
import CarYearDropdown from './CarYearDropdown';

const CompleteInformationModal = ({ isOpen, onClose, onSubmit, company }) => {
	const [formValues, setFormValues] = useState({
		companyOwner: company?.companyOwner || '',
		plate: company?.plate || '',
		activity: company?.activity || '',
		VIN: company?.VIN || '',
		carMake: company?.carMake || '',
		carModel: company?.carModel || '',
		carYear: company?.carYear || ''
	});

	useEffect(() => {
		setFormValues({
			companyOwner: company?.companyOwner || '',
			plate: company?.plate || '',
			activity: company?.activity || '',
			VIN: company?.VIN || '',
			carMake: company?.carMake || '',
			carModel: company?.carModel || '',
			carYear: company?.carYear || ''
		});

	}, [company]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formValues);
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title="Complete Information" companyId={company?._id} onSubmit={handleSubmit}>
			<div className="grid gap-4 mb-4 grid-cols-1">
				<TextInput
					label="Company Owner"
					id="companyOwner"
					name="companyOwner"
					disabled={company?.companyOwner}
					value={formValues.companyOwner}
					onChange={handleChange}
				/>
				<TextInput
					label="Plate"
					id="plate"
					name="plate"
					value={formValues.plate}
					disabled={company?.plate}
					onChange={handleChange}
				/>
				<TextInput
					label="Activity"
					id="activity"
					name="activity"
					value={formValues.activity}
					disabled={formValues.activity}
					onChange={handleChange}
				/>
				<TextInput
					label="VIN"
					id="VIN"
					name="VIN"
					disabled={company?.VIN }
					value={formValues.VIN}
					onChange={handleChange}
				/>
				<TextInput
					label="Car Make"
					id="carMake"
					name="carMake"
					disabled={company?.carMake}
					value={formValues.carMake}
					onChange={handleChange}
				/>
				<TextInput
					label="Car Model"
					id="carModel"
					name="carModel"
					disabled={company?.carModel}
					value={formValues.carModel}
					onChange={handleChange}
				/>
				<CarYearDropdown
					id="carYear"
					name="carYear"
					disabled={company?.carYear}
					value={formValues.carYear}
					onChange={handleChange}
				/>
			</div>
		</BaseModal>
	);
};

export default CompleteInformationModal;
