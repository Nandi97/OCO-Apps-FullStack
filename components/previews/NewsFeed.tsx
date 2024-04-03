import React from 'react';
import Image from 'next/image';
import NewsFeedLogo from '@/public/assets/images/newsfeed/newsfeed.jpg';
import Link from 'next/link';

interface Article {
	key: number;
	title: string;
	content: string;
	url: string;
	tags: string;
}
interface NewsFeedForm {
	date: string;
	articles: Article[];
}

interface NewsFeedPrev {
	prevData?: NewsFeedForm;
}

export default function NewsFeedPrev({ prevData }: NewsFeedPrev) {
	// console.log('Preview Data:', prevData);
	return (
		<div className="flex w-full flex-col space-y-4 rounded-md bg-primary-50 p-1">
			<div className="w-full">
				<Image height={300} width={1000} src={NewsFeedLogo} alt="news feed logo" />
			</div>
			<div className="flex w-full flex-col space-y-4 px-8">
				{prevData?.articles?.map((article) => (
					<div key={article?.key} className="flex flex-col space-y-2">
						<h1 className="font-bold text-primary-600">{article?.title}</h1>
						<p>{article?.content}</p>
						<Link href={article?.url} className="text-blue-500 underline">
							Read more...
						</Link>
						<span className="font-semibold">{article?.tags}</span>
					</div>
				))}
			</div>
		</div>
	);
}
