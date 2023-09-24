'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
	return (
		<>
			<div className="inline-flex items-center w-full px-2 space-x-4 rounded-lg justify-center bg-ocobrown-400 text-white shadow-sm">
				<button onClick={() => signIn()}>Sign In</button>
			</div>
		</>
	);
}
