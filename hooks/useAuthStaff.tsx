'use client';

import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Staff } from '@/lib/types/master';

const getAllStaff = async () => {
	const response = await axios.get(`/api/staff/get`);
	return response.data as Array<Staff>;
};

const useAuthStaff = () => {
	const { data: session } = useSession();
	const { data: staff } = useQuery({
		queryFn: getAllStaff,
		queryKey: ['all-staff'],
	});

	const data = staff?.find((item: any) => item?.email === session?.user?.email);
	return data;
};

export default useAuthStaff;
