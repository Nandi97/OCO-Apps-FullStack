'use client';

import { URL } from '@/components/types/URL';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { formatDate } from '@/utils/formatDate';
import OCO_AB_David_Logo from '@/public/assets/images/oco_ab_and_david.png';
import { PurchaseOrder } from '@/components/types/PurchaseOrder';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
import toast from 'react-hot-toast';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/purchase-order/approve/${slug}`);
	return response.data;
};

export default function POApproval(url: URL) {
	const pathname = usePathname();
	const { data: purchaseOrder } = useQuery<PurchaseOrder>({
		queryKey: ['approvePurchaseOrder'],
		queryFn: () => fetchDetails(url.params.slug),
	});

	let toastID: string;

	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: async () => {
			const purchaseOrderData = {
				id: purchaseOrder?.id,
				poNumber: purchaseOrder?.poNumber,
				creator: purchaseOrder?.creator,
			};

			console.log('Purchase Order Approval:', purchaseOrderData);
			await axios.patch(`/api/purchase-order/approvePurchaseOrder`, purchaseOrderData);
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
			toast.success('Purchase Order Has Been Approved', {
				id: toastID,
			});

			router.push('/finance/purchase-orders/');
		},
	});

	const handleClick = async (e: any) => {
		e.preventDefault();
		mutate();
	};
	return (
		<div className="space-y-2 bg-white">
			<div className="sticky top-2 z-20 flex items-center gap-2 bg-white">
				<h1 className="text-accent-700 text-lg font-extralight">
					<span className="font-medium">PO# :</span> {purchaseOrder?.poNumber}
				</h1>
			</div>
			<div className="flex w-full justify-center p-2">
				<div className="flex w-full max-w-3xl flex-col rounded border p-2 shadow-sm">
					<div className="flex w-full items-center justify-between">
						<Image
							src={OCO_AB_David_Logo}
							alt="OCO AB David Logo"
							width={356}
							height={205}
							className="h-20 w-full object-contain"
						/>
						<div className="flex items-center divide-x pr-2">
							{purchaseOrder?.approvedOn === null ? (
								<button
									type="button"
									onClick={handleClick}
									className="flex items-center space-x-2 rounded border border-secondary-300 p-0.5 text-sm font-medium text-primary-600 shadow-sm hover:border-primary-600 hover:bg-primary-600/90 hover:text-primary-50"
								>
									<Icon icon="heroicons:check" />
									<span>Approve</span>
								</button>
							) : (
								<div className="flex items-center space-x-2 rounded border border-secondary-300 bg-primary-600/90 p-0.5 text-sm font-medium text-primary-50 shadow-sm hover:border-primary-600 hover:text-primary-50">
									<Icon icon="heroicons:check-badge" />
									<span>Approved</span>
								</div>
							)}
						</div>
					</div>
					<div className="flex w-full flex-col space-y-2 text-xs">
						{/* Section A */}
						<div className="grid grid-cols-12 gap-2">
							<div className="col-span-5"></div>
							<div className="col-span-2"></div>
							<div className="col-span-5">
								<table className="w-full table-auto text-left text-sm text-secondary-500">
									<thead className="bg-secondary-50 text-xs  uppercase text-primary-600">
										<tr>
											<th
												scope="col"
												colSpan={3}
												className=" w-full p-1 text-center"
											>
												PURCHASE ORDER
											</th>
										</tr>
									</thead>
									<tbody className="z-0 divide-y divide-secondary-200 border border-secondary-300 bg-white">
										<tr className="border-b border-secondary-300 bg-white">
											<th
												scope="row"
												className="whitespace-nowrap border-r border-secondary-300 p-2 font-medium text-secondary-900 "
											>
												Date
											</th>
											<td colSpan={2} className="p-2">
												{purchaseOrder
													? formatDate(
															purchaseOrder?.createdAt,
															'MMMM d, yyyy'
														)
													: ''}
											</td>
										</tr>
										<tr className="border-b border-secondary-300 bg-white">
											<th
												scope="row"
												className="whitespace-nowrap border-r border-secondary-300 p-2 font-medium text-secondary-900 "
											>
												PO #
											</th>
											<td colSpan={2} className="p-2">
												{purchaseOrder?.poNumber}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						{/* SECTION B */}
						<div className="grid grid-cols-12 gap-2">
							<div className="col-span-5">
								<table className="w-full table-auto border border-secondary-300 text-left text-sm text-secondary-500">
									<thead className="border-b border-secondary-300  bg-secondary-50 text-xs uppercase text-primary-600">
										<tr>
											<th scope="col" colSpan={3} className="w-full p-1">
												Vendor
											</th>
										</tr>
									</thead>
									<tbody className="z-0 divide-secondary-200 bg-white">
										<tr className="bg-white ">
											<td colSpan={3} className="px-2 ">
												{purchaseOrder?.name}
											</td>
										</tr>
										<tr className="bg-white ">
											<td colSpan={3} className="px-2 ">
												{purchaseOrder?.physicalAddress}
											</td>
										</tr>
										<tr className="bg-white ">
											<th
												scope="row"
												className="whitespace-nowrap px-2 font-medium text-secondary-900 "
											>
												P.O. Box{' '}
												<span className="text-sm font-normal text-secondary-500">
													{purchaseOrder?.address}-
													{purchaseOrder?.postalCode}
												</span>
											</th>
										</tr>
										<tr className="bg-white ">
											<td colSpan={3} className="px-2  pb-2">
												{purchaseOrder?.town?.name}
											</td>
										</tr>
										<tr className="bg-white ">
											<th
												scope="row"
												className="whitespace-nowrap px-2 font-medium text-secondary-900 "
											>
												Phone:{' '}
												<span className="px-1 text-sm font-normal text-secondary-500">
													{purchaseOrder?.phoneNumber}
												</span>
											</th>
										</tr>
										<tr className="bg-white ">
											<th
												scope="row"
												className="whitespace-nowrap px-2 font-medium text-secondary-900 "
											>
												Email:
												<span className="px-1 text-sm font-normal text-primary-500">
													{purchaseOrder?.email}
												</span>
											</th>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="col-span-2"></div>
							<div className="col-span-5">
								<table className="w-full table-auto border border-secondary-300 text-left text-sm text-secondary-500">
									<thead className="border-b border-secondary-300  bg-secondary-50 text-xs uppercase text-primary-600">
										<tr>
											<th scope="col" colSpan={3} className="w-full p-1">
												Ship To
											</th>
										</tr>
									</thead>
									<tbody className="z-0 divide-secondary-200 bg-white">
										<tr className="bg-white ">
											<td colSpan={3} className="px-2 ">
												Oraro & Company Advocates
											</td>
										</tr>
										<tr className="bg-white ">
											<td colSpan={3} className="px-2 ">
												ACK Garden Annex, First Ngong Avenue
											</td>
										</tr>
										<tr className="bg-white ">
											<th
												scope="row"
												className="whitespace-nowrap px-2 font-medium text-secondary-900 "
											>
												P.O. Box{' '}
												<span className="text-sm font-normal text-secondary-500">
													51236-00200
												</span>
											</th>
										</tr>
										<tr className="bg-white ">
											<td colSpan={3} className="px-2  pb-2">
												Nairobi
											</td>
										</tr>
										<tr className="bg-white ">
											<th
												scope="row"
												className="whitespace-nowrap px-2 font-medium text-secondary-900 "
											>
												Phone:{' '}
												<span className="px-1 text-sm font-normal text-secondary-500">
													+254 709 250 000
												</span>
											</th>
										</tr>
										<tr className="bg-white ">
											<th
												scope="row"
												className="whitespace-nowrap px-2 font-medium text-secondary-900 "
											>
												Email:
												<span className="px-1 text-sm font-normal text-primary-500">
													legal@oraro.co.ke
												</span>
											</th>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						{/* SECTION C */}
						<div className="w-full">
							<table className="w-full table-auto border border-secondary-300 text-left text-sm text-secondary-500">
								<thead className="border-b border-t  border-secondary-300 bg-secondary-50 text-xs uppercase text-primary-600">
									<tr className="divide-y">
										<th
											scope="col"
											className="whitespace-normal border-r border-secondary-300 p-1 text-left"
										>
											Description
										</th>
										<th
											scope="col"
											className="border-r border-secondary-300 p-1 text-right"
										>
											Price
										</th>
										<th
											scope="col"
											className="w-12 border-r border-secondary-300 p-1 text-center"
										>
											Qty
										</th>
										<th
											scope="col"
											className="border border-secondary-300 p-1 text-right"
										>
											Amount
										</th>
									</tr>
								</thead>
								<tbody className="z-0 divide-secondary-200 bg-white">
									{purchaseOrder?.purchaseItems?.map((item, index) => (
										<tr
											key={index}
											className="border-b border-secondary-300 bg-white text-left"
										>
											<td className="border-r border-secondary-300 px-2">
												{item?.description}
											</td>
											<td className="border-r border-secondary-300 px-2 text-right">
												{item?.cost}
											</td>
											<td className="border-r border-secondary-300 px-2 text-center">
												{item?.quantity}
											</td>
											<td className="px-2 text-right">
												{item?.quantity * item?.cost}
											</td>
										</tr>
									))}
									{purchaseOrder?.vatable === true ? (
										<>
											<tr className="border-b border-secondary-300">
												<td
													colSpan={3}
													className="border-r border-secondary-300 px-2 text-right font-medium  uppercase text-secondary-600"
												>
													SubTotal
												</td>

												<td className="px-2 text-right">
													{purchaseOrder?.purchaseItems?.reduce(
														(total, item) =>
															total + item.cost * item.quantity,
														0
													)}
												</td>
											</tr>
											<tr className="border-b border-secondary-300">
												<td
													colSpan={3}
													className="font-base border-r border-secondary-300 px-2 text-right  uppercase text-secondary-600"
												>
													VAT @ 16%
												</td>

												<td className="px-2  text-right">
													{purchaseOrder?.purchaseItems?.reduce(
														(total, item) =>
															total + item.cost * item.quantity,
														0
													) * 0.16}
												</td>
											</tr>
											<tr>
												<td
													colSpan={3}
													className="border-r border-secondary-300 px-2 text-right font-medium  uppercase text-primary-600"
												>
													Total
												</td>

												<td className="px-2 text-right">
													{purchaseOrder?.purchaseItems?.reduce(
														(total, item) =>
															total + item.cost * item.quantity,
														0
													) * 1.16}
												</td>
											</tr>
										</>
									) : (
										<tr>
											<td
												colSpan={3}
												className="border-r border-secondary-300 px-2 text-right font-medium  uppercase text-primary-600"
											>
												Total
											</td>

											<td className="px-2 text-right">
												{purchaseOrder?.purchaseItems?.reduce(
													(total, item) =>
														total + item.cost * item.quantity,
													0
												)}
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<div className="grid grid-cols-12 gap-6">
							<div className="col-span-3">
								<table className="w-full table-auto border border-secondary-300 text-left text-sm text-secondary-500">
									<thead className="bg-secondary-50 text-xs  uppercase text-primary-600">
										<tr>
											<th
												scope="col"
												colSpan={2}
												className=" w-full p-1 text-center"
											>
												Requested By:
											</th>
										</tr>
									</thead>
									<tbody className="z-0 divide-y divide-secondary-200 border border-secondary-300 bg-white">
										<tr className="border-b border-secondary-300 bg-white">
											<td colSpan={2} className="flex flex-col p-2 text-sm">
												<span>{purchaseOrder?.creator?.name}</span>
												<span>
													<span className="font-semibold">ON:</span>{' '}
													{purchaseOrder
														? formatDate(
																purchaseOrder?.createdAt,
																'MMMM d, yyyy'
															)
														: ''}
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="col-span-3">
								<table className="w-full table-auto border border-secondary-300 text-left text-sm text-secondary-500">
									<thead className="bg-secondary-50 text-xs  uppercase text-primary-600">
										<tr>
											<th
												scope="col"
												colSpan={2}
												className=" w-full p-1 text-center"
											>
												Authorized By:
											</th>
										</tr>
									</thead>
									<tbody className="z-0 divide-y divide-secondary-200 border border-secondary-300 bg-white">
										<tr className="border-b border-secondary-300 bg-white">
											<td colSpan={2} className="flex flex-col p-2 text-sm">
												<span>{purchaseOrder?.approver?.name}</span>
												<span>
													<span className="font-semibold">ON:</span>{' '}
													{purchaseOrder?.approvedOn === null
														? 'Pending approval'
														: 'Approved'}
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="col-span-6"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
