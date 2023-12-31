'use client';
import { useEffect, useState } from 'react';

export default function InstructionNotes() {
	const [title, setTitle] = useState('');

	// Update the title and breadcrumbs
	useEffect(() => {
		setTitle('Instruction Notes');
	}, []);

	return (
		<div className="space-y-2">
			<div className="bg-white flex flex-col gap-2">
				<h1 className="font-extralight text-lg text-accent-700">{title}</h1>
			</div>
		</div>
	);
}
