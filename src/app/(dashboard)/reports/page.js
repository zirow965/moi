'use client';
import React, { useState, useEffect } from 'react';
import { Datepicker } from "flowbite-react";
import { Bar } from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import { db } from '@/utils/firebaseConfig';
import {collection, query, where, orderBy, onSnapshot} from "firebase/firestore";
import useSWR from "swr";

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
			name: 'Car',
			value: 'car'
		},
		{
			name: 'Company',
			value: 'companyOwner'
		},
		{
			name: 'Renewal',
			value: 'renewal'
		},
		{
			name: 'Authorized',
			value: 'authorized'
		},
		{
			name: 'Activity',
			value: 'activity'
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
				condition.push(where('timestamp', '>=', startOfDay.toISOString()), where('timestamp', '<=', endOfDay.toISOString()));
			}

			if (selectedUserId)
				condition.push(where('userId', '==', selectedUserId));

			if (!condition){
				condition.push(where('timestamp', '>=', oneDayAgo.toISOString()));
			}
			const q = query(collection(db, 'logs'), orderBy('timestamp', 'desc'), ...condition);
			return onSnapshot(q, (logsSnapshot) => {
				const logs = logsSnapshot.docs.map(doc => doc.data());
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
						<option value={''}  >Select User</option>
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
		</div>
	);
};

export default Page;
