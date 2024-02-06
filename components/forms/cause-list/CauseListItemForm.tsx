import { Staff } from '@/lib/types/staff';
import { Combobox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { Fragment, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

interface CauseListItemFormProp {
	addCauseListItem: (article: any) => void;
	advocates?: Staff[];
	index: number;
	register: UseFormRegister<any>; // Adjust the type if necessary
	remove: (index: number) => void;
}

const CauseListItemForm = ({
	addCauseListItem,
	advocates,
	index,
	register,
	remove,
}: CauseListItemFormProp) => {
	const [selectedPeople, setSelectedPeople] = useState<Staff[]>([]);
	const [query, setQuery] = useState('');
	const [formValues, setFormData] = useState<any>({
		key: null,
		coram: '',
		virtual: null,
		parties: '',
		tags: '',
		advocates: [],
	});

	const filteredPersons = (data: Staff[]) => {
		const filteredData = query
			? data.filter((item) => item?.name.toLowerCase().includes(query.toLowerCase()))
			: data;

		return filteredData;
	};

	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const isVirtual = [
		{ id: 1, name: 'YES' },
		{ id: 2, name: 'NO' },
	];

	return (
		<>
			<div className="md:col-span-4 col-span-6">
				<label className="form-control w-full max-w-xs ">
					<div className="block text-sm font-medium text-secondary-700">
						<span className="label-text">Coram</span>
					</div>
					<input
						type="text"
						placeholder="Coram"
						{...register(`cause.${index}.coram`)}
						className={`sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
						disabled={isDisabled}
					/>
				</label>
			</div>
			<div className="md:col-span-2 col-span-6">
				<label className="form-control w-full max-w-xs ">
					<div className="block text-sm font-medium text-secondary-700">
						<span className="label-text">Virtual</span>
					</div>
					<select
						id="virtual"
						{...register(`cause.${index}.virtual`)}
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					>
						<option
							selected
							disabled
							value=""
							className="text-opacity-50 text-secondary-700"
						>
							--Is Virtual?--
						</option>

						{isVirtual?.map((item) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</label>
			</div>
			<div className="col-span-6">
				<label className="form-control w-full max-w-xs ">
					<div className="block text-sm font-medium text-secondary-700">
						<span className="label-text">Case No. & Parties</span>
					</div>
					<textarea
						placeholder="Case No. & Parties"
						id="parties"
						{...register(`cause.${index}.case` as const)}
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-20  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					/>
				</label>
			</div>
			<div className="col-span-6">
				<label htmlFor="advocates" className="block text-sm font-medium text-secondary-700">
					Advocate(s) handling
				</label>
				<div className="mt-1 relative">
					<input
						id="advocates"
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
						placeholder="Select advocate(s)"
						value={selectedPeople.map((person) => person.name).join(', ')}
						readOnly
					/>
					<Transition
						as={Fragment}
						show={query !== ''}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<div className="mt-1 w-full absolute z-10 bg-white rounded-md shadow-lg">
							{filteredPersons(advocates)?.map((person) => (
								<div
									key={person.id}
									className="cursor-pointer text-sm text-secondary-900 hover:bg-primary-100 px-4 py-2"
									onClick={() => {
										setSelectedPeople((prev) => [...prev, person]);
										setQuery('');
									}}
								>
									{person.name}
								</div>
							))}
						</div>
					</Transition>
				</div>
			</div>
			<div className="col-span-1 flex w-full items-center justify-center md:col-span-full">
				<button
					onClick={() => remove(index)}
					className="bg-primary-600 text-white p-2 rounded-md mt-5"
					type="button"
				>
					<span className="sr-only">Delete</span>
					<Icon icon="heroicons:trash" />
				</button>
			</div>
		</>
	);
};

export default CauseListItemForm;
