'use client';
import OptDropdown from '@/components/my-ui/OptDropdown';
import { redirect, usePathname } from 'next/navigation';

export default function Layout() {
	const pathname = usePathname();
	const newLeaveApplication = () => {
		// console.log('new Staff Member');
		redirect(`${pathname}/create`);
	};
	// Header Dropdown
	const headerOptBtnTxt = {
		icon: 'heroicons:chevron-down',
		name: 'Options',
		buttonClassName:
			'inline-flex items-center justify-center w-full h-8 px-4 text-xs text-white rounded-sm shadow-sm bg-ocoblue-600 focus:outline-none focus:ring-2 focus:ring-ocoblue-600 focus:ring-offset-0 focus:ring-offset-ocoblue-100',
		iconClassName: '',
	};

	const headerOptionsList = [
		{ name: 'New Leave Application', link: `${pathname}/create`, icon: 'heroicons:user-plus' },
	];
	return (
		<div>
			<div className="sticky z-20 md:flex items-center justify-between gap-2  top-2 hidden">
				<h1 className="text-lg font-extralight text-accent-700"></h1>
				<div className="inline-flex items-center space-x-2">
					{/* <SearchInput onSearch={handleSearch} /> */}
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
		</div>
	);
}
