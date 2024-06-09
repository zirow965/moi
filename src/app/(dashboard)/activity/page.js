'use client';
import { useState } from 'react';
import AddActivityModal from "@/components/AddActivityModal";
import {useActivities} from "@/utils/hooks";
import {doc, setDoc} from "firebase/firestore";
import Swal from "sweetalert2";
import {db} from "@/utils/firebaseConfig";


const Page = () => {
	const { activities } = useActivities();
	const [isModalOpen, setModalOpen] = useState(false);


	async function handleDeleteActivity(activity) {
		const newActivities = activities.filter((a) => a !== activity);
		setDoc(doc(db, "options", "activities"), {
			activities: newActivities
		}).then(
		await Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Activity has been deleted successfully',
		})).catch(e => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: "Error occurred while deleting activity",
			})
		})
	}


	return (
		<div>
			<div className="flex justify-end mb-4">
			<button
				onClick={() => setModalOpen(true)}
				className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Add
			</button>
			</div>
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 grow">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="px-6 py-3 w-1/3">ID</th>
					<th scope="col" className="px-6 py-3 w-1/3">Name</th>
					<th scope="col" className="px-6 py-3 w-1/3">Action</th>
				</tr>
				</thead>
				<tbody>
				{activities && activities?.map((activity, idx) => (
					<tr key={idx}
					    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td className="px-6 py-4">{idx+1}</td>
						<td className="px-6 py-4">{activity}</td>
						<td className="px-6 py-4 relative">
							<div className="relative inline-block text-left">
								<button
									className="inline-flex justify-center w-full dark:text-white dark:bg-gray-800 dark:border-gray-700 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
									onClick={() => handleDeleteActivity(activity)}
								>
									Delete
								</button>
							</div>
						</td>
					</tr>
				))}
				</tbody>
			</table>
			{isModalOpen && <AddActivityModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}
			                                  />}
		</div>
	);
};

export default Page;
