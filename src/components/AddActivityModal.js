import { useState } from 'react';
import TextInput from './TextInput';
import {useActivities} from "@/utils/hooks";
import {doc, setDoc} from "firebase/firestore";
import {db} from "@/utils/firebaseConfig";
import Swal from "sweetalert2";

const AddActivityModal = ({ isOpen, onClose, onSubmit }) => {
	const [activityName, setActivityName] = useState('');
	const { activities } = useActivities();

	async function handleAddActivity(e) {
		e.preventDefault();
		const newActivities = [...activities, activityName];
		setDoc(doc(db, "options", "activities"), {
			activities: newActivities
		}).then(async () => {
			await Swal.fire({
				icon: 'success',
				title: 'Success',
				text: 'Activity has been added successfully',
			})
			onClose();
		}).catch((e) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: "Error occurred while adding activity",
			})
		})
	}

	return (
		<div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
			<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Add new Activity
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
					<form className="p-4 md:p-5 space-y-4" onSubmit={handleAddActivity}>
						<TextInput
							id="activityName"
							label="Activity Name"
							value={activityName}
							onChange={(e) => setActivityName(e.target.value)}
						/>
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

export default AddActivityModal;
