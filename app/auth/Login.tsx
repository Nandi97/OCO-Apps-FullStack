'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
	return (
		<>
			<div className="inline-flex w-full items-center justify-center space-x-4 rounded-lg bg-primary-400 px-2 text-white shadow-sm">
				<button onClick={() => signIn()}>Sign In</button>
			</div>
		</>
	);
}
