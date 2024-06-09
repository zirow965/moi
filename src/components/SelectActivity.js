import React from 'react';
import Select from 'react-select';
import {useActivities} from "@/utils/hooks";

const SelectActivity = ({ onActivityChange }) => {
	const { activities } = useActivities();

	const options = activities.map((activity, index) => ({
		value: index,
		label: activity
	}));

	const customStyles = {
		control: (provided) => ({
			...provided,
			width: '100%',
			backgroundColor: '#d1d5db',
			borderColor: '#d1d5db',
			borderRadius: '0.375rem',
			padding: '0.625rem',
			color: '#ffffff',
			textColor: '#ffffff',
			boxShadow: 'none',
			'&:hover': {
				borderColor: '#4299E1',
			},
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? '#F7FAFC' : '#EDF2F7',
			color: '#1A202C',
		}),
	};

	return (
		<div className={'w-full'}>
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an activity</label>
			<Select
				id="activities"
				options={options}
				className="w-full"
				classNamePrefix="select"
				isSearchable
				name="color"
				placeholder="Choose an activity"
				styles={customStyles}
				onChange={(selectedOption) => onActivityChange(selectedOption.label)}
			/>
		</div>
	);
};

export default SelectActivity;
