import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';
import Login from './Login';
import Logged from './Logged';
import Image from 'next/image';
import OraroLogo from '@/public/assets/images/Oraro-Logo.png';
import Menu from './NavMenu';


export async function getSessionData() {
	const session = await getServerSession(authOptions);
	// console.log(session)
	return session;
}
export default async function Nav({pageTitle}) {
	const session = await getSessionData();

	return (
		<nav className="w-full bg-ocobrown-400/30 h-10 justify-between p-1 flex items-center px-3">
			<div className="flex items-center flex-shrink-0 divide-x divide-ocoblue-300">
				<div className='flex items-center px-2'> 
				<Image
					height={64}
					width={64}
					className="object-contain w-5 h-5"
					src={OraroLogo}
					alt="OCO Logo"
				/>
				<div className="inline-flex items-center text-sm font-medium">
					<span className="text-ocoblue-600">OCO</span>
					<span className="text-ocobrown-600">Apps</span>
					</div></div>
				<div className="font-extralight px-2 text-base text-ocoblue-600">
					{pageTitle}
					</div>
				
			</div>
				
			<div className="flex space-x-2">
				{!session?.user && <Login />}
			{session?.user && ( <><Menu/>
				<Logged
					image={session?.user?.image || ''}
					name={session?.user?.name}
					designation=""
				/></>
			)}
			</div>
		</nav>
	);
}
