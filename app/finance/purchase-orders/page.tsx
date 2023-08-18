'use client';
import OptDropdown from '@/components/my-ui/OptDropdown';
import SearchInput from '@/components/my-ui/SearchInput';
import { useEffect, useState } from 'react';

export default function PurchaseOrder() {
	const [title, setTitle] = useState('');
	const [searchParam, setSearchParam] = useState<string | null>(null);

	// Update the title and breadcrumbs
	useEffect(() => {
		setTitle('Purchase Orders');
	}, []);

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};
	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					{/* <OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} /> */}
				</div>
			</div>
		</div>
	);
}
