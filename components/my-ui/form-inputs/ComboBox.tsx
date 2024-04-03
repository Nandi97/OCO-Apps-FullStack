import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { FieldError } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ComboBoxWrapper({
	value = [],
	onChange,
	onBlur,
	label,
	options,
	error,
	className,
}: {
	className: any;
	value: any[];
	onChange: any;
	onBlur: any;
	label: string;
	options: any[];
	error: FieldError | undefined;
}) {
	const [query, setQuery] = useState('');

	const getNameFromValue = (value: string | number) => {
		const option = options.find((option) => option.value === value);
		return option ? option.label : '';
	};

	const handleSelect = (selectedValue: string | number) => {
		const isSelected = value.includes(selectedValue);
		if (isSelected) {
			onChange(value.filter((val) => val !== selectedValue));
		} else {
			onChange([...value, selectedValue]);
		}
	};

	const filteredOptions =
		query === ''
			? options
			: options.filter((option) => {
					return option.label.toLowerCase().includes(query.toLowerCase());
				});

	return (
		<>
			<Combobox value={value} onChange={onChange} multiple>
				<Combobox.Label className="block text-sm font-medium text-secondary-700">
					{label}
				</Combobox.Label>
				<div className="relative mt-3">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
						<Combobox.Button className="inset-y-0 right-0 flex w-full items-center pr-2">
							<Combobox.Input
								className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
								onChange={(event) => setQuery(event.target.value)}
								value={value.map(getNameFromValue).join(', ')}
								placeholder="Start typing to search..."
								onBlur={onBlur}
							/>
							<Icon
								icon="heroicons:chevron-up-down"
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredOptions.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredOptions.map((option) => (
									<Combobox.Option
										key={option.id}
										className={({ active }) =>
											`relative cursor-default py-2 pl-10 pr-4 ${
												active
													? 'bg-orange-600 text-white'
													: 'text-gray-900'
											}`
										}
										value={option.value}
										onSelect={() => handleSelect(option.value)}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													{option.label}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active
																? 'text-white'
																: 'text-orange-600'
														}`}
													>
														<Icon
															icon="heroicons:check"
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
			{error && (
				<p className="mt-2 text-sm text-red-600" id="email-error">
					{error.message}
				</p>
			)}
		</>
	);
}
