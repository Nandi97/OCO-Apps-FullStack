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
			<head />
			<body
				className={` ${roboto.variable} h-screen font-sans bg-gradient-to-br from-accent-100 via-primary-100 to-accent-100 overflow-hidden`}
			>
				<QueryWrapper>
					<AuthContext>
						<Sidebar sidebarProp={<Nav />} />

						{/* <main className="overflow-y-auto py-3 flex flex-col h-screen"> */}
						<main className="overflow-y-auto py-3 lg:pl-64 flex flex-col h-screen">
							<div className="p-4 py-2 bg-white rounded-lg shadow-lg overflow-y-auto flex flex-col">
								{children}
							</div>
						</main>
					</AuthContext>
				</QueryWrapper>
			</body>
		</html>
	);
}
