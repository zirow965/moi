'use client'
import UserCard from "@/components/UserCard";
import {Button} from "@/components/ui/button";
import Swal from "sweetalert2";
import {useEffect} from "react";
import useSWR from "swr";


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
			<path d="M5 12h14"/>
			<path d="M12 5v14"/>
		</svg>
	);
}


const Page = () => {
	const fetcher = (url) => fetch(url, {
		method: 'GET',
		headers: {
			'authorization': '364c9f6a-2e40-429f-bd1c-fba2e39b17a6',
		}
	}).then(res => res.json())
	const { data, error, isLoading } = useSWR('/api/users', fetcher)
	// useEffect(() => {
	// 	fetch('/api/users', {
	// 		method: 'GET',
	// 		headers: {
	// 			'authorization': '364c9f6a-2e40-429f-bd1c-fba2e39b17a6',
	// 		}
	// 	}).then(res => {
	// 		console.log(res)
	// 		if (res.status === 500) {
	// 			Swal.fire({
	// 				title: 'Error fetching users',
	// 				icon: 'error',
	// 				confirmButtonText: 'OK'
	// 			})
	// 		}
	//
	// 	}).catch(err => {
	// 		console.error(err)
	// 		Swal.fire({
	// 			title: 'Error fetching users',
	// 			icon: 'error',
	// 			confirmButtonText: 'OK'
	// 		})
	// 	})
	// }, []);

	if (error) return <div>failed to load</div>
	if (isLoading) return <div/>

	const users = [
		{id: 1, name: "John Doe", email: "john@example.com", avatar: "/placeholder-avatar.jpg"},
		{id: 2, name: "Jane Doe", email: "jane@example.com", avatar: "/placeholder-avatar.jpg"},
		{id: 3, name: "Bob Smith", email: "bob@example.com", avatar: "/placeholder-avatar.jpg"},
		{id: 4, name: "Alice Johnson", email: "alice@example.com", avatar: "/placeholder-avatar.jpg"},
	];


	return (
		<div className="container px-4 py-6 md:px-6">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-medium dark:text-white">Users</h2>
				<Button size="sm" variant="outline" className={'dark:text-white dark:bg-gray-700'}
				        onClick={() => {

				        }}>
					<PlusIcon className="h-4 w-4 mr-2"/>
					Add User
				</Button>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
				{data.users.map((user) =>
					<UserCard key={user.id} user={user}/>
				)}
			</div>
		</div>

	);
};

export default Page;
