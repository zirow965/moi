import { useState } from 'react';
import BaseModal from './BaseModal';

const AuthorizedSignatureModal = ({ isOpen, onClose, onSubmit, companyId }) => {
	const [authorized, setAuthorized] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(authorized);
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title="Authorized Signature" companyId={companyId} onSubmit={handleSubmit}>
			<div className="grid gap-4 mb-4 grid-cols-1">
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Authorized Signature</label>
					<div className="flex space-x-4">
						<label className="flex items-center">
							<input
								type="radio"
								name="authorized"
								value="yes"
								checked={authorized === 'yes'}
								onChange={(e) => setAuthorized(e.target.value)}
								className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
							/>
							<span className="ml-2 text-sm text-gray-900 dark:text-white">Yes</span>
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="authorized"
								value="no"
								checked={authorized === 'no'}
								onChange={(e) => setAuthorized(e.target.value)}
								className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
							/>
							<span className="ml-2 text-sm text-gray-900 dark:text-white">No</span>
						</label>
					</div>
				</div>
			</div>
		</BaseModal>
	);
};

export default AuthorizedSignatureModal;
