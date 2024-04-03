'use client';
import { NewsFeed } from '@/lib/types/newsFeed';
import NewsFeedLogo from '@/public/assets/images/newsfeed/newsfeed.jpg';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import toast from 'react-hot-toast';

//Fetch A booking
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/newsfeed/get/${slug}`);
	return response.data;
};

export default function Show() {
	const params = useParams();
	const nfId = params?.['newsFeedId'];
	const { data: session } = useSession();
	let toastId: string;

	const { data, isPending } = useQuery<NewsFeed>({
		queryKey: ['detailNewsFeed'],
		queryFn: () => {
			if (nfId) {
				return fetchDetails(nfId as string);
			} else {
				return Promise.reject(new Error('News Feed Id not provided'));
			}
		},
	});

	const { mutate } = useMutation({
		mutationFn: async (data: any) => {
			const response = await axios.post('/api/newsfeed/mail', data);
			return response.data;
		},

		onError: (error: any) => {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data.message, {
					id: toastId,
				});
			}
		},
		onSuccess: (data: any) => {
			toast.success('Confirmation Email Sent', { id: toastId });
		},
	});

	function handleSendMail() {
		mutate(data);
		// console.log(data);
	}

	return (
		<div className="flex w-full justify-center">
			<div className="relative flex w-2/3 flex-col justify-center space-y-2 rounded-md bg-primary-50 p-1">
				<div className="w-full">
					<Image height={300} width={1200} src={NewsFeedLogo} alt="news feed logo" />
				</div>
				<div className="flex w-full flex-col space-y-2 px-8">
					{data?.articles?.map((article) => (
						<div
							key={article?.id}
							className="flex flex-col space-y-2 p-2 shadow-sm shadow-slate-300"
						>
							<h1 className="text-xl font-bold text-primary-600">{article?.title}</h1>
							<p className="text-justify text-base">{article?.content}</p>
							<Link href={article?.url} className="text-blue-500 underline">
								Read more...
							</Link>
							<span className="font-semibold">{article?.tags}</span>
						</div>
					))}
				</div>
				<div className="absolute right-5 top-2 divide-x-2 divide-primary-50">
					{session?.user?.email === data?.user?.email && (
						<button
							type="button"
							onClick={handleSendMail}
							className="rounded-l-md bg-primary-600 p-2"
						>
							<span className="sr-only">Send News Feed</span>
							<Icon
								icon="material-symbols:send-outline"
								className="text-2xl text-primary-50"
							/>
						</button>
					)}

					<button className="rounded-r-md bg-secondary-700 p-2">
						<span className="sr-only">Generate PDF</span>
						<Icon icon="carbon:generate-pdf" className="text-2xl text-primary-50" />
					</button>
				</div>
			</div>
		</div>
	);
}
