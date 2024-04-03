import React, { useEffect } from 'react';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import { Staff } from '@/lib/types/master';

interface formData {
	formData?: {
		team: { name: string; id: number };
		date: string;
		cases: [
			{
				coram: string;
				virtual: number;
				url: string | null;
				case: string;
				advocates: Staff[];
			},
		];
	};
}
const CauseListPreview = ({ formData }: formData) => {
	let caseDate: Date;
	if (formData?.date) {
		caseDate = new Date(formData.date);
		if (isNaN(caseDate.getTime())) {
			console.error('Invalid date format:', formData.date);
			caseDate = new Date();
		}
	} else {
		console.warn('No date provided.');
		caseDate = new Date();
	}

	console.log('Date:', formData?.date);
	return (
		<div className="w-full flex-col space-y-3 rounded-md bg-white p-4 shadow-md">
			<div className="flex w-full items-center justify-center">
				<Image
					src={logo}
					placeholder="blur"
					width={300}
					height={200}
					alt="OCO ab David Logo"
					className="w-36 bg-transparent"
				/>
			</div>
			<div className="flex w-full items-center justify-center">
				<p className="font-base text-center text-xl uppercase text-primary-600 underline">
					MATTERS APPEARING IN THE CAUSE LIST FOR{' '}
					{formData?.date ? format(caseDate, 'EEEE do MMMM yyyy') : ''}
				</p>
			</div>
			<div className="flex w-full flex-col items-center justify-center space-y-4">
				{formData?.cases?.map((item, index) => (
					<table
						key={index}
						className="w-full table-auto border-2 border-double border-primary-600"
					>
						<thead className="border-2 border-double border-primary-600">
							<tr className="border-2 border-double border-primary-600">
								<th scope="col" colSpan={3} className="p-2 uppercase">
									{item?.coram}{' '}
									{item?.url && (
										<Link href={item.url} className="text-primary-600">
											(Virtual)
										</Link>
									)}
								</th>
							</tr>
							<tr className="border-2 border-double border-primary-600">
								<th
									scope="col"
									className="border-2 border-double border-primary-600 px-6 py-3"
								></th>
								<th
									scope="col"
									className="border-2 border-double border-primary-600 px-6 py-3"
								>
									CASE NUMBER & PARTIES
								</th>
								<th
									scope="col"
									className="border-2 border-double border-primary-600 px-6 py-3"
								>
									TEAM/ADVOCATE HANDLING
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th
									scope="row"
									className="whitespace-nowrap border-2 border-double border-primary-600 p-2 font-medium text-gray-900"
								>
									{index + 1}
								</th>
								<td className="border-2 border-double border-primary-600 p-2">
									{item?.case}
								</td>
								<td className="border-2 border-double border-primary-600 p-2">
									{' '}
									- {item?.advocates?.map((person) => person?.name).join(', ')}
								</td>
							</tr>
						</tbody>
					</table>
				))}
			</div>
		</div>
	);
};

export default CauseListPreview;
