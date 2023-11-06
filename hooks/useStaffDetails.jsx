'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useStaffDetails = (slug) => {
	const [staff, setStaff] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const response = await axios.get(`/api/staff/${slug}`);
				setStaff(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchDetails();
	}, [slug]);

	return { staff, loading, error };
};

export default useStaffDetails;
