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

	const { mutate } = useMutation(
		async () => {
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
		{
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
				queryClient.invalidateQueries(['stopwatchItems']);
			},
		}
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// toastID = toast.loading('Creating Your Staff Member', { id: toastID });
		mutate();
	};
	return (
		<div className="fixed top-0 left-0 z-40 w-full h-full bg-black/50">
			<div className="flex flex-col items-center transform bg-white rounded-lg md:p-12 md:gap-6 ove md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:left-1/2">
				<button
					onClick={(e) => {
						e.stopPropagation();
						setToggle(false);
					}}
					type="button"
					className="absolute top-3 right-2.5 text-ocoblue-400 bg-transparent hover:bg-ocoblue-200 hover:text-ocoblue-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
				>
					<Icon icon="heroicons:x-mark" className="text-lg text-ocobrown-600" />
				</button>
				<div className="flex w-full justify-between">
					<h1 className="mb-4 text-xl font-medium text-ocoblue-900">
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
							className={`text-xs p-1 shadow-sm ${
								toggleAutomaticLawyerStopwatch
									? 'bg-slate-300 cursor-not-allowed text-slate-400'
									: 'bg-ocobrown-500 hover:bg-ocobrown-500/50 text-white'
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
							className={`text-xs p-1 shadow-sm ${
								toggleManualLawyerStopwatch
									? 'bg-slate-300 cursor-not-allowed text-slate-400'
									: 'bg-ocobrown-500 hover:bg-ocobrown-500/50 text-white'
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

					<div className="flex items-center justify-center w-full py-8 space-x-2">
						<button
							type="submit"
							className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocobrown-600 hover:opacity-80 border-ocobrown-300 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
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
							className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
