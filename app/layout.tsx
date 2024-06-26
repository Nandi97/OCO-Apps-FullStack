import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Providers } from './auth/provider';
import QueryWrapper from './QueryWrapper';
import Nav from './auth/Nav';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			{/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head>
				<script
					type="text/javascript"
					src="../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"
					defer
				></script>
			</head>
			<body
				className={` ${roboto.variable} from-accent-100 to-accent-100 h-screen overflow-hidden bg-gradient-to-br via-primary-100 font-sans`}
			>
				<QueryWrapper>
					<Providers>
						{/* <Sidebar sidebarProp={<Nav />} /> */}
						<Nav pageTitle={metadata.title} />

						{/* <main className="overflow-y-auto py-3 flex flex-col h-screen"> */}
						<main className="flex h-screen flex-col overflow-y-auto  bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-2">
							<div className="my-2 flex  h-full flex-col overflow-y-auto rounded-lg bg-primary-100 p-4 shadow-lg ">
								{children}
							</div>
						</main>
					</Providers>
				</QueryWrapper>
			</body>
		</html>
	);
}
