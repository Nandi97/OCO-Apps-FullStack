import React, { useEffect } from 'react';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';

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
				advocates: [];
			},
		];
	};
}
const CauseListPreview = ({ formData }: formData) => {
	const caseDate = formData?.date ? new Date(formData.date) : new Date();
	return (
		<div className="w-full p-4 flex-col rounded-md shadow-md space-y-3 bg-white">
			<div className="w-full flex items-center justify-center">
				<Image
					src={logo}
					placeholder="blur"
					width={300}
					height={200}
					alt="OCO ab David Logo"
					className="w-36 bg-transparent"
				/>
			</div>
			<div className="w-full flex items-center justify-center">
				<p className="font-base uppercase text-center text-xl text-primary-600 underline">
					MATTERS APPEARING IN THE CAUSE LIST FOR{' '}
					{formData?.date ? format(caseDate, 'EEEE do MMMM yyyy') : ''}
				</p>
			</div>
			<div className="w-full flex flex-col space-y-4 items-center justify-center">
				{formData?.cases?.map((item, index) => (
					<table
						key={index}
						className="table-auto w-full border-double border-2 border-primary-600"
					>
						<thead className="border-double border-2 border-primary-600">
							<tr className="border-double border-2 border-primary-600">
								<th scope="col" colSpan={3} className="p-2">
									{`${item?.coram} ${
										item?.url && (
											<Link href={item.url} className="text-primary-600">
												Virtual
											</Link>
										)
									}`}
								</th>
							</tr>
							<tr className="border-double border-2 border-primary-600">
								<th
									scope="col"
									className="px-6 py-3 border-double border-2 border-primary-600"
								></th>
								<th
									scope="col"
									className="px-6 py-3 border-double border-2 border-primary-600"
								>
									CASE NUMBER & PARTIES
								</th>
								<th
									scope="col"
									className="px-6 py-3 border-double border-2 border-primary-600"
								>
									TEAM/ADVOCATE HANDLING
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th
									scope="row"
									className="p-2 font-medium text-gray-900 whitespace-nowrap border-double border-2 border-primary-600"
								>
									{index + 1}
								</th>
								<td className="p-2 border-double border-2 border-primary-600">
									{item?.case}
								</td>
								<td className="p-2 border-double border-2 border-primary-600">
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
