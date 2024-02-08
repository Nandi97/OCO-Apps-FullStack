import { Staff } from '@/lib/types/staff';
import { Combobox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { Fragment, useState, useEffect } from 'react';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

interface CauseListItemFormProp {
	formValues: {
		virtual: 0;
		url: '';
		coram: '';
		case: '';
		advocates: [];
	};
	setFormValues: (updatedItem: any) => void;
	teamAdvocates?: Staff[];
	index: number;
}

const CauseListItemForm = ({
	formValues,
	setFormValues,
	index,
	teamAdvocates,
}: CauseListItemFormProp) => {
	const [isShowing, setIsShowing] = useState(false);
	const [selectedPeople, setSelectedPeople] = useState<Staff[]>([]);
	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? teamAdvocates
			: teamAdvocates?.filter((person) => {
					return person.name.toLowerCase().includes(query.toLowerCase());
				});

	useEffect(() => {
		setFormValues({ ...formValues, advocates: selectedPeople });
	}, [selectedPeople]);

	const isVirtual = [
		{ id: 1, name: 'YES' },
		{ id: 2, name: 'NO' },
	];
	return (
		<div className="flex w-full">
			<div className="grid w-11/12 grid-cols-6  gap-2 rounded-sm border border-secondary-700/10 p-4">
				<div className="md:col-span-4 col-span-6">
					<label className="form-control w-full max-w-xs ">
						<div className="block text-sm font-medium text-secondary-700">
							<span className="label-text">Coram</span>
						</div>
						<input
							type="text"
							placeholder="Coram"
							value={formValues?.coram}
							onChange={(e) =>
								setFormValues({
									...formValues,
									coram: e.target.value,
								})
							}
							className={`sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
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
							value={formValues?.virtual}
							onChange={(e) =>
								setFormValues({
									...formValues,
									virtual: parseInt(e.target.value),
								})
							}
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

				<div className={`col-span-6 ${formValues?.virtual !== 1 ? 'hidden' : ''}`}>
					<label className="form-control w-full max-w-xs ">
						<div className="block text-sm font-medium text-secondary-700">
							<span className="label-text">Virtual Url</span>
						</div>
						<input
							name="url"
							placeholder="url"
							value={formValues?.url}
							onChange={(e) =>
								setFormValues({
									...formValues,
									url: e.target.value,
								})
							}
							className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
						/>
					</label>
				</div>
				<div className="col-span-6">
					<label className="form-control w-full max-w-xs ">
						<div className="block text-sm font-medium text-secondary-700">
							<span className="label-text">Case No. & Parties</span>
						</div>
						<textarea
							placeholder="Case No. & Parties"
							value={formValues?.case}
							onChange={(e) =>
								setFormValues({
									...formValues,
									case: e.target.value,
								})
							}
							className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-20  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
						/>
					</label>
				</div>
				<div className="col-span-6">
					<label
						htmlFor="advocates"
						className="block text-sm font-medium text-secondary-700"
					>
						Advocate(s) handling
					</label>

					<Combobox as="div" value={selectedPeople} onChange={setSelectedPeople} multiple>
						<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
							<Combobox.Input
								onClick={() => setIsShowing(true)}
								className="z-[2]  sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
								displayValue={(selectedPeople) =>
									selectedPeople?.map((person) => person.name).join(', ')
								}
								onChange={(event) => setQuery(event.target.value)}
							/>
							<Combobox.Button
								onClick={() => setIsShowing((isShowing) => !isShowing)}
								className="absolute inset-y-0 right-0 flex items-center pr-2"
							>
								<Icon
									icon="heroicons:chevron-up-down"
									className="h-5 w-5 text-secondary-700"
								/>
							</Combobox.Button>
						</div>
						<Transition
							show={isShowing}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => setQuery('')}
						>
							<Combobox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{filteredPeople?.map((item) => (
									<Combobox.Option
										key={item?.id}
										value={item}
										onClick={() => setIsShowing(false)}
										className={({ active, selected }) =>
											classNames(
												'cursor-default select-none py-2 pl-3 pr-9 flex justify-between',
												active
													? 'bg-primary-600 text-white'
													: 'text-secondary-900'
											)
										}
									>
										{({ active, selected }) => (
											<>
												<div className="flex">
													<span
														className={classNames(
															'truncate',
															selected &&
																'font-semibold text-primary-400'
														)}
													>
														{item?.name}
													</span>
												</div>

												{selected && (
													<span
														className={classNames(
															'inset-y-0 right-0 flex items-center pr-4',
															active
																? 'text-white'
																: 'text-secondary-600'
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
						</Transition>
					</Combobox>
				</div>
			</div>
			<div className="w-1/12 flex items-center justify-center">
				<button
					className="bg-primary-50 border border-primary-600 text-primary-600 p-1 hover:text-primary-50 hover:bg-primary-600 rounded-md"
					type="button"
				>
					<span className="sr-only">Delete</span>
					<Icon icon="heroicons:trash" />
				</button>
			</div>
		</div>
	);
};

export default CauseListItemForm;
