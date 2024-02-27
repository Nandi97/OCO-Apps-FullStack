import { metadata } from '@/app/layout';
import Dashboard from '@/components/main/staff/leave-applicaton/Dashboard';

export default function LeaveApplication() {
	metadata.title = 'Leave Application';

	return (
		<div className="space-y-2">
			<Dashboard />
		</div>
	);
}
