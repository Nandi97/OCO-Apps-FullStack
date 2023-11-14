import { URL } from '@/components/types/URL';
import LeavePrev from '../components/LeavePrev';

export default function Leave(url?: URL) {
	const params = url?.params?.slug?.toString();
	// console.log(params);
	return (
		<div>
			<LeavePrev url={params ? params : ''} />
		</div>
	);
}
