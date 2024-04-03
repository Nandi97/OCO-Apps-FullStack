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
		<div className={'fixed left-0 top-0 z-40 h-full w-full bg-white'}>
			<div className="ove flex transform flex-col items-center rounded-lg md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:gap-6 md:p-12">
				<div className="grid grid-cols-12 rounded-md shadow-md">
					<div className="col-span-6 flex w-60 flex-col items-center justify-center space-y-4 rounded-l-md bg-primary-600/50 p-2 md:h-96">
						<Image
							src={logo}
							alt="oco logo"
							width={200}
							height={100}
							className="border"
						/>
						<p className="text-primary-600">Welcome</p>
						<div className="inline-flex items-center text-base font-semibold">
							<span className="text-secondary-600">OCO</span>
							<span className="text-primary-600">Apps</span>
						</div>
					</div>
					<div className="col-span-6 flex h-full w-full items-center justify-center rounded-r-md bg-secondary-100">
						<button
							type="button"
							onClick={onSubmit}
							className="flex items-center justify-center rounded-lg bg-primary-400 p-2 text-white shadow hover:shadow-lg"
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
