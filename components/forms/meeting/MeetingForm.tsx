import { Fragment, useRef, useState, useEffect } from 'react';
import { Combobox, Disclosure, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MultiCombobox from '@/components/my-ui/MultiComboBox';

interface MeetingFormProps {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onBooleanSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	setAOBs: ([]: any) => void;
	setMeetingItems: ([]: any) => void;
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function MeetingForm({
	formValues,
	onChange,
	onSelectChange,
	setAOBs,
	onBooleanSelectChange,
	setMeetingItems,
}: MeetingFormProps) {
	const [openDisclosures, setOpenDisclosures] = useState([true, false, false]);

	const { data: attendees } = useQuery(['unpaginatedStaff'], () =>
		axios.get('/api/staff/getAllUnpaginatedStaff').then((response) => response.data)
	);

	const [selectedAttendees, setSelectedAttendees] = useState([
		attendees?.[0]?.id,
		attendees?.[1]?.id,
	]);

	const absenteesWithApologies = attendees?.filter(
		(attendee) => !selectedAttendees.includes(attendee.id)
	);

	const [selectedAbsenteesWA, setSelectedAbsenteesWA] = useState([
		absenteesWithApologies?.[0]?.id,
		absenteesWithApologies?.[1]?.id,
	]);

	const absentees = attendees?.filter(
		(attendee) =>
			!selectedAttendees.includes(attendee.id) && !selectedAbsenteesWA.includes(attendee.id)
	);

	const [selectedAbsentees, setSelectedAbsentees] = useState([
		absentees?.[0]?.id,
		absentees?.[1]?.id,
	]);

	// console.log('Selected Attendees:', selectedAttendees);
	// console.log('Selected Absentees:', selectedAbsentees);
	const handleContinue = (currentIndex) => {
		if (currentIndex < openDisclosures.length - 1) {
			const updatedOpenDisclosures = openDisclosures.map((open, i) => i === currentIndex + 1);
			setOpenDisclosures(updatedOpenDisclosures);
		}
	};

	const handleDisclosureToggle = (index) => {
		const updatedOpenDisclosures = openDisclosures.map((open, i) =>
			i === index ? !open : false
		);
		setOpenDisclosures(updatedOpenDisclosures);
	};
	return (
		<div>
			<Disclosure as="div" className="pt-6" defaultOpen={true}>
				{({ open }) => (
					<>
						<Disclosure.Button
							onClick={() => handleDisclosureToggle(0)}
							// ref={(el) => (AccordionRefs?.current[0] = el)}
							className="flex w-full items-center justify-between rounded-lg bg-ocobrown-100 px-4 py-2 text-left text-sm font-medium text-ocobrown-900 hover:bg-ocobrown-200 focus:outline-none focus-visible:ring focus-visible:ring-ocobrown-500 focus-visible:ring-opacity-75"
						>
							<div className="w-full flex items-center space-x-2">
								<div className="h-2 w-2 p-3 rounded-full bg-ocobrown-600 text-ocobrown-50 flex items-center justify-center">
									<span>1</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-ocoblue-600">
										Meeting Details
									</span>
								</div>
							</div>
							<Icon
								icon="heroicons:chevron-right"
								className={`${
									open ? 'rotate-90 transform' : ''
								} h-5 w-5 text-ocobrown-500`}
							/>
						</Disclosure.Button>

						<Disclosure.Panel as="dd" className="px-4 pt-4 pb-2 text-sm text-gray-500">
							<div className="grid md:grid-cols-12 grid-cols-6 gap-4 border border-ocoblue-200 rounded p-2">
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="title"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Meeting Title
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="title"
											id="title"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>

								<div className="col-span-6">
									<label
										htmlFor="date"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Date
									</label>
									<div className="mt-1">
										<input
											type="date"
											name="date"
											id="date"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="startedAt"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Started At
									</label>
									<div className="mt-1">
										<input
											type="time"
											name="startedAt"
											id="startedAt"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="endedAt"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Ended At
									</label>
									<div className="mt-1">
										<input
											type="time"
											name="endedAt"
											id="endedAt"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="venue"
										className="block text-sm font-medium text-ocoblue-700"
									>
										venue
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="venue"
											id="venue"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="venue"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Attendees
									</label>
									<MultiCombobox
										items={attendees}
										initialSelectedItems={sselectedAttendees.map((id) =>
											attendees.find((a) => a.id === id)
										)} // Different initial values for each instance
									/>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="AWA"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Absentee With Apologies
									</label>
									<MultiCombobox
										items={absenteesWithApologies}
										initialSelectedItems={selectedAbsenteesWA.map((id) =>
											absenteesWithApologies.find((a) => a.id === id)
										)} // Different initial values for each instance
									/>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="venue"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Absentee
									</label>
									<MultiCombobox
										items={absentees}
										initialSelectedItems={selectedAbsentees.map((id) =>
											absentees.find((a) => a.id === id)
										)} // Different initial values for each instance
									/>
								</div>
								<div className="col-span-6 md:col-span-12 w-full flex items-center justify-center">
									<button
										type="button"
										onClick={() => handleContinue(0)}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
									>
										Continue
									</button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<Disclosure as="div" className="pt-6">
				{({ open }) => (
					<>
						<Disclosure.Button
							onClick={() => handleDisclosureToggle(1)}
							// ref={(el) => (AccordionRefs.current[1] = el)}
							className="flex items-center w-full justify-between rounded-lg bg-ocobrown-100 px-4 py-2 text-left text-sm font-medium text-ocobrown-900 hover:bg-ocobrown-200 focus:outline-none focus-visible:ring focus-visible:ring-ocobrown-500 focus-visible:ring-opacity-75"
						>
							<div className="w-full flex items-center space-x-2">
								<div className="h-2 w-2 p-3 rounded-full bg-ocobrown-600 text-ocobrown-50 flex items-center justify-center">
									<span>1</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-ocoblue-600">
										Minutes
									</span>
									<span className="text-xs font-semibold text-ocoblue-600/70 flex items-center">
										Click the + icon to add a new item and the
										<Icon icon="heroicons:trash-solid" /> icon to delete an item
									</span>
								</div>
							</div>
							<Icon
								icon="heroicons:chevron-right"
								className={`${
									open ? 'rotate-90 transform' : ''
								} h-5 w-5 text-ocobrown-500`}
							/>
						</Disclosure.Button>

						<Disclosure.Panel as="dd" className="px-4 pt-4 pb-2 text-sm text-gray-500">
							<div className="border border-ocoblue-200 rounded p-4 space-y-2">
								{/* Panel Content Goes Here */}
								<div className=" w-full flex items-center justify-center">
									<button
										type="button"
										onClick={() => handleContinue(1)}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
									>
										Continue
									</button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<Disclosure as="div" className="pt-6">
				{({ open }) => (
					<>
						<Disclosure.Button
							onClick={() => handleDisclosureToggle(2)}
							// ref={(el) => (AccordionRefs.current[2] = el)}
							className="flex items-center w-full justify-between rounded-lg bg-ocobrown-100 px-4 py-2 text-left text-sm font-medium text-ocobrown-900 hover:bg-ocobrown-200 focus:outline-none focus-visible:ring focus-visible:ring-ocobrown-500 focus-visible:ring-opacity-75"
						>
							<div className="w-full flex items-center space-x-2">
								<div className="h-2 w-2 p-3 rounded-full bg-ocobrown-600 text-ocobrown-50 flex items-center justify-center">
									<span>3</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-ocoblue-600">
										AOB {`(Any Other Business)`}
									</span>
									<span className="text-xs font-semibold text-ocoblue-600/70 flex items-center">
										Click the + icon to add a AOB and the
										<Icon icon="heroicons:trash-solid" /> icon to delete a AOB
									</span>
								</div>
							</div>
							<Icon
								icon="heroicons:chevron-right"
								className={`${
									open ? 'rotate-90 transform' : ''
								} h-5 w-5 text-ocobrown-500`}
							/>
						</Disclosure.Button>

						<Disclosure.Panel as="dd" className="px-4 pt-4 pb-2 text-sm text-gray-500">
							<div className="border border-ocoblue-200 rounded p-4 space-y-2">
								{/* Panel Content Goes Here */}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
