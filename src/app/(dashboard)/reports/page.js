'use client'
import { useState, useEffect } from 'react';

const Page = () => {
	const [loading, setLoading] = useState(false);


	useEffect(() => {

	}, []);



	if (loading)
		return <div/>

	return (
		<div>

		</div>

	);
};

export default Page;
