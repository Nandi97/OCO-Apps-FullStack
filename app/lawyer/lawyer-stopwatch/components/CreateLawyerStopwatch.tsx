import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ManualLawyerStopwatchForm from '@/components/forms/lawyerStopwatch/ManualLawyerStopwatchForm';
import AutomaticLawyerStopwatchForm from '@/components/forms/lawyerStopwatch/AutoMaticLawyerStopwatchForm';
import { Icon } from '@iconify/react/dist/iconify.js';

type CreateLawyerStopwatchFormProps = {
	setToggle: (toggle: boolean) => void;
};

export default function CreateLawyerStopwatch({ setToggle }: CreateLawyerStopwatchFormProps) {
	const [title, setTitle] = useState<string>('Create New Stop Watch');
	const [selectedMatterId, setSelectedMatterId] = useState<any>('');
	const [toggleManualLawyerStopwatch, setToggleManualLawyerStopwatch] = useState(false);
	const [toggleAutomaticLawyerStopwatch, setToggleAutomaticLawyerStopwatch] = useState(true);

	const queryClient = useQueryClient();

	const [formValues, setFormValues] = useState<any>({
		matterId: '',
		taskId: '',
		narration: '',
		itemDate: '',
		startedAt: '',
		endedAt: '',
	});

	const handleMatterSelection = (matterId: any) => {
		setSelectedMatterId(matterId);
	};

	let toastID: string;

	// console.log('Form Values', formValues, selectedMatterId);

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const handleSTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const { mutate } = useMutation({
		mutationFn: async () => {
			const stopWatchData = {
				narration: formValues?.narration,
				matterId: selectedMatterId,
				taskId: parseInt(formValues?.taskId),
			};

			if (formValues.itemDate) {
				stopWatchData.itemDate = new Date(formValues.itemDate).toISOString();
			}

			if (formValues.startedAt) {
				// Assuming formValues.startedAt is in the format 'HH:mm'
				const [hours, minutes] = formValues.startedAt.split(':');
				const startedAtDate = new Date();
				startedAtDate.setHours(hours);
				startedAtDate.setMinutes(minutes);
				stopWatchData.startedAt = startedAtDate.toISOString();
			}

			if (formValues.endedAt) {
				// Assuming formValues.endedAt is in the format 'HH:mm'
				const [hours, minutes] = formValues.endedAt.split(':');
				const endedAtDate = new Date();
				endedAtDate.setHours(hours);
				endedAtDate.setMinutes(minutes);
				stopWatchData.endedAt = endedAtDate.toISOString();
			}
			// console.log('Book Data', [stopWatchData]);
			await axios.post('/api/lawyer-stopwatch/addStopwatchItems', [stopWatchData]);
		},

		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data.message, {
					id: toastID,
				});
				console.error('Form submission error:', error);
			}
		},
		onSuccess: (data) => {
			toast.success('Stop Watch has been Created', {
				id: toastID,
			});
			setFormValues({
				...formValues,
				matterId: '',
				taskId: '',
				narration: '',
				itemDate: '',
				startedAt: '',
				endedAt: '',
			});
			setToggle(false);
			queryClient.invalidateQueries({ queryKey: ['stopwatchItems'] });
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// toastID = toast.loading('Creating Your Staff Member', { id: toastID });
		mutate();
	};
	return (
		<div className="fixed left-0 top-0 z-40 h-full w-full bg-black/50">
			<div className="ove flex transform flex-col items-center rounded-lg bg-white md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:gap-6 md:p-12">
				<button
					onClick={(e) => {
						e.stopPropagation();
						setToggle(false);
					}}
					type="button"
					className="absolute right-2.5 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-secondary-400 hover:bg-secondary-200 hover:text-secondary-900"
				>
					<Icon icon="heroicons:x-mark" className="text-lg text-primary-600" />
				</button>
				<div className="flex w-full justify-between">
					<h1 className="mb-4 text-xl font-medium text-secondary-900">
						Lawyer Stop watch{' '}
					</h1>
					<div className="">
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								setToggleManualLawyerStopwatch(false);
								setToggleAutomaticLawyerStopwatch(true);
							}}
							className={`p-1 text-xs shadow-sm ${
								toggleAutomaticLawyerStopwatch
									? 'cursor-not-allowed bg-slate-300 text-slate-400'
									: 'bg-primary-500 text-white hover:bg-primary-500/50'
							}  rounded-l-md`}
						>
							Automatic
						</button>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								setToggleAutomaticLawyerStopwatch(false);
								setToggleManualLawyerStopwatch(true);
							}}
							className={`p-1 text-xs shadow-sm ${
								toggleManualLawyerStopwatch
									? 'cursor-not-allowed bg-slate-300 text-slate-400'
									: 'bg-primary-500 text-white hover:bg-primary-500/50'
							}  rounded-r-md`}
						>
							Manual
						</button>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					{toggleManualLawyerStopwatch && (
						<ManualLawyerStopwatchForm
							setToggle={setToggleManualLawyerStopwatch}
							onSelectComboChange={handleMatterSelection}
							onTextAreaChange={handleSTextAreaChange}
							onSelectChange={handleSelectChange}
							formValues={formValues}
							onChange={handleChange}
						/>
					)}

					{toggleAutomaticLawyerStopwatch && (
						<AutomaticLawyerStopwatchForm
							setToggle={setToggleAutomaticLawyerStopwatch}
							onSelectComboChange={handleMatterSelection}
							onTextAreaChange={handleSTextAreaChange}
							onSelectChange={handleSelectChange}
							formValues={formValues}
							onChange={handleChange}
						/>
					)}

					<div className="flex w-full items-center justify-center space-x-2 py-8">
						<button
							type="submit"
							className="flex items-center gap-2 rounded-md border border-primary-300 bg-primary-600 p-2 text-sm font-medium leading-4 text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
						>
							Submit Form
						</button>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								setToggle(false);
								setFormValues({
									...formValues,
									matterId: '',
									taskId: '',
									narration: '',
									createdAt: '',
									startedAt: '',
									endedAt: '',
								});
							}}
							className="flex items-center gap-2 rounded-md border border-secondary-300 bg-secondary-600 p-2 text-sm font-medium leading-4 text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
