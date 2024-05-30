import { useState } from 'react';
import BaseModal from './BaseModal';

const ChangeActivityModal = ({ isOpen, onClose, onSubmit, companyId }) => {
	const [newActivity, setNewActivity] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(newActivity);
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title="Change Activity" companyId={companyId} onSubmit={handleSubmit}>
			<div className="grid gap-4 mb-4 grid-cols-1">
				<div>
					<label htmlFor="newActivity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Activity</label>
					<input
						type="text"
						id="newActivity"
						name="newActivity"
						value={newActivity}
						onChange={(e) => setNewActivity(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						required
					/>
				</div>
			</div>
		</BaseModal>
	);
};

export default ChangeActivityModal;
