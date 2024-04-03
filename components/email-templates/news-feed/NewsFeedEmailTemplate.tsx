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
					<section className="mx-auto w-full bg-primary-50 px-6 py-8 dark:bg-gray-900">
						<main className="my-8 grid w-2/3 grid-cols-12 gap-4">
							<div className="col-span-12 w-full">
								<img
									alt="news feed logo"
									src="https://firebasestorage.googleapis.com/v0/b/oco-ngao.appspot.com/o/newsfeed.jpg?alt=media&token=c3161855-a841-4d23-a70d-cfeee5d89081"
									className="w-full"
								/>
							</div>
							<div className="col-span-12 grid w-full grid-cols-12 gap-4 space-y-2 px-8">
								{data?.articles?.map((article: any) => (
									<div
										key={article?.id}
										className="col-span-12 grid w-full grid-cols-12 space-y-2 p-2 shadow-sm shadow-slate-300"
									>
										<h1 className="col-span-12 text-xl font-bold text-primary-600">
											{article?.title}
										</h1>
										<p className="col-span-12 text-justify text-base">
											{article?.content}
										</p>
										<a
											href={article?.url}
											className="col-span-12 text-blue-500 underline"
										>
											Read more...
										</a>
										<span className="col-span-12 font-semibold">
											{article?.tags}
										</span>
									</div>
								))}
							</div>
							<div className="col-span-12 flex w-full items-center justify-center bg-secondary-700 py-4">
								<h1 className="text-4xl font-bold uppercase text-secondary-50">
									Digital Newspapers
								</h1>
							</div>
							<div className="col-span-12  grid w-full grid-cols-12 gap-4 space-y-1">
								<p className="col-span-12 w-full">
									To access digital newspapers, click on any of the links below
									and insert the username & password as follows:
								</p>
								<div className="col-span-12 flex w-full space-x-1">
									<span className="font-semibold">Username:</span>
									<span className="text-primary-600 underline">
										admin@oraro.co.ke
									</span>
									<span>|</span>
									<span className="font-semibold">Password:</span>
									<span className="text-primary-600">Gazeti@Oraro</span>
								</div>
								<ul className="col-span-12 w-full list-inside list-disc text-primary-600 underline">
									<li>Daily Nation </li>
									<li>Business Daily </li>
									<li>The Standard </li>
								</ul>

								<h2 className="col-span-12 w-full font-semibold underline">
									Note:
								</h2>

								<ul className="col-span-12 w-full list-inside list-disc">
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
