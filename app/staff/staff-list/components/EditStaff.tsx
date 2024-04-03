import StaffForm from '@/components/forms/staff/StaffForm';
import { Staff } from '@/components/types/Staff';
import { Icon } from '@iconify/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type EditStaffFormProps = {
	setToggle: (toggle: boolean) => void;

	staffDetails: any;
};

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/staff/${slug}`);
	return response.data;
};

export default function EditStaff({ setToggle, staffDetails }: EditStaffFormProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [base64Cover, setBase64Cover] = useState<string>('');

	let toastID: string;

	// console.log('Staff Details:', staffDetails.id);

	const { data: staff } = useQuery<Staff>({
		queryKey: ['aStaff'],
		queryFn: () => fetchDetails(staffDetails.id),
	});

	const [title, setTitle] = useState<string>(`Edit Staff: ${staffDetails?.name}`);

	const queryClient = useQueryClient();

	const [formValues, setFormValues] = useState<any>({
		id: '',
		avatarUrl: '',
		name: '',
		designationId: '',
		teamId: '',
		email: '',
		mobile: '',
		staffNo: '',
		ext: '',
		genderId: '',
	});

	useEffect(() => {
		if (staff) {
			setFormValues({
				id: staff?.id,
				avatarUrl: staff?.avatarUrl,
				name: staff?.name,
				designationId: staff?.designationId,
				teamId: staff?.team?.id,
				email: staff?.email,
				mobile: staff?.mobile,
				staffNo: staff?.staffNo,
				ext: staff?.ext,
				genderId: staff?.genderId,
			});
		}
	}, [staff]);
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
				id: formValues.id,
				name: formValues.name,
				designationId: parseInt(formValues.designationId),
				teamId: parseInt(formValues.teamId),
				email: formValues.email,
				mobile: formValues.mobile,
				staffNo: parseInt(formValues.staffNo),
				ext: parseInt(formValues.ext),
				genderId: parseInt(formValues.genderId),
				avatarUrl: base64Cover || selectedFile || formValues.avatar_url,
			};
			console.log('Staff Data', staffData);
			await axios.patch(`/api/staff/editStaff`, staffData);
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
			toast.success('Staff has been Edited', {
				id: toastID,
			});
			setFormValues({
				...formValues,
				id: '',
				avatarUrl: '',
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
			queryClient.invalidateQueries(['staffList']);
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// toastID = toast.loading(`Editing ${staffDetails?.name}`, { id: toastID });
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

				<h1 className="mb-4 text-xl font-medium text-secondary-900">{title}</h1>
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
					<div className="flex w-full items-center justify-center space-x-2 py-8">
						{/* Submit Form Button  */}
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
