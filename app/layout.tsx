import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import AuthContext from './QueryWrapper';
import QueryWrapper from './QueryWrapper';
import Sidebar from './auth/Sidebar';
import Nav from './auth/Nav';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: 'OCO Apps',
	description: 'OCO Apps',
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
				className={` ${roboto.variable} h-screen font-sans bg-gradient-to-br from-accent-100 via-primary-100 to-accent-100 overflow-hidden`}
			>
				<QueryWrapper>
					<AuthContext>
						{/* <Sidebar sidebarProp={<Nav />} /> */}
						<Nav />

						{/* <main className="overflow-y-auto py-3 flex flex-col h-screen"> */}
						<main className="overflow-y-auto flex flex-col h-screen  bg-gradient-to-br from-ocobrown-500/10 to-ocoblue-500/10 p-2">
							<div className="p-4 my-2  rounded-lg shadow-lg bg-ocobrown-100 overflow-y-auto flex flex-col h-full ">
								{children}
							</div>
						</main>
					</AuthContext>
				</QueryWrapper>
			</body>
		</html>
	);
}
