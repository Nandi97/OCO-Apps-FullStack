'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
	return (
		<>
			<div className="inline-flex items-center w-full p-2 space-x-4 bg-white rounded-lg">
				<button onClick={() => signIn()}>Sign In</button>
			</div>
		</>
	);
}
