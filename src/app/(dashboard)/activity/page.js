'use client';
import {useEffect, useState} from 'react';


const Page = () => {
		const [activity, setActivity] = useState([]);

	// useEffect(() => {
	// 	const fetchActivity = async () => {
	// 		const activitySnapshot = await db.collection('activity').get();
	// 		const activityData = activitySnapshot.docs.map(doc => doc.data());
	// 		setActivity(activityData);
	// 	};
	// 	fetchActivity();
	// }, []);

	return (
		<div>

		</div>
	);
};

export default Page;
