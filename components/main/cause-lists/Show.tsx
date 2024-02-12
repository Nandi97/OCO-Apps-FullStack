'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { CauseList } from '@/lib/types/master';
import { format } from 'date-fns';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import CauseListPDF from '@/components/pdf/CauseListPDF';

//Fetch A booking
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/cause-list/get/${slug}`);
	return response.data;
};

const Show = () => {
	const params = useParams();
	const clid = params?.['cause-list-id'];

	const { data, isPending } = useQuery<CauseList>({
		queryKey: ['detailCauseList'],
		queryFn: () => {
			if (clid) {
				return fetchDetails(clid as string);
			} else {
				return Promise.reject(new Error('CauseList Id not provided'));
			}
		},
	});

	console.log('Cause List data:', data);

	return (
		<div className="flex w-full items-center justify-center">
			<div className="w-3/4 p-4 flex-col rounded-md shadow-md space-y-4 bg-white">
				<div className="w-full flex items-center justify-between">
					<div className="h-full -mt-10">
						<Link href={'/court/cause-lists'} className="flex items-center space-x-1">
							<Icon icon="heroicons:chevron-left" />
							<span className="text-primary-600">Back</span>
						</Link>
					</div>
					<div className="">
						<Image
							src={logo}
							placeholder="blur"
							width={300}
							height={200}
							alt="OCO ab David Logo"
							className="w-36 bg-transparent"
						/>
					</div>
					<div className="">
						<div className="flex items-center text-xs">
							<button
								type="button"
								className="flex items-center space-x-1 border border-primary-300 hover:bg-primary-600 hover:text-primary-50 text-primary-600 p-1 rounded-l-md hover:border-primary-600 hover:shadow-md"
							>
								<Icon icon="heroicons:pencil" />
								<span className="uppercase">edit</span>
							</button>
							<button
								type="button"
								className="flex items-center space-x-1 border border-primary-300 hover:bg-primary-600 hover:text-primary-50 text-primary-600 p-1 hover:border-primary-600 hover:shadow-md"
							>
								<Icon icon="mdi:file-pdf-box" />
								<span className="uppercase">pdf</span>
							</button>
							<button
								type="button"
								className="flex items-center space-x-1 border border-primary-300 hover:bg-primary-600 hover:text-primary-50 text-primary-600 p-1 hover:border-primary-600 rounded-r-md hover:shadow-md"
							>
								<Icon icon="material-symbols:send" />
								<span className="uppercase">send</span>
							</button>
						</div>
					</div>
				</div>
				<div className="w-full flex items-center justify-center">
					<p className="font-base uppercase text-center text-xl text-primary-600 underline">
						MATTERS APPEARING IN THE CAUSE LIST FOR{' '}
						{data?.date ? format(data?.date, 'EEEE do MMMM yyyy') : ''}
					</p>
				</div>
				<div className="w-full flex flex-col space-y-4 items-center justify-center">
					{data?.cases?.map((item, index) => (
						<table
							key={index}
							className="table-auto w-full border-double border-2 border-primary-600"
						>
							<thead className="border-double border-2 border-primary-600">
								<tr className="border-double border-2 border-primary-600">
									<th scope="col" colSpan={3} className="p-2 uppercase">
										{item?.coram}{' '}
										{item?.url && (
											<Link href={item.url} className="text-primary-600">
												(Virtual)
											</Link>
										)}
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
										{data?.team?.name} -{' '}
										{item?.advocates?.map((person) => person?.name).join(', ')}
									</td>
								</tr>
							</tbody>
						</table>
					))}
				</div>
			</div>
		</div>
	);
};

export default Show;
