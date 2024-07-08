import axios from 'axios';

// Fetch All Project Tags
export const fetchAllProjectTags = async () => {
	const response = await axios.get('/api/project/get');
	return response.data;
};
