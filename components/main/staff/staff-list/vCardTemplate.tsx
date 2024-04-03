'use client';
import Image from 'next/image';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import { Icon } from '@iconify/react/dist/iconify.js';
import { URL } from '@/components/types/URL';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

type VCardTemplatePROPS = {
	download?: (f: any) => void;
};

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/staff/${slug}`);
	return response.data;
};

export default function VCardTemplate({ download }: VCardTemplatePROPS) {
	const params = useParams();

	const url = params?.slug;

	const { data: staff } = useQuery({
		queryKey: ['staffDetails'],
		queryFn: () => fetchDetails(url as string),
	});

	return (
		<div className="fixed left-0 top-0 z-[100] h-full w-full bg-white font-roboto">
			<div className="flex w-full flex-col items-center">
				<div className="flex h-40 w-full items-center justify-center bg-[#c9c2ba]">
					<Image src={logo} alt="OCO Logo" width={365} height={205} className="w-40" />
				</div>
				<div className="-mt-14 flex items-center space-x-4 bg-transparent">
					<div className="h-28 w-28 overflow-hidden rounded-full bg-white ring-4 ring-secondary-500/50">
						{!staff?.avatarUrl ? (
							<span className="inline-flex h-full w-full items-center justify-center rounded-full bg-secondary-50">
								<span className="text-5xl font-semibold leading-none text-secondary-600">
									{staff?.name
										.split(' ')
										.slice(0, 2)
										.map((n) => n[0])
										.join('')}
								</span>
							</span>
						) : (
							<Image
								src={staff?.avatarUrl}
								alt="User Avatar"
								className="h-28 w-28"
								width={100}
								height={100}
							/>
						)}
					</div>
					<div className="flex flex-col text-secondary-700">
						<h1 className="text-2xl font-medium text-secondary-50">{staff?.name}</h1>
						<h2 className="text-xl font-normal">{staff?.designation?.name}</h2>
					</div>
				</div>
				<div className="my-4 w-full px-4 md:max-w-lg">
					<table className="w-full table-auto rounded-lg">
						<tbody>
							<tr className=" border-b-4 border-white bg-secondary-700/20">
								<td className="w-1/6 p-2 text-xl text-primary-600">
									<Icon icon="heroicons:phone" />
								</td>
								<td className="flex w-5/6 flex-col text-sm">
									<span className="font-medium text-secondary-700">
										Direct Line
									</span>
									<span className="">+254 707 250 {staff?.ext} </span>
								</td>
							</tr>
							<tr className=" border-b-4 border-white bg-secondary-700/20">
								<td className="w-1/6 p-2 text-xl text-primary-600">
									<Icon icon="heroicons:device-phone-mobile" />
								</td>
								<td className="flex w-5/6 flex-col text-sm">
									<span className="font-medium text-secondary-700">Mobile</span>
									<span className="">{staff?.mobile} </span>
								</td>
							</tr>
							<tr className=" border-b-4 border-white bg-secondary-700/20">
								<td className="w-1/6 p-2 text-xl text-primary-600">
									<Icon icon="heroicons:envelope" />
								</td>
								<td className="flex w-5/6 flex-col text-sm">
									<span className="font-medium text-secondary-700">Email</span>
									<span className="">{staff?.email}</span>
								</td>
							</tr>
							<tr className=" border-b-4 border-white bg-secondary-700/20">
								<td className="w-1/6 p-2 text-xl text-primary-600">
									<Icon icon="heroicons:globe-europe-africa" />
								</td>
								<td className="flex w-5/6 flex-col text-sm">
									<span className="font-medium text-secondary-700">Website</span>
									<span className="">www.oraro.co.ke</span>
								</td>
							</tr>
							<tr className=" border-b-4 border-white bg-secondary-700/20">
								<td className="w-1/6 p-2 text-xl text-primary-600">
									<Icon icon="heroicons:map" />
								</td>
								<td className="flex w-5/6 flex-col text-sm">
									<span className="font-medium text-secondary-700">
										Physical Address
									</span>
									<span className="">
										ACK Garden Annex, 6th Floor, 1st Ngong Avenue
									</span>
								</td>
							</tr>
							<tr className=" border-b-4 border-white bg-secondary-700/20">
								<td className="w-1/6 p-2 text-xl text-primary-600">
									<Icon icon="solar:mailbox-linear" />
								</td>
								<td className="flex w-5/6 flex-col text-sm">
									<span className="font-medium text-secondary-700">
										Postal Address
									</span>
									<span className="">
										P.O. Box 51236 - 00200, Nairobi, Kenya.
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="absolute right-2 top-5">
				<button
					type="button"
					className="flex items-center rounded-md bg-secondary-700 p-1 text-white"
					onClick={download}
				>
					<Icon icon="heroicons:plus" />
					Save Contact
				</button>
			</div>
		</div>
	);
}
