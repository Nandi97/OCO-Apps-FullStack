import { metadata } from '@/app/layout';
import Create from '@/components/main/cause-lists/Create';
import Dashboard from '@/components/main/cause-lists/Dashboard';
import React from 'react';

const page = () => {
	metadata.title = 'Cause List';
	return (
		<div>
			<Dashboard />
		</div>
	);
};

export default page;
