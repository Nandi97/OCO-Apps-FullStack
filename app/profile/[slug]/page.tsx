'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { URL } from '@/components/types/URL';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import avatar from '@/public/assets/images/avatar_placeholder.png';
import oco_abd from '@/public/assets/images/oco_ab_and_david.png';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/staff/${slug}`);
	return response.data;
};
const fetchWeather = async () => {
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?lat=-1.292235&lon=36.811433&appid=8e252877ebeaeb8cff357e193db6e133`
	);
	return response.data;
};

export default function Profile(url: URL) {
	const { data: user } = useQuery({
		queryKey: ['userDetails'],
		queryFn: () => fetchDetails(url.params.slug),
	});
	const { data: weather } = useQuery({
		queryKey: ['weather'],
		queryFn: fetchWeather,
	});
	// console.log('Authenticated', user);
	// console.log('Weather', weather);
	return (
		<div>
			<div className="sticky z-20 flex items-center justify-between p-4 bg-transparent top-2">
				<Link
					href={`/`}
					className="text-lg bg-ocobrown-600 rounded-md flex items-center text-ocobrown-50 p-1 hover:shadow-md shadow hover:bg-ocobrown-500/70"
				>
					<Icon icon="heroicons:chevron-left" />
					<span>Dashboard</span>
				</Link>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-4 p-4">
					<div className="bg-ocobrown-200 rounded-md flex flex-col w-full space-y-4">
						<div className="relative w-full flex flex-col ">
							<div className="w-full flex justify-center bg-ocobrown-50 p-2 rounded-t-md">
								<Image
									width={100}
									height={100}
									quality={100}
									className="rounded-xl"
									alt="user profile image "
									src={oco_abd}
								/>
							</div>
							<Image
								width={100}
								height={100}
								quality={100}
								className="h-20 w-20 rounded-xl border-4 border-ocobrown-400 z-10 -mt-5 ml-4"
								alt="user profile image "
								src={user?.avatarUrl || avatar}
							/>
						</div>
						<div className="p-4">
							<h1 className="font-bold text-xl text-ocoblue-700">{user?.name}</h1>

							<div className="flex items-center space-x-2">
								<Icon icon="heroicons:identification" />
								<span className="text-ocoblue-700">: {user?.staffNo}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Icon icon="heroicons:briefcase" />
								<span className="text-ocoblue-700">
									: {user?.designation?.name}
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<Icon icon="heroicons:at-symbol" />
								<Link
									href={`mailto:${user?.email}`}
									className="text-ocobrown-600 hover:text-ocobrown-600/70"
								>
									: {user?.email}
								</Link>
							</div>
							<div className="flex items-center space-x-2">
								<Icon icon="heroicons:phone" />
								<span className="text-ocoblue-700">: {user?.ext}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Icon icon="heroicons:device-phone-mobile" />
								<Link
									href={`tel:${user?.mobile}`}
									className="text-ocobrown-600 hover:text-ocobrown-600/70"
								>
									: {user?.mobile}
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-8 p-4">
					<div className="bg-ocobrown-200 rounded-md flex flex-col w-full space-y-4 p-4">
						<div className="flex items-center text-sm">
							<span>
								{weather?.name}, {weather?.sys?.country}
							</span>
							{weather?.weather?.map((currentWeather: any, i: any) => (
								<Image
									key={i}
									src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@2x.png`}
									className="h-7 object-contain"
									alt="weather icon"
									width={30}
									height={30}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
