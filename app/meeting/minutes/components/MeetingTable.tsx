'use client';
import OptDropdown from '@/components/my-ui/OptDropdown';
import SearchInput from '@/components/my-ui/SearchInput';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MeetingTable() {
	const [title, setTitle] = useState('Minutes');
	const [searchParam, setSearchParam] = useState<string | null>(null);

	const pathname = usePathname();

	const headerOptBtnTxt = {
		icon: 'heroicons:chevron-down',
		name: 'Options',
		buttonClassName:
			'inline-flex items-center justify-center w-full h-8 px-4 text-xs text-white rounded-sm shadow-sm bg-ocoblue-600 focus:outline-none focus:ring-2 focus:ring-ocoblue-600 focus:ring-offset-0 focus:ring-offset-ocoblue-100',
		iconClassName: '',
	};

	const headerOptionsList = [
		// { name: 'New Staff Member', action: newStaffMember, icon: 'heroicons:user-plus' },
		// {
		// 	name: 'Export Staff List',
		// 	action: exportStaffList,
		// 	icon: 'vscode-icons:file-type-excel2',
		// },
	];
	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};

	return (
		<>
			<div className="sticky z-20 md:flex items-center justify-between gap-2 bg-white top-2 hidden">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<Link
						href={`${pathname}/create`}
						className="inline-flex items-center justify-center w-8 h-8 p-2 text-xs rounded-sm shadow-sm text-ocoblue-600 bg-ocoblue-100 focus:ring-offset-ocoblue-100"
					>
						<Icon icon={'heroicons:document-plus'} />
					</Link>
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div></div>
		</>
	);
}
