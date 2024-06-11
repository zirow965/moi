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
							<th scope="col" className="px-6 py-3">الرقم المركزي للترخيص</th>
							<th scope="col" className="px-6 py-3">صاحب الرخصة</th>
							<th scope="col" className="px-6 py-3">رقم اللوحة</th>
							<th scope="col" className="px-6 py-3">النشاط</th>
							<th scope="col" className="px-6 py-3">رقم القاعدة</th>
							<th scope="col" className="px-6 py-3">صنع المركبة</th>
							<th scope="col" className="px-6 py-3">موديل المركبة</th>
							<th scope="col" className="px-6 py-3">سنة الصنع</th>
							<th scope="col" className="px-6 py-3">Action</th>
						</tr>
						</thead>
						<tbody>
						{logs?.map((company) => (
							<tr key={company.id}
							    className={`text-center bg-white text-md border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${company.active === false ? 'dark:bg-red-800 bg-red-300' : ''}`}>
								<td className="px-6 py-4">
									{new Date(new Date(company.timestamp).getTime() - (3 * 60 * 60 * 1000)).toLocaleString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: 'numeric',
										minute: '2-digit',
										second: '2-digit',
										hour12: true
									})}
								</td>
								<td className="px-6 py-4">{company.after._id}</td>
								<td className="px-6 py-4">{company.after.companyOwner}</td>
								<td className="px-6 py-4">{company.after.plate}</td>
								<td className="px-6 py-4">{Array.isArray(company.after.activity) ? company.after.activity?.map((ele, idx) => {
									return company.after.activity.length - 1 === idx ?
										<span key={ele}>{`${ele}`}</span>
										:
										<span key={ele}>{`${ele} / `}</span>
								}) : company.after.activity || ''}</td>
								<td className="px-6 py-4">{company.after.VIN}</td>
								<td className="px-6 py-4">{company.after.carMake}</td>
								<td className="px-6 py-4">{company.after.carModel}</td>
								<td className="px-6 py-4">{company.after.carYear}</td>
							</tr>
						))}
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
