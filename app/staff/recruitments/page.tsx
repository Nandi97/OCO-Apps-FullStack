'use client';
import { useEffect, useState } from 'react';

export default function Recruitment() {
	const [title, setTitle] = useState('');

	// Update the title and breadcrumbs
	useEffect(() => {
		setTitle('Recruitment');
	}, []);

	return (
		<div className="space-y-2">
			<div className="flex flex-col gap-2 bg-white">
				<h1 className="text-accent-700 text-lg font-extralight">{title}</h1>
			</div>
		</div>
	);
}
