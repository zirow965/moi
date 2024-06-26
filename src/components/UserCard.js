'use client'
import { Button } from "@/components/ui/button";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import {useState} from "react";
const EditUserModal = dynamic(() => import('@/components/EditUserModal'), { ssr: false });


function PencilIcon(props) {
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
			<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
			<path d="m15 5 4 4" />
		</svg>
	);
}

const UsersCard = ({user}) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const getInitials = (name) => {
		const splitName = name?.split(' ');
		const initials = splitName[0][0] + (splitName.length > 1 ? splitName[splitName.length - 1][0] : '');
		return initials.toUpperCase();
	}

	return (
					<div key={user.id} className="flex items-center space-x-4 rounded-md bg-white py-4 px-2 shadow-sm dark:bg-gray-700">
						<Avatar className="h-10 w-10">
							<AvatarFallback className={'dark:bg-gray-600'}>
								{getInitials(user?.displayName)}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="font-medium dark:text-white">{user.displayName}</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
							{user.disabled && <div className="text-sm text-red-500">Disabled</div>}
							{user.customClaims['admin'] && <div className="text-sm text-green-500">Admin</div>}
						</div>
								<Button onClick={() => setIsEditModalOpen(true)} size="icon" variant="ghost">
									<PencilIcon className="h-4 w-4 outline-none" />
								</Button>
						{isEditModalOpen && <EditUserModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}/>}
					</div>
	);
};

export default UsersCard;
