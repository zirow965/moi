import React, {useEffect, useState} from "react";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "@/utils/firebaseConfig";

const BaseModal = ({ isOpen, onClose, title, company}) => {

	const [logs, setLogs] = useState([]);

	useEffect(() => {
		const q = query(collection(db, 'logs'), where('companyId', '==', company.id),  orderBy('timestamp', 'desc'), limit(10));

		getDocs(q).then((querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setLogs(data);
		}  );

	}, [company.id]);

	function getChanges(before, after) {
		const changes = {};

		for (const key in after) {
			if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
				changes[key] = {
					before: before[key],
					after: after[key]
				};
			}
		}

		return changes;
	}

	return (
		<div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
			<div className="relative p-4 w-full max-w-5xl max-h-screen">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div
						className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={onClose}
						>
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
							     viewBox="0 0 14 14">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<table
						className="w-full max-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 grow">
						<thead
							className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md text-center">
						<tr>
							<th scope="col" className="px-6 py-3">تاريخ</th>
							<th scope="col" className="px-6 py-3">Key</th>
							<th scope="col" className="px-6 py-3">Before</th>
							<th scope="col" className="px-6 py-3">After</th>
						</tr>
						</thead>
						<tbody>
						{logs?.map((log) => {
							const changes = getChanges(log.before, log.after);
							return Object.keys(changes).map((key) => (
								<tr key={log.id + key}
								    className={`text-center bg-white text-md border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${company.active === false ? 'dark:bg-red-800 bg-red-300' : ''}`}>
									<td className="px-6 py-4">
										{new Date(new Date(log.timestamp).getTime() - (3 * 60 * 60 * 1000)).toLocaleString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: 'numeric',
											minute: '2-digit',
											second: '2-digit',
											hour12: true
										})}
									</td>
									<td className="px-6 py-4">{key}</td>
									{key === 'activity' ? (
										<>
										<td className="px-6 py-4">
											{changes[key].after.map((ele, idx) => {
												return changes[key].after.length - 1 === idx ?
													<span key={ele}>{`${ele}`}</span>
													:
													<span key={ele}>{`${ele} / `}</span>
											})}
										</td>
										<td className="px-6 py-4">
											{changes[key].after.map((ele, idx) => {
												return changes[key].after.length - 1 === idx ?
													<span key={ele}>{`${ele}`}</span>
													:
													<span key={ele}>{`${ele} / `}</span>
											})}
										</td>
										</>
										) : <>
										<td className="px-6 py-4">{changes[key].before}</td>
										<td className="px-6 py-4">{changes[key].after}</td>
									</>}
								</tr>
							));
						})}
						</tbody>
					</table>
					<div className="flex justify-center mt-4">
						<button
							type="button"
									className="mb-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={onClose}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BaseModal;
