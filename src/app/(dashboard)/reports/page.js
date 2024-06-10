'use client';
import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import {db} from '@/utils/firebaseConfig';
import {collection, deleteDoc, doc, onSnapshot, orderBy, query, where} from "firebase/firestore";
import useSWR from "swr";
import Swal from "sweetalert2";

Chart.register(CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend);


const Page = () => {
	const [logs, setLogs] = useState([]);
	const [selectedType, setSelectedType] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [selectedUserId, setSelectedUserId] = useState('');
	const types = [
		{
			name: 'استبدال مركبة',
			value: 'car'
		},
		{
			name: 'تغيير صاحب الرخصة',
			value: 'companyOwner'
		},
		{
			name: 'تجديد الترخيص التجاري',
			value: 'renewal'
		},
		{
			name: 'تجديد اعتماد التوقيع',
			value: 'authorized'
		},
		{
			name: 'تغيير نشاط',
			value: 'activity'
		},
		{
			name: 'الغاء ترخيص تجاري',
			value: 'active'
		}

	]
	const fetcher = (url) => fetch(url, {
		method: 'GET',
		headers: {
			'authorization': '364c9f6a-2e40-429f-bd1c-fba2e39b17a6',
		}
	}).then(res => res.json());

	const { data: users, error, isLoading } = useSWR('/api/users', fetcher);

	useEffect(() => {
		const fetchLogs = () => {
			const oneDayAgo = new Date();
			oneDayAgo.setDate(oneDayAgo.getDate() - 1);
			const condition = []

			if (selectedType) {
				condition.push(where('type', '==', selectedType));
			}

			if (startDate && endDate) {
				const startOfDay = new Date(startDate);
				const endOfDay = new Date(endDate);
				endOfDay.setHours(23, 59, 59, 999);
				startOfDay.setHours(0, 0, 0, 0);
				condition.push(where('timestamp', '>=', startOfDay.toISOString()), where('timestamp', '<=', endOfDay.toISOString()));
			}

			if (selectedUserId)
				condition.push(where('userId', '==', selectedUserId));

			if (!condition){
				condition.push(where('timestamp', '>=', oneDayAgo.toISOString()));
			}
			const q = query(collection(db, 'logs'), orderBy('timestamp', 'desc'), ...condition);
			return onSnapshot(q, (logsSnapshot) => {
				const logs = logsSnapshot.docs.map(doc => {
					return {id: doc.id, ...doc.data()}
				});
				setLogs(logs);

			});
		};

		const unsubscribe = fetchLogs();
		return () => unsubscribe();
	}, [selectedType, startDate, endDate, selectedUserId]);

	const colors = [
		'rgba(75,192,192,0.4)',
		'rgba(192,75,75,0.4)',
		'rgba(75,75,192,0.4)',
		'rgba(192,192,75,0.4)',
		'rgba(75,192,75,0.4)',
		'rgba(192,75,192,0.4)',
		'rgba(75,75,75,0.4)',
		'rgba(192,192,192,0.4)',
		'rgba(75,192,75,0.4)',
		'rgba(192,75,192,0.4)'
	];

	const dates = [...new Set(logs.map(log => new Date(log.timestamp).toISOString().split('T')[0]))].sort();

	const datasets = types.map((type, index) => {
		const data = dates.map(date => logs.filter(log => new Date(log.timestamp).toISOString().split('T')[0] === date && log.type === type.value).length);
		return {
			label: type.name,
			data: data,
			backgroundColor: colors[index % colors.length],
			borderColor: colors[index % colors.length],
			borderWidth: 1
		};
	});

	const data = {
		labels: dates,
		datasets: datasets
	};

	async function handleDeleteLog(log) {
		await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it',
			confirmButtonColor: '#d9534f',
			cancelButtonColor: '#5bc0de'
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deleteDoc(doc(db, 'logs', log.id));
				await Swal.fire(
					'Deleted!',
					'Your log has been deleted.',
					'success'
				)
			}
		})

	}

	function handleViewLog(log) {

	}

	return (
		<div>
			<form className={'space-x-3'}>
				<select id="types"
				        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				        value={selectedType} onChange={e => setSelectedType(e.target.value)}>
					<option value={''}>All Types</option>
					{types.map(type => <option key={type.name} value={type.value}>{type.name}</option>)}
				</select>
				<input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
				<input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
				{!isLoading &&
					<select id="users"
					        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					        value={selectedUserId} onChange={e =>
						setSelectedUserId(e.target.value)
					}>
						<option value={''}>Select User</option>
						{users && users.map(user => (
							<option key={user.uid} value={user.uid}>
								{user.displayName}
							</option>
						))}
					</select>
				}
			</form>
			<Bar data={data} options={{
				scales: {
					x: {},
					y: {
						min: 0,
						max: Math.max(...data.datasets.map(dataset => Math.max(...dataset.data)) + 10),
						ticks: {stepSize: 10}
					}
				}
			}}/>
			<table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 grow">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="px-6 py-3">Name</th>
					{types.map((type, idx) =>
						<th key={idx + 999} scope="col" className="px-6 py-3">{type.name}</th>
					)}
				</tr>
				</thead>
				<tbody>
				{users?.map((user, idx) => (
					logs.filter(log => log.userId === user.uid).length > 0 && (
						<tr key={idx}
						    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
							<td className="px-6 py-4">{user.displayName}</td>
							{types.map((type, index) => (
								<td key={index}
								    className="px-6 py-4">{logs.filter(log => log.userId === user.uid && log.type === type.value).length}</td>
							))}
						</tr>
					)
				))}
				<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
					<td className="px-6 py-4">Total</td>
					{types.map((type, index) => (
						<td key={index} className="px-6 py-4">{logs.filter(log => log.type === type.value).length}</td>
					))}
				</tr>
				</tbody>
			</table>
			<table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 grow">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="px-6 py-3">Date</th>
					<th scope="col" className="px-6 py-3">Name</th>
					<th scope="col" className="px-6 py-3">Type</th>
					<th scope="col" className="px-6 py-3">Before</th>
					<th scope="col" className="px-6 py-3">After</th>
					<th scope="col" className="px-6 py-3">Action</th>
				</tr>
				</thead>
				<tbody>
				{users && logs.map((log, idx) => (
					<tr key={idx}
					    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td className="px-6 py-4">
							{new Date(log.timestamp).toLocaleString('en-US', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: 'numeric',
								minute: '2-digit',
								second: '2-digit',
								hour12: true
							})}
						</td>
						<td className="px-6 py-4">{users.find(user => user.uid === log.userId)?.displayName}</td>
						<td className="px-6 py-4">{types.find(type => type.value === log.type)?.name}</td>
						<td className="px-6 py-4">{log.before[log.type] || ''}</td>
						<td className="px-6 py-4">{log.after[log.type]}</td>
						<td className="px-6 py-4 relative">
							<div className="relative inline-block text-left">
								<button
									className="inline-flex justify-center w-full dark:text-white dark:bg-gray-800 dark:border-gray-700 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
									onClick={() => handleViewLog(log)}
								>
									View
								</button>
								<button
									className="inline-flex justify-center w-full dark:text-white dark:bg-gray-800 dark:border-gray-700 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
									onClick={() => handleDeleteLog(log)}
								>
									Delete
								</button>
							</div>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default Page;
