import { metadata } from '@/app/layout';
import Layout from './components/Layout';

export default function LeaveApplication() {
	metadata.title = 'Leave Application';

	return (
		<div className="space-y-2">
			<Layout />
		</div>
	);
}
