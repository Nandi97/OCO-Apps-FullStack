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
			<div className="w-3/4 flex-col space-y-4 rounded-md bg-white p-4 shadow-md">
				<div className="flex w-full items-center justify-between">
					<div className="-mt-10 h-full">
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
								className="flex items-center space-x-1 rounded-l-md border border-primary-300 p-1 text-primary-600 hover:border-primary-600 hover:bg-primary-600 hover:text-primary-50 hover:shadow-md"
							>
								<Icon icon="heroicons:pencil" />
								<span className="uppercase">edit</span>
							</button>
							<button
								type="button"
								className="flex items-center space-x-1 border border-primary-300 p-1 text-primary-600 hover:border-primary-600 hover:bg-primary-600 hover:text-primary-50 hover:shadow-md"
							>
								<Icon icon="mdi:file-pdf-box" />
								<span className="uppercase">pdf</span>
							</button>
							<button
								type="button"
								className="flex items-center space-x-1 rounded-r-md border border-primary-300 p-1 text-primary-600 hover:border-primary-600 hover:bg-primary-600 hover:text-primary-50 hover:shadow-md"
							>
								<Icon icon="material-symbols:send" />
								<span className="uppercase">send</span>
							</button>
						</div>
					</div>
				</div>
				<div className="flex w-full items-center justify-center">
					<p className="font-base text-center text-xl uppercase text-primary-600 underline">
						MATTERS APPEARING IN THE CAUSE LIST FOR{' '}
						{data?.date ? format(data?.date, 'EEEE do MMMM yyyy') : ''}
					</p>
				</div>
				<div className="flex w-full flex-col items-center justify-center space-y-4">
					{data?.cases?.map((item, index) => (
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
