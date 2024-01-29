'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Dashboard() {
	const { data, isPending } = useQuery({
		queryKey: ['staffList'],
		queryFn: () => axios.get('/api/staff/get').then((response) => response.data),
	});

	console.log(data);

	return 'staff List';
}
