import Image from 'next/image';
import OCO_AB_David_Logo from '@/public/assets/images/oco_ab_and_david.png';

import { formatDate } from '@/utils/formatDate';

interface PurchaseOrderPreviewProps {
	formValues?: any;
}

export default function PurchaseOrderPreview({ formValues }: PurchaseOrderPreviewProps) {
	const date = new Date();
	const currentDate = date.toISOString();
	// const currentDate = format(new Date(), 'MMMM d, yyyy');

	console.log('FormValues: ', formValues);

	return (
		<div className="flex w-full flex-col rounded border p-2 shadow-sm">
			<div className="flex w-full items-center">
				<Image
					src={OCO_AB_David_Logo}
					alt="OCO AB David Logo"
					width={356}
					height={205}
					className="h-20 w-full object-contain"
				/>
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
									<th scope="col" colSpan={3} className=" w-full p-1 text-center">
										PURCHASE ORDER
									</th>
								</tr>
							</thead>
							<tbody className="z-0 divide-y divide-secondary-200 border bg-white">
								<tr className="border-b bg-white">
									<th
										scope="row"
										className="whitespace-nowrap border-r p-2 font-medium text-secondary-900 "
									>
										Date
									</th>
									<td colSpan={2} className="p-2">
										{formatDate(currentDate, 'MMMM d, yyyy')}
									</td>
								</tr>
								<tr className="border-b bg-white">
									<th
										scope="row"
										className="whitespace-nowrap border-r p-2 font-medium text-secondary-900 "
									>
										PO #
									</th>
									<td colSpan={2} className="p-2">
										{formValues?.poNumber}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				{/* SECTION B */}
				<div className="grid grid-cols-12 gap-2">
					<div className="col-span-5">
						<table className="w-full table-auto border text-left text-sm text-secondary-500">
							<thead className="border-b bg-secondary-50  text-xs uppercase text-primary-600">
								<tr>
									<th scope="col" colSpan={3} className="w-full p-1">
										Vendor
									</th>
								</tr>
							</thead>
							<tbody className="z-0 divide-secondary-200 bg-white">
								<tr className="bg-white ">
									<td colSpan={3} className="p-2 ">
										{formValues?.name}
									</td>
								</tr>
								<tr className="bg-white ">
									<td colSpan={3} className="p-2 ">
										{formValues?.physicalAddress}
									</td>
								</tr>
								<tr className="bg-white ">
									<th
										scope="row"
										className="whitespace-nowrap p-2 font-medium text-secondary-900 "
									>
										P.O. Box{' '}
										<span className="text-sm font-normal text-secondary-500">
											{formValues?.address}-{formValues?.postalCode}
											<br />
											{formValues?.town}
										</span>
									</th>
								</tr>
								<tr className="bg-white ">
									<td colSpan={3} className="p-2">
										{formValues?.town}
									</td>
								</tr>
								<tr className="bg-white ">
									<th
										scope="row"
										className="whitespace-nowrap px-2 font-medium text-secondary-900 "
									>
										Phone:{' '}
										<span className="px-1 text-sm font-normal text-secondary-500">
											{formValues?.phoneNumber}
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
											{formValues?.email}
										</span>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-span-2"></div>
					<div className="col-span-5">
						<table className="w-full table-auto border text-left text-sm text-secondary-500">
							<thead className="border-b bg-secondary-50  text-xs uppercase text-primary-600">
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
					<table className="w-full table-auto border text-left text-sm text-secondary-500">
						<thead className="border-b bg-secondary-50  text-xs uppercase text-primary-600">
							<tr className="divide-y">
								<th scope="col" colSpan={2} className="w-full border-r p-1">
									Description
								</th>
								<th scope="col" colSpan={3} className="w-full border-r p-1">
									Price
								</th>
								<th scope="col" colSpan={1} className="w-full border-r p-1">
									Qty
								</th>
								<th scope="col" colSpan={3} className="w-full p-1">
									Amount
								</th>
							</tr>
						</thead>
						<tbody className="z-0 divide-secondary-200 bg-white">
							{formValues.purchaseOrderItems?.map((item, index) => (
								<tr key={index} className="border-b bg-white">
									<td colSpan={2} className="border-r px-2">
										{item?.description}
									</td>
									<td colSpan={3} className="border-r px-2 ">
										{item?.cost}
									</td>
									<td colSpan={1} className="border-r px-2 ">
										{item?.quantity}
									</td>
									<td colSpan={3} className="px-2 ">
										{item?.quantity * item?.cost}
									</td>
								</tr>
							))}
							{formValues?.vatable === true ? (
								<>
									<tr className="border-b">
										<td
											colSpan={6}
											className="border-r px-2 text-right font-medium  uppercase text-secondary-600"
										>
											SubTotal
										</td>

										<td colSpan={3} className="px-2 ">
											{purchaseOrderItems?.reduce(
												(total, item) => total + item.cost * item.quantity,
												0
											)}
										</td>
									</tr>
									<tr className="border-b">
										<td
											colSpan={6}
											className="font-base border-r px-2 text-right  uppercase text-secondary-600"
										>
											VAT @ 16%
										</td>

										<td colSpan={3} className="px-2 ">
											{purchaseOrderItems?.reduce(
												(total, item) => total + item.cost * item.quantity,
												0
											) * 0.16}
										</td>
									</tr>
									<tr>
										<td
											colSpan={6}
											className="border-r px-2 text-right font-medium  uppercase text-primary-600"
										>
											Total
										</td>

										<td colSpan={3} className="px-2 ">
											{purchaseOrderItems?.reduce(
												(total, item) => total + item.cost * item.quantity,
												0
											) * 1.16}
										</td>
									</tr>
								</>
							) : (
								<tr>
									<td
										colSpan={6}
										className="border-r px-2 text-right font-medium  uppercase text-primary-600"
									>
										Total
									</td>

									<td colSpan={3} className="px-2 ">
										{purchaseOrderItems?.reduce(
											(total, item) => total + item.cost * item.quantity,
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
						<table className="w-full table-auto border text-left text-sm text-secondary-500">
							<thead className="bg-secondary-50 text-xs  uppercase text-primary-600">
								<tr>
									<th scope="col" colSpan={2} className=" w-full p-1 text-center">
										Requested By:
									</th>
								</tr>
							</thead>
							<tbody className="z-0 divide-y divide-secondary-200 border bg-white">
								<tr className="border-b bg-white">
									<td colSpan={2} className="p-2">
										{formatDate(currentDate, 'MMMM d, yyyy')}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-span-3">
						<table className="w-full table-auto border text-left text-sm text-secondary-500">
							<thead className="bg-secondary-50 text-xs  uppercase text-primary-600">
								<tr>
									<th scope="col" colSpan={2} className=" w-full p-1 text-center">
										Authorized By:
									</th>
								</tr>
							</thead>
							<tbody className="z-0 divide-y divide-secondary-200 border bg-white">
								<tr className="border-b bg-white">
									<td colSpan={2} className="p-2">
										{selectedAuthorizer?.name}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-span-6"></div>
				</div>
			</div>
		</div>
	);
}
