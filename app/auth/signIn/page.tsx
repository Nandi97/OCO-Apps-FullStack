'use client';

import { signIn } from 'next-auth/react';
import React, { useRef } from 'react';

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
			<div className="flex flex-col items-center transform bg-ocobrown-600/50 rounded-lg md:p-12 md:gap-6 ove md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:left-1/2">
				<div className="grid grid-cols-12">
					<div className="col-span-6">Logo</div>
					<div className="col-span-6">
						<button type="button" onClick={onSubmit}>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
