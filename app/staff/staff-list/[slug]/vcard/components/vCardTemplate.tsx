'use client';
import Image from 'next/image';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import { Icon } from '@iconify/react/dist/iconify.js';
import { URL } from '@/components/types/URL';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

type VCardTemplatePROPS = {
	download?: (f: any) => void;
};

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/staff/${slug}`);
	return response.data;
};

export default function VCardTemplate({ download }: VCardTemplatePROPS) {
	const router = usePathname();

	const [url]: any = router?.match(/\d+/g)?.map(Number);

	const { data: staff } = useQuery({
		queryKey: ['staffDetails'],
		queryFn: () => fetchDetails(url as string),
	});

	return (
		<div className="fixed top-0 left-0 z-[100] w-full h-full bg-white font-roboto">
			<div className="flex w-full flex-col items-center">
				<div className="bg-[#c9c2ba] w-full h-40 flex items-center justify-center">
					<Image src={logo} alt="OCO Logo" width={365} height={205} className="w-40" />
				</div>
				<div className="bg-transparent flex items-center space-x-4 -mt-14">
					<div className="overflow-hidden h-28 w-28 ring-4 bg-white ring-secondary-500/50 rounded-full">
						{!staff?.avatarUrl ? (
							<span className="inline-flex items-center justify-center rounded-full h-full w-full bg-secondary-50">
								<span className="font-semibold leading-none text-secondary-600 text-5xl">
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
				<div className="w-full md:max-w-lg my-4 px-4">
					<table className="table-auto w-full rounded-lg">
						<tbody>
							<tr className=" bg-secondary-700/20 border-b-4 border-white">
								<td className="w-1/6 text-xl text-primary-600 p-2">
									<Icon icon="heroicons:phone" />
								</td>
								<td className="flex flex-col w-5/6 text-sm">
									<span className="font-medium text-secondary-700">
										Direct Line
									</span>
									<span className="">+254 707 250 {staff?.ext} </span>
								</td>
							</tr>
							<tr className=" bg-secondary-700/20 border-b-4 border-white">
								<td className="w-1/6 text-xl text-primary-600 p-2">
									<Icon icon="heroicons:device-phone-mobile" />
								</td>
								<td className="flex flex-col w-5/6 text-sm">
									<span className="font-medium text-secondary-700">Mobile</span>
									<span className="">{staff?.mobile} </span>
								</td>
							</tr>
							<tr className=" bg-secondary-700/20 border-b-4 border-white">
								<td className="w-1/6 text-xl text-primary-600 p-2">
									<Icon icon="heroicons:envelope" />
								</td>
								<td className="flex flex-col w-5/6 text-sm">
									<span className="font-medium text-secondary-700">Email</span>
									<span className="">{staff?.email}</span>
								</td>
							</tr>
							<tr className=" bg-secondary-700/20 border-b-4 border-white">
								<td className="w-1/6 text-xl text-primary-600 p-2">
									<Icon icon="heroicons:globe-europe-africa" />
								</td>
								<td className="flex flex-col w-5/6 text-sm">
									<span className="font-medium text-secondary-700">Website</span>
									<span className="">www.oraro.co.ke</span>
								</td>
							</tr>
							<tr className=" bg-secondary-700/20 border-b-4 border-white">
								<td className="w-1/6 text-xl text-primary-600 p-2">
									<Icon icon="heroicons:map" />
								</td>
								<td className="flex flex-col w-5/6 text-sm">
									<span className="font-medium text-secondary-700">
										Physical Address
									</span>
									<span className="">
										ACK Garden Annex, 6th Floor, 1st Ngong Avenue
									</span>
								</td>
							</tr>
							<tr className=" bg-secondary-700/20 border-b-4 border-white">
								<td className="w-1/6 text-xl text-primary-600 p-2">
									<Icon icon="solar:mailbox-linear" />
								</td>
								<td className="flex flex-col w-5/6 text-sm">
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
			<div className="absolute top-5 right-2">
				<button
					type="button"
					className="p-1 rounded-md bg-secondary-700 text-white flex items-center"
					onClick={download}
				>
					<Icon icon="heroicons:plus" />
					Save Contact
				</button>
			</div>
		</div>
	);
}
