'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import {db} from "@/utils/firebaseConfig";
import {writeBatch, doc, collection} from "firebase/firestore";
import Swal from "sweetalert2";


const Page = () => {
	const [data, setData] = useState([]);

	const handleFileUpload = (e) => {
		Papa.parse(e.target.files[0], {
			header: false,
			complete: function(results) {
				setData(results.data);
			}
		});
	};

	const handleUpload = async () => {
		  Swal.fire({
			title: 'Uploading...',
			text: 'Please wait a moment',
			timerProgressBar: true,
			showConfirmButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
		});
		const batch = writeBatch(db);
		for (const row of data) {
			const ref = doc(collection(db, 'companies'));
			await batch.set(ref, {
				_id: row[0],
				companyOwner: row[1],
				plate: row[2],
				activity: row[3],
				VIN: row[4],
				carMake: row[5],
				carModel: row[6],
				carYear: row[7]
			})
		}
		await batch.commit();
		await Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Data has been uploaded successfully',
		});
	};

	return (
		<div>
			<div className="flex items-center justify-center w-full">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="csv-file">
				<input
					onChange={handleFileUpload}
					className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
					id="csv-file" type="file" accept=".csv"/>
				</label>
			</div>
			<table className="mt-6 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 grow">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="px-6 py-3">الرقم المركزي للترخيص</th>
					<th scope="col" className="px-6 py-3">صاحب الرخصة</th>
					<th scope="col" className="px-6 py-3">رقم اللوحة</th>
					<th scope="col" className="px-6 py-3">النشاط</th>
					<th scope="col" className="px-6 py-3">رقم القاعدة</th>
					<th scope="col" className="px-6 py-3">صنع المركبة</th>
					<th scope="col" className="px-6 py-3">مو</th>
					<th scope="col" className="px-6 py-3">Car Year</th>
				</tr>
				</thead>
				<tbody>
				{data.map((company) => (
					<tr key={company[0]}
					    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td className="px-6 py-4">{company[0]}</td>
						<td className="px-6 py-4">{company[1]}</td>
						<td className="px-6 py-4">{company[2]}</td>
						<td className="px-6 py-4">{company[3]}</td>
						<td className="px-6 py-4">{company[4]}</td>
						<td className="px-6 py-4">{company[5]}</td>
						<td className="px-6 py-4">{company[6]}</td>
						<td className="px-6 py-4">{company[7]}</td>
					</tr>
				))}
				</tbody>
			</table>
			<button type="button"
			        disabled={data.length === 0}
			        onClick={handleUpload}
			        className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
				Upload
			</button>
		</div>
	);
};

export default Page;
