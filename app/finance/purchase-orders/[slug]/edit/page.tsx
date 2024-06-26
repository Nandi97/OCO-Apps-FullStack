'use client';

import PurchaseOrderForm from '@/components/forms/purchase-order/PurchaseOrderForm';
import { PurchaseOrder } from '@/components/types/PurchaseOrder';
import { URL } from '@/components/types/URL';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PurchaseOrderPreview from '@/components/previews/PurchaseOrder';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/purchase-order/${slug}`);
	return response.data;
};
export default function EditPurchaseOrder(url: URL) {
	const [selected, setSelected] = useState<any>([]);
	const [selectedTown, setSelectedTown] = useState<any>([]);
	const [purchaseItems, setPurchaseItems] = useState<any>([]);
	const pathname = usePathname();

	const { data: purchaseOrder } = useQuery<PurchaseOrder>({
		queryKey: ['detailPurchaseOrder'],
		queryFn: () => fetchDetails(url.params.slug),
	});

	const [formValues, setFormValues] = useState<any>({
		id: '',
		poNumber: '',
		type: '',
		vatable: '',
		currencyId: '',
		name: '',
		email: '',
		phoneNumber: '',
		physicalAddress: '',
		townId: '',
		address: '',
		postalCode: '',
		city: '',
		country: '',
		totalAmount: '',
		approverId: '',
	});
	let toastID: string;

	const router = useRouter();

	useEffect(() => {
		if (purchaseOrder) {
			setFormValues({
				poNumber: purchaseOrder?.poNumber,
				type: purchaseOrder?.type,
				vatable: purchaseOrder?.vatable,
				currencyId: purchaseOrder?.currencyId,
				name: purchaseOrder?.name,
				email: purchaseOrder?.email,
				phoneNumber: purchaseOrder?.phoneNumber,
				physicalAddress: purchaseOrder?.physicalAddress,
				address: purchaseOrder?.address,
				postalCode: purchaseOrder?.postalCode,
				city: purchaseOrder?.city,
				country: purchaseOrder?.country,
				totalAmount: purchaseOrder?.totalAmount,
			});
			setPurchaseItems(purchaseOrder.purchaseItems);
			setSelectedTown(purchaseOrder.town);
			setSelected(purchaseOrder.approver);
		}
	}, [purchaseOrder]);

	// console.log('Purchase Items', purchaseOrder?.purchaseItems);

	const { mutate } = useMutation({
		mutationFn: async () => {
			const purchaseOrderData = {
				poNumber: purchaseOrder?.poNumber,
				type: formValues.vendorType,
				vatable: formValues.vatable,
				currencyId: formValues.currencyId,
				name: formValues.name,
				email: formValues.email,
				phoneNumber: formValues.phoneNumber,
				physicalAddress: formValues.physicalAddress,
				townId: selectedTown?.id,
				address: parseInt(formValues.address),
				postalCode: parseInt(formValues.postalCode),
				city: formValues.city,
				country: formValues.country,
				totalAmount: formValues.vatable
					? purchaseItems?.reduce(
							({ total, item }: any) => total + item.cost * item.quantity,
							0
						) * 1.16
					: purchaseItems?.reduce(
							({ total, item }: any) => total + item.cost * item.quantity,
							0
						),
				approverId: selected?.id,
				purchaseItems: purchaseItems,
			};
			// console.log('Purchase Order Data', purchaseOrderData);
			// await axios.post('/api/purchase-order/addPurchaseOrder', purchaseOrderData);
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
			toast.success('Purchase Order Edited', {
				id: toastID,
			});
			setFormValues({
				...formValues,
				vendorType: '',
				vatable: false,
				currencyId: 0,
				name: '',
				email: '',
				phoneNumber: '',
				address: '',
			});
			setSelected('');
			setPurchaseItems([]);
			router.push('/finance/purchase-orders/');
		},
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const onBooleanSelectChange = (event: any) => {
		const selectedValue = event.target.value;

		const isVatable = selectedValue === 'true';

		setFormValues({
			...formValues,
			vatable: isVatable,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// console.log('Submitting Form');
		mutate();
	};

	return (
		<div className="space-y-2 bg-white">
			<div className="sticky top-2 z-20 flex items-center justify-between gap-2 bg-white">
				<h1 className="text-accent-700 text-lg font-extralight">
					<span className="font-medium">Edit Purchase Order :</span> #
					{purchaseOrder?.poNumber}
				</h1>
			</div>
			<div className="grid grid-cols-12 gap-2">
				<form
					onSubmit={handleSubmit}
					className="col-span-6 rounded-md shadow-md shadow-secondary-200"
				>
					<div>
						{/* <PurchaseOrderForm
							onBooleanSelectChange={onBooleanSelectChange as any}
							setSelectedAuthorizer={selected || setSelected}
							onSelectChange={handleSelectChange}
							formValues={formValues}
							onChange={handleChange}
							setPurchaseOrderItems={purchaseItems || setPurchaseItems}
							setSelectedTownValue={selectedTown || setSelectedTown}
						/> */}
					</div>
					<div className="flex w-full items-center justify-center space-x-2 py-8">
						{/* Submit Form Button  */}
						<button
							type="submit"
							className="flex items-center gap-2 rounded-md border border-primary-300 bg-primary-600 p-2 text-sm font-medium leading-4 text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
						>
							Submit Form
						</button>
						<Link
							href={'/finance/purchase-orders'}
							className="flex items-center gap-2 rounded-md border border-secondary-300 bg-secondary-600 p-2 text-sm font-medium leading-4 text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
						>
							Cancel
						</Link>
					</div>
				</form>
				<div className="col-span-12 md:col-span-6">
					{/* <PurchaseOrderPreview
						formValues={formValues}
						// purchaseOrderItems={purchaseItems}
						selectedAuthorizer={selected}
						selectedTown={selectedTown}
					/> */}
				</div>
			</div>
		</div>
	);
}
