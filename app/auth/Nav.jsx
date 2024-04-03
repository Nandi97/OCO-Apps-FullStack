import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';
import Login from './Login';
import Logged from './Logged';
import Image from 'next/image';
import OraroLogo from '@/public/assets/images/Oraro-Logo.png';
import Menu from './NavMenu';
import Link from 'next/link';

export async function getSessionData() {
	const session = await getServerSession(authOptions);
	// console.log(session)
	return session;
}
export default async function Nav({ pageTitle }) {
	const session = await getSessionData();

	return (
		<nav className="flex h-10 w-full items-center justify-between bg-primary-400/30 p-1 px-3 shadow-sm shadow-slate-400">
			<div className="flex flex-shrink-0 items-center divide-x divide-secondary-300">
				<Link href={`/`} className="flex items-center px-2">
					<Image
						height={64}
						width={64}
						className="h-5 w-5 object-contain"
						src={OraroLogo}
						alt="OCO Logo"
					/>
					<div className="inline-flex items-center text-sm font-medium">
						<span className="text-secondary-600">OCO</span>
						<span className="text-primary-600">Apps</span>
					</div>
				</Link>
				<div className="px-2 text-base font-extralight text-secondary-600">{pageTitle}</div>
			</div>

			<div className="flex h-full items-center justify-center space-x-2">
				{!session?.user && <Login />}
				{session?.user && (
					<>
						<Menu />
						<Logged
							image={session?.user?.image || ''}
							name={session?.user?.name}
							designation=""
						/>
					</>
				)}
			</div>
		</nav>
	);
}
