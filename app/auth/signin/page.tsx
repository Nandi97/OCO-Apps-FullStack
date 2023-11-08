'use client';

import { signIn } from 'next-auth/react';
import React, { useRef } from 'react';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import Image from 'next/image';

const LoginPage = () => {
	const userName = useRef('');
	const pass = useRef('');

	const onSubmit = async () => {
		const result = await signIn('azure-ad', {
			redirect: true,
			callbackUrl: '/',
		});
	};
	return (
		<div className={'fixed top-0 left-0 z-40 w-full h-full bg-white'}>
			<div className="flex flex-col items-center transform rounded-lg md:p-12 md:gap-6 ove md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:left-1/2">
				<div className="grid grid-cols-12 shadow-md rounded-md">
					<div className="col-span-6 rounded-l-md bg-ocobrown-600/50 p-2 md:h-96 space-y-4 flex flex-col items-center justify-center w-60">
						<Image
							src={logo}
							alt="oco logo"
							width={200}
							height={100}
							className="border"
						/>
						<p className="text-ocobrown-600">Welcome</p>
						<div className="inline-flex items-center text-base font-semibold">
							<span className="text-ocoblue-600">OCO</span>
							<span className="text-ocobrown-600">Apps</span>
						</div>
					</div>
					<div className="col-span-6 flex items-center w-full h-full justify-center bg-ocoblue-100 rounded-r-md">
						<button
							type="button"
							onClick={onSubmit}
							className="flex items-center p-2 hover:shadow-lg shadow rounded-lg justify-center bg-ocobrown-400 text-white"
						>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
