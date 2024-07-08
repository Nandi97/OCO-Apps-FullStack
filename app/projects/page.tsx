import Dashboard from '@/components/main/projects/Dashboard';

import { usePathname } from 'next/navigation';
import { metadata } from '@/app/layout';

export default function Project() {
	metadata.title = 'Projects';
	return (
		<div className="space-y-2">
			<Dashboard />
		</div>
	);
}
