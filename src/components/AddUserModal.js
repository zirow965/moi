import { useState } from 'react';
import TextInput from './TextInput';
import swal from "sweetalert2";
import useSWR, { useSWRConfig } from 'swr'

const AddUserModal = ({ isOpen, onClose }) => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const { mutate } = useSWRConfig()

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const addUser = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'authorization': '364c9f6a-2e40-429f-bd1c-fba2e39b17a6',
				},
				body: JSON.stringify({ displayName: fullName, email, isAdmin }),
			});
			if (addUser.status !== 200) {
				await swal.fire( 'Error adding user', '', 'error')
			} else {
				await swal.fire( 'User added successfully', '', 'success')
				mutate('/api/users')
				onClose();
			}
		} catch (error) {
			await swal.fire( 'Error adding user', '', 'error')
			console.error('Error adding user:', error);
		}
	};

	return (
		<div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
			<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Add new user
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={onClose}
						>
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<form className="p-4 md:p-5 space-y-4" onSubmit={handleSubmit}>
						<TextInput
							id="fullName"
							label="Full Name"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
						<TextInput
							id="email"
							label="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className="flex items-center mb-4">
							<input id="default-checkbox" type="checkbox" value={isAdmin}
							       onChange={(e) => setIsAdmin(e.target.checked)}
							       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
							<label htmlFor="default-checkbox"
							       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ml-2 ">
								Admin
							</label>
						</div>
						<button
							type="submit"
							className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddUserModal;
