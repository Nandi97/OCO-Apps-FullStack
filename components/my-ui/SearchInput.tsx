import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Icon } from '@iconify/react/dist/iconify.js';
import useDebounce from '@/hooks/useDebounce';

export default function SearchInput({ onSearch }: any) {
	const [searchInput, setSearchInput] = useState('');
	const debouncedSearchInput = useDebounce(searchInput, 500); // Adjust the delay as needed

	// You can now call the onSearch function with the debounced searchInput
	useEffect(() => {
		onSearch(debouncedSearchInput);
	}, [debouncedSearchInput, onSearch]);

	return (
		<div>
			<label className="relative inline-flex h-8 w-full items-center md:w-72">
				<input
					type="search"
					name="search"
					id="search"
					placeholder="Search..."
					className="border-1 shadow-accent-300 block h-full w-full rounded-lg border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 pl-8 text-xs text-secondary-900  shadow-inner focus:border-blue-500 focus:ring-secondary-500"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<Icon
					icon="heroicons:magnifying-glass"
					className="text-md absolute left-2 top-2 text-zinc-500"
				/>
			</label>
		</div>
	);
}
