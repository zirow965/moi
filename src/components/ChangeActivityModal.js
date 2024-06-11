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
		<BaseModal isOpen={isOpen} onClose={onClose} title="تغيير نشاط" companyId={companyId} onSubmit={handleSubmit}>
			<div className="grid gap-4 mb-4 grid-cols-1">
				<div>
			<SelectActivity id="newActivity" label="New Activity" onActivityChange={setNewActivity}/>
				</div>
			</div>
		</BaseModal>
	);
};

export default ChangeActivityModal;
