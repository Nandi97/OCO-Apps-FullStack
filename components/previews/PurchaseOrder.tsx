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
		<div className="w-full flex flex-col border rounded shadow-sm p-2">
			<div className="w-full flex items-center">
				<Image
					src={OCO_AB_David_Logo}
					alt="OCO AB David Logo"
					width={356}
					height={205}
					className="h-20 object-contain w-full"
				/>
			</div>
			<div className="flex w-full flex-col space-y-2 text-xs">
				{/* Section A */}
				<div className="grid grid-cols-12 gap-2">
					<div className="col-span-5"></div>
					<div className="col-span-2"></div>
					<div className="col-span-5">
						<table className="table-auto w-full text-sm text-left text-secondary-500">
							<thead className="text-xs uppercase  bg-secondary-50 text-primary-600">
								<tr>
									<th scope="col" colSpan={3} className=" p-1 w-full text-center">
										PURCHASE ORDER
									</th>
								</tr>
							</thead>
							<tbody className="z-0 bg-white border divide-y divide-secondary-200">
								<tr className="bg-white border-b">
									<th
										scope="row"
										className="p-2 border-r font-medium text-secondary-900 whitespace-nowrap "
									>
										Date
									</th>
									<td colSpan={2} className="p-2">
										{formatDate(currentDate, 'MMMM d, yyyy')}
									</td>
								</tr>
								<tr className="bg-white border-b">
									<th
										scope="row"
										className="p-2 border-r font-medium text-secondary-900 whitespace-nowrap "
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
						<table className="table-auto w-full text-sm text-left text-secondary-500 border">
							<thead className="text-xs uppercase  bg-secondary-50 text-primary-600 border-b">
								<tr>
									<th scope="col" colSpan={3} className="p-1 w-full">
										Vendor
									</th>
								</tr>
							</thead>
							<tbody className="z-0 bg-white divide-secondary-200">
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
										className="p-2 font-medium text-secondary-900 whitespace-nowrap "
									>
										P.O. Box{' '}
										<span className="text-sm text-secondary-500 font-normal">
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
										className="px-2 font-medium text-secondary-900 whitespace-nowrap "
									>
										Phone:{' '}
										<span className="text-sm text-secondary-500 font-normal px-1">
											{formValues?.phoneNumber}
										</span>
									</th>
								</tr>
								<tr className="bg-white ">
									<th
										scope="row"
										className="px-2 font-medium text-secondary-900 whitespace-nowrap "
									>
										Email:
										<span className="text-sm text-primary-500 font-normal px-1">
											{formValues?.email}
										</span>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-span-2"></div>
					<div className="col-span-5">
						<table className="table-auto w-full text-sm text-left text-secondary-500 border">
							<thead className="text-xs uppercase  bg-secondary-50 text-primary-600 border-b">
								<tr>
									<th scope="col" colSpan={3} className="p-1 w-full">
										Ship To
									</th>
								</tr>
							</thead>
							<tbody className="z-0 bg-white divide-secondary-200">
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
										className="px-2 font-medium text-secondary-900 whitespace-nowrap "
									>
										P.O. Box{' '}
										<span className="text-sm text-secondary-500 font-normal">
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
										className="px-2 font-medium text-secondary-900 whitespace-nowrap "
									>
										Phone:{' '}
										<span className="text-sm text-secondary-500 font-normal px-1">
											+254 709 250 000
										</span>
									</th>
								</tr>
								<tr className="bg-white ">
									<th
										scope="row"
										className="px-2 font-medium text-secondary-900 whitespace-nowrap "
									>
										Email:
										<span className="text-sm text-primary-500 font-normal px-1">
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
					<table className="table-auto w-full text-sm text-left text-secondary-500 border">
						<thead className="text-xs uppercase  bg-secondary-50 text-primary-600 border-b">
							<tr className="divide-y">
								<th scope="col" colSpan={2} className="p-1 w-full border-r">
									Description
								</th>
								<th scope="col" colSpan={3} className="p-1 w-full border-r">
									Price
								</th>
								<th scope="col" colSpan={1} className="p-1 w-full border-r">
									Qty
								</th>
								<th scope="col" colSpan={3} className="p-1 w-full">
									Amount
								</th>
							</tr>
						</thead>
						<tbody className="z-0 bg-white divide-secondary-200">
							{formValues.purchaseOrderItems?.map((item, index) => (
								<tr key={index} className="bg-white border-b">
									<td colSpan={2} className="px-2 border-r">
										{item?.description}
									</td>
									<td colSpan={3} className="px-2 border-r ">
										{item?.cost}
									</td>
									<td colSpan={1} className="px-2 border-r ">
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
											className="px-2 border-r text-right font-medium  text-secondary-600 uppercase"
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
											className="px-2 border-r text-right font-base  text-secondary-600 uppercase"
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
											className="px-2 border-r text-right font-medium  text-primary-600 uppercase"
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
										className="px-2 border-r text-right font-medium  text-primary-600 uppercase"
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
						<table className="table-auto w-full text-sm text-left text-secondary-500 border">
							<thead className="text-xs uppercase  bg-secondary-50 text-primary-600">
								<tr>
									<th scope="col" colSpan={2} className=" p-1 w-full text-center">
										Requested By:
									</th>
								</tr>
							</thead>
							<tbody className="z-0 bg-white border divide-y divide-secondary-200">
								<tr className="bg-white border-b">
									<td colSpan={2} className="p-2">
										{formatDate(currentDate, 'MMMM d, yyyy')}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-span-3">
						<table className="table-auto w-full text-sm text-left text-secondary-500 border">
							<thead className="text-xs uppercase  bg-secondary-50 text-primary-600">
								<tr>
									<th scope="col" colSpan={2} className=" p-1 w-full text-center">
										Authorized By:
									</th>
								</tr>
							</thead>
							<tbody className="z-0 bg-white border divide-y divide-secondary-200">
								<tr className="bg-white border-b">
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
