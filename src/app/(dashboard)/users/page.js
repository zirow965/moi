'use client';

import {useState} from 'react';
import dynamic from 'next/dynamic';
import UserCard from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

const AddUserModal = dynamic(() => import('@/components/AddUserModal'), { ssr: false });

function PlusIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
}

const Page = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const fetcher = (url) => fetch(url, {
		method: 'GET',
		headers: {
			'authorization': '364c9f6a-2e40-429f-bd1c-fba2e39b17a6',
		}
	}).then(res => res.json());

	const { data: users, error, isLoading } = useSWR('/api/users', fetcher);

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	return (
		<div className="container px-4 py-6 md:px-6">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-medium dark:text-white">Users</h2>
				<Button size="sm" variant="outline" className={'dark:text-white dark:bg-gray-700'}
				        onClick={() => setIsModalOpen(true)}>
					<PlusIcon className="h-4 w-4 mr-2" />
					Add User
				</Button>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
				{users.map((user) =>
					<UserCard key={user.uid} user={user} />
				)}
			</div>
			{isModalOpen && <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>}
		</div>
	);
};

export default Page;
