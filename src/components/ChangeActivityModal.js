import { useState } from 'react';
import BaseModal from './BaseModal';
import SelectActivity from "@/components/SelectActivity";

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
			<SelectActivity id="newActivity" label="New Activity" onActivityChange={setNewActivity}/>
				</div>
			</div>
		</BaseModal>
	);
};

export default ChangeActivityModal;
