import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

interface Item {
	id: number;
	name: string;
}

interface MultiComboboxProps {
	items: Item[];
	initialSelectedItems?: Item[];
}

export default function MultiCombobox({ items, initialSelectedItems }: MultiComboboxProps) {
	const [selectedItems, setSelectedItems] = useState<Item[]>(initialSelectedItems || []);
	const [query, setQuery] = useState('');

	const filteredItems = query
		? items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
		: items;

	const displaySelectedNames = (selectedItems: Item[]) =>
		selectedItems ? selectedItems.map((item) => item?.name).join(', ') : '';
	return (
		<Combobox value={selectedItems} onChange={setSelectedItems} multiple>
			<Combobox.Input
				className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
				displayValue={displaySelectedNames}
				onChange={(event) => setQuery(event.target.value)}
			/>
			<Combobox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
				{filteredItems?.map((item) => (
					<Combobox.Option
						key={item.id}
						value={item}
						className={({ active, selected }) =>
							classNames(
								'flex cursor-default select-none justify-between py-2 pl-3 pr-9',
								active ? 'bg-primary-600 text-white' : 'text-secondary-900'
							)
						}
					>
						{({ active, selected }) => (
							<>
								<div className="flex">
									<span
										className={classNames(
											'truncate',
											selected && 'font-semibold text-primary-400'
										)}
									>
										{item?.name}
									</span>
								</div>

								{selected && (
									<span
										className={classNames(
											'inset-y-0 right-0 flex items-center pr-4',
											active ? 'text-white' : 'text-secondary-600'
										)}
									>
										<Icon
											icon="heroicons:check"
											className="h-5 w-5"
											aria-hidden="true"
										/>
									</span>
								)}
							</>
						)}
					</Combobox.Option>
				))}
			</Combobox.Options>
		</Combobox>
	);
}
