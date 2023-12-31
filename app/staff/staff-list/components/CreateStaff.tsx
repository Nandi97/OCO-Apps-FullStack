import StaffForm from '@/components/forms/StaffForm';
import { Icon } from '@iconify/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

type CreateStaffFormProps = {
	setToggle: (toggle: boolean) => void;
};

export default function CreateStaff({ setToggle }: CreateStaffFormProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [base64Cover, setBase64Cover] = useState<string>('');

	const [title, setTitle] = useState<string>('Create New Staff');

	const queryClient = useQueryClient();

	const [formValues, setFormValues] = useState<any>({
		name: '',
		typeId: '',
		designationId: '',
		teamId: '',
		email: '',
		mobile: '',
		staffNo: '',
		ext: '',
		genderId: '',
	});

	let toastID: string;

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

	// console.log('Form Values:', formValues);

	const { mutate } = useMutation({
		mutationFn: async () => {
			const staffData = {
				name: formValues.name,
				designationId: parseInt(formValues.designationId),
				teamId: parseInt(formValues.teamId),
				email: formValues.email,
				mobile: formValues.mobile,
				staffNo: parseInt(formValues.staffNo),
				ext: parseInt(formValues.ext),
				genderId: parseInt(formValues.genderId),
				avatarUrl: base64Cover,
			};
			// console.log('Staff Data', staffData);
			await axios.post('/api/staff/addStaff', staffData);
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
			toast.success('Staff Member has been Created', {
				id: toastID,
			});
			setFormValues({
				...formValues,
				name: '',
				designationId: '',
				teamId: '',
				email: '',
				mobile: '',
				staffNo: '',
				ext: '',
				genderId: '',
			});
			setSelectedFile(null);
			setToggle(false);
			queryClient.invalidateQueries({ queryKey: ['staffList'] });
		},
	});

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

				<h1 className="mb-4 text-xl font-medium text-ocoblue-900">Staff Form </h1>
				<form onSubmit={handleSubmit}>
					<div>
						<StaffForm
							onSelectChange={handleSelectChange}
							formValues={formValues}
							onChange={handleChange}
							setSelectedFile={setSelectedFile}
							setBase64Cover={setBase64Cover}
						/>
					</div>
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
