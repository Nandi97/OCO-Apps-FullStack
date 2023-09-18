'use client';
import { PurchaseOrder } from '@/pages/types/PurchaseOrder';
import { URL } from '@/pages/types/URL';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import OCO_AB_David_Logo from '@/public/assets/images/oco_ab_and_david.png';
import { usePathname } from 'next/navigation';

import { formatDate } from '@/utils/formatDate';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/purchase-order/${slug}`);
	return response.data;
};

export default function PurchaseOrder(url: URL) {
	const pathname = usePathname();
	const { data: purchaseOrder } = useQuery<PurchaseOrder>({
		queryKey: ['detailPurchaseOrder'],
		queryFn: () => fetchDetails(url.params.slug),
	});

	// console.log('Purchase order:', purchaseOrder);
	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">
					<span className="font-medium">PO# :</span> {purchaseOrder?.poNumber}
				</h1>
			</div>
			<div className="w-full flex justify-center p-2">
				<div className="w-full flex flex-col border rounded shadow-sm p-2 max-w-3xl">
					<div className="w-full flex items-center justify-between">
						<Image
							src={OCO_AB_David_Logo}
							alt="OCO AB David Logo"
							width={356}
							height={205}
							className="h-20 object-contain w-full"
						/>
						{purchaseOrder?.approvedOn === null ? (
							<div className="flex items-center divide-x pr-2">
								<Link
									href={`${pathname}/edit`}
									className="flex text-sm items-center p-0.5 rounded-l text-ocobrown-600 space-x-2 font-medium border border-ocoblue-300 hover:bg-ocobrown-600/90 hover:text-ocobrown-50 hover:border-ocobrown-600 shadow-sm"
								>
									<Icon icon="heroicons:pencil-square" />
									<span>EDIT</span>
								</Link>
								<button
									type="button"
									className="flex text-sm items-center p-0.5 rounded-r text-ocobrown-600  space-x-2 font-medium border border-ocoblue-300 hover:bg-ocobrown-600/90 hover:text-ocobrown-50 hover:border-ocobrown-600 shadow-sm"
								>
									<Icon icon="heroicons:arrow-down-tray" />
									<span>PDF</span>
								</button>
							</div>
						) : (
							<div className="flex items-center divide-x pr-2">
								<button
									type="button"
									className="flex text-sm items-center p-0.5 rounded text-ocobrown-600  space-x-2 font-medium border border-ocoblue-300 hover:bg-ocobrown-600/90 hover:text-ocobrown-50 hover:border-ocobrown-600 shadow-sm"
								>
									<Icon icon="heroicons:arrow-down-tray" />
									<span>PDF</span>
								</button>
							</div>
						)}
					</div>
					<div className="flex w-full flex-col space-y-2 text-xs">
						{/* Section A */}
						<div className="grid grid-cols-12 gap-2">
							<div className="col-span-5"></div>
							<div className="col-span-2"></div>
							<div className="col-span-5">
								<table className="table-auto w-full text-sm text-left text-ocoblue-500">
									<thead className="text-xs uppercase  bg-ocoblue-50 text-ocobrown-600">
										<tr>
											<th
												scope="col"
												colSpan={3}
												className=" p-1 w-full text-center"
											>
												PURCHASE ORDER
											</th>
										</tr>
									</thead>
									<tbody className="z-0 bg-white border-ocoblue-300 border divide-y divide-ocoblue-200">
										<tr className="bg-white border-ocoblue-300 border-b">
											<th
												scope="row"
												className="p-2 border-ocoblue-300 border-r font-medium text-ocoblue-900 whitespace-nowrap "
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
										<tr className="bg-white border-ocoblue-300 border-b">
											<th
												scope="row"
												className="p-2 border-ocoblue-300 border-r font-medium text-ocoblue-900 whitespace-nowrap "
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
								<table className="table-auto w-full text-sm text-left text-ocoblue-500 border-ocoblue-300 border">
									<thead className="text-xs uppercase  bg-ocoblue-50 text-ocobrown-600 border-ocoblue-300 border-b">
										<tr>
											<th scope="col" colSpan={3} className="p-1 w-full">
												Vendor
											</th>
										</tr>
									</thead>
									<tbody className="z-0 bg-white divide-ocoblue-200">
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
												className="px-2 font-medium text-ocoblue-900 whitespace-nowrap "
											>
												P.O. Box{' '}
												<span className="text-sm text-ocoblue-500 font-normal">
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
												className="px-2 font-medium text-ocoblue-900 whitespace-nowrap "
											>
												Phone:{' '}
												<span className="text-sm text-ocoblue-500 font-normal px-1">
													{purchaseOrder?.phoneNumber}
												</span>
											</th>
										</tr>
										<tr className="bg-white ">
											<th
												scope="row"
												className="px-2 font-medium text-ocoblue-900 whitespace-nowrap "
											>
												Email:
												<span className="text-sm text-ocobrown-500 font-normal px-1">
													{purchaseOrder?.email}
												</span>
											</th>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="col-span-2"></div>
							<div className="col-span-5">
								<table className="w-full table-auto text-sm text-left text-ocoblue-500 border-ocoblue-300 border">
									<thead className="text-xs uppercase  bg-ocoblue-50 text-ocobrown-600 border-ocoblue-300 border-b">
										<tr>
											<th scope="col" colSpan={3} className="p-1 w-full">
												Ship To
											</th>
										</tr>
									</thead>
									<tbody className="z-0 bg-white divide-ocoblue-200">
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
												className="px-2 font-medium text-ocoblue-900 whitespace-nowrap "
											>
												P.O. Box{' '}
												<span className="text-sm text-ocoblue-500 font-normal">
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
												className="px-2 font-medium text-ocoblue-900 whitespace-nowrap "
											>
												Phone:{' '}
												<span className="text-sm text-ocoblue-500 font-normal px-1">
													+254 709 250 000
												</span>
											</th>
										</tr>
										<tr className="bg-white ">
											<th
												scope="row"
												className="px-2 font-medium text-ocoblue-900 whitespace-nowrap "
											>
												Email:
												<span className="text-sm text-ocobrown-500 font-normal px-1">
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
							<table className="w-full table-auto text-sm text-left text-ocoblue-500 border-ocoblue-300 border">
								<thead className="text-xs uppercase  bg-ocoblue-50 text-ocobrown-600 border-ocoblue-300 border-b border-t">
									<tr className="divide-y">
										<th
											scope="col"
											className="p-1 whitespace-normal border-ocoblue-300 border-r text-left"
										>
											Description
										</th>
										<th
											scope="col"
											className="p-1 border-ocoblue-300 border-r text-right"
										>
											Price
										</th>
										<th
											scope="col"
											className="p-1 w-12 border-ocoblue-300 border-r text-center"
										>
											Qty
										</th>
										<th
											scope="col"
											className="p-1 border-ocoblue-300 border text-right"
										>
											Amount
										</th>
									</tr>
								</thead>
								<tbody className="z-0 bg-white divide-ocoblue-200">
									{purchaseOrder?.purchaseItems?.map((item, index) => (
										<tr
											key={index}
											className="bg-white border-ocoblue-300 border-b text-left"
										>
											<td className="px-2 border-ocoblue-300 border-r">
												{item?.description}
											</td>
											<td className="px-2 border-ocoblue-300 border-r text-right">
												{item?.cost}
											</td>
											<td className="px-2 border-ocoblue-300 border-r text-center">
												{item?.quantity}
											</td>
											<td className="px-2 text-right">
												{item?.quantity * item?.cost}
											</td>
										</tr>
									))}
									{purchaseOrder?.vatable === true ? (
										<>
											<tr className="border-ocoblue-300 border-b">
												<td
													colSpan={3}
													className="px-2 border-ocoblue-300 border-r text-right font-medium  text-ocoblue-600 uppercase"
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
											<tr className="border-ocoblue-300 border-b">
												<td
													colSpan={3}
													className="px-2 border-ocoblue-300 border-r text-right font-base  text-ocoblue-600 uppercase"
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
													className="px-2 border-ocoblue-300 border-r text-right font-medium  text-ocobrown-600 uppercase"
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
												className="px-2 border-ocoblue-300 border-r text-right font-medium  text-ocobrown-600 uppercase"
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
								<table className="table-auto w-full text-sm text-left text-ocoblue-500 border-ocoblue-300 border">
									<thead className="text-xs uppercase  bg-ocoblue-50 text-ocobrown-600">
										<tr>
											<th
												scope="col"
												colSpan={2}
												className=" p-1 w-full text-center"
											>
												Requested By:
											</th>
										</tr>
									</thead>
									<tbody className="z-0 bg-white border-ocoblue-300 border divide-y divide-ocoblue-200">
										<tr className="bg-white border-ocoblue-300 border-b">
											<td colSpan={2} className="p-2 flex flex-col text-sm">
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
								<table className="table-auto w-full text-sm text-left text-ocoblue-500 border-ocoblue-300 border">
									<thead className="text-xs uppercase  bg-ocoblue-50 text-ocobrown-600">
										<tr>
											<th
												scope="col"
												colSpan={2}
												className=" p-1 w-full text-center"
											>
												Authorized By:
											</th>
										</tr>
									</thead>
									<tbody className="z-0 bg-white border-ocoblue-300 border divide-y divide-ocoblue-200">
										<tr className="bg-white border-ocoblue-300 border-b">
											<td colSpan={2} className="p-2 flex flex-col text-sm">
												<span>{purchaseOrder?.approver?.name}</span>
												<span className="text-ocobrown-600">
													{' '}
													{purchaseOrder?.approvedOn === null
														? 'Pending approval'
														: 'Approved'}
												</span>
												<span className="font-semibold">
													ON:
													{!purchaseOrder?.approvedOn
														? ''
														: formatDate(
																purchaseOrder.approvedOn as string,
																'MMMM d, yyyy'
														  )}
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
