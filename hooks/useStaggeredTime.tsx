import { useEffect, useState } from 'react';

const useStaggeredTime = (intervalMs = 1000) => {
	const [customTime, setCustomTime] = useState(new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setCustomTime(new Date().getTime());
		}, intervalMs);

		return () => clearInterval(interval);
	}, [intervalMs]);

	return customTime;
};

export default useStaggeredTime;
