'use client';

import Image from 'next/image';
import OraroLogo from '@/public/assets/images/Oraro-Logo.png';

export default function Navbar() {
	return (
		<div className="w-full fixed top-0 bg-ocobrown-400/30 h-8 justify-between p-1 flex items-center">
			<div className="flex items-center flex-shrink-0">
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
				</div>
			</div>
		</div>
	);
}
