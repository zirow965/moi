'use client'
import {useEffect, useState} from 'react';
import BaseModal from './BaseModal';
import TextInput from './TextInput';
import CarYearDropdown from './CarYearDropdown';
import SelectActivity from "@/components/SelectActivity";

const CompleteInformationModal = ({ isOpen, onClose, onSubmit, company }) => {
	const [formValues, setFormValues] = useState({
		_id: company?._id || '',
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
			_id: company?._id || '',
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

	const handleActivityChange = (activity) => {
		setFormValues({ ...formValues, activity: activity });

	}

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title="Complete Information" companyId={company?._id} onSubmit={handleSubmit}>
			<div dir={'rtl'} className="grid gap-4 mb-4 grid-cols-1">
				<TextInput
					label="الرقم المركزي للترخيص"
					id="_id"
					name="_id"
					disabled={company?._id}
					value={formValues._id}
					onChange={handleChange}
				/>
				<TextInput
					label="صاحب الرخصة"
					id="companyOwner"
					name="companyOwner"
					disabled={company?.companyOwner}
					value={formValues.companyOwner}
					onChange={handleChange}
				/>
				<TextInput
					label="رقم اللوحة"
					id="plate"
					name="plate"
					value={formValues.plate}
					disabled={company?.plate}
					onChange={handleChange}
				/>
				<SelectActivity id="activity" label="النشاط"
				                value={formValues.activity}
				                disabled={company?.activity}
				                onActivityChange={handleActivityChange}/>
				<TextInput
					label="رقم القاعدة"
					id="VIN"
					name="VIN"
					disabled={company?.VIN }
					value={formValues.VIN}
					onChange={handleChange}
				/>
				<TextInput
					label="صنع المركبة"
					id="carMake"
					name="carMake"
					disabled={company?.carMake}
					value={formValues.carMake}
					onChange={handleChange}
				/>
				<TextInput
					label="موديل المركبة"
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
