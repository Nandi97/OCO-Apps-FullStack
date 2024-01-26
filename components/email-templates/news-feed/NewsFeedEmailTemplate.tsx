/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { Tailwind, Font, Head, Body, Container } from '@react-email/components';

interface NewsFeedEmailTempProps {
	data?: any;
}

export const NewsFeedEmail: React.FC<Readonly<NewsFeedEmailTempProps>> = ({ data }) => {
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							primary: {
								50: '#fbf7ef',
								100: '#f4e8d1',
								200: '#e8ce9f',
								300: '#dcb26d',
								400: '#d3994c',
								500: '#ca7d36',
								600: '#a65a2a',
								700: '#944729',
								800: '#7a3a26',
								900: '#653022',
								950: '#39180f',
							},
							secondary: {
								50: '#f5f7fa',
								100: '#e9eef5',
								200: '#cfdbe8',
								300: '#a5bdd4',
								400: '#7499bc',
								500: '#527ca5',
								600: '#3f638a',
								700: '#385678',
								800: '#2e455e',
								900: '#2b3c4f',
								950: '#1c2735',
							},
						},
					},
				},
			}}
		>
			<Head>
				<title>News Feed Email</title>
				<Font
					fontFamily="Roboto"
					fallbackFontFamily="Verdana"
					webFont={{
						url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
						format: 'woff2',
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			<Body style={main}>
				<Container style={container}>
					<section className="w-full px-6 py-8 mx-auto bg-primary-50 dark:bg-gray-900">
						<main className="my-8 w-2/3 grid gap-4 grid-cols-12">
							<div className="w-full col-span-12">
								<img
									alt="news feed logo"
									src="https://firebasestorage.googleapis.com/v0/b/oco-ngao.appspot.com/o/newsfeed.jpg?alt=media&token=c3161855-a841-4d23-a70d-cfeee5d89081"
									className="w-full"
								/>
							</div>
							<div className="w-full space-y-2 px-8 grid grid-cols-12 gap-4 col-span-12">
								{data?.articles?.map((article: any) => (
									<div
										key={article?.id}
										className="shadow-slate-300 p-2 w-full shadow-sm grid grid-cols-12 col-span-12 space-y-2"
									>
										<h1 className="text-primary-600 font-bold text-xl col-span-12">
											{article?.title}
										</h1>
										<p className="text-base col-span-12 text-justify">
											{article?.content}
										</p>
										<a
											href={article?.url}
											className="text-blue-500 col-span-12 underline"
										>
											Read more...
										</a>
										<span className="font-semibold col-span-12">
											{article?.tags}
										</span>
									</div>
								))}
							</div>
							<div className="bg-secondary-700 w-full col-span-12 py-4 flex justify-center items-center">
								<h1 className="uppercase font-bold text-4xl text-secondary-50">
									Digital Newspapers
								</h1>
							</div>
							<div className="w-full  col-span-12 grid grid-cols-12 gap-4 space-y-1">
								<p className="w-full col-span-12">
									To access digital newspapers, click on any of the links below
									and insert the username & password as follows:
								</p>
								<div className="flex space-x-1 col-span-12 w-full">
									<span className="font-semibold">Username:</span>
									<span className="underline text-primary-600">
										admin@oraro.co.ke
									</span>
									<span>|</span>
									<span className="font-semibold">Password:</span>
									<span className="text-primary-600">Gazeti@Oraro</span>
								</div>
								<ul className="underline text-primary-600 col-span-12 list-inside list-disc w-full">
									<li>Daily Nation </li>
									<li>Business Daily </li>
									<li>The Standard </li>
								</ul>

								<h2 className="underline font-semibold w-full col-span-12">
									Note:
								</h2>

								<ul className="list-inside list-disc w-full col-span-12">
									<li>
										At any time, only <strong>3 users</strong> can be logged in
										at the same time. As such, kindly ensure that you always log
										out before closing the webpage.
									</li>
									<li>
										<strong>DO NOT</strong> share these credentials with any one
										who is not an OCO staff.
									</li>
									<li>
										The Daily Nation, Business Daily and The Standard cannot be
										downloaded and thus can only be read online.
									</li>
								</ul>
							</div>
						</main>
					</section>
				</Container>{' '}
			</Body>
		</Tailwind>
	);
};
const main = {
	fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
	backgroundColor: '#ffffff',
};

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
	width: '660px',
	maxWidth: '100%',
};
