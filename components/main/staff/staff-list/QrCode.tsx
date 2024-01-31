'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import QRCode from 'react-qr-code';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/staff/${slug}`);
	return response.data;
};

export default function QrCode() {
	const params = useParams();

	const url = params?.slug;

	const { data: staff } = useQuery({
		queryKey: ['staffDetails'],
		queryFn: () => fetchDetails(url as string),
	});

	return (
		<div className="fixed top-0 left-0 z-[100] w-full h-full bg-white font-roboto">
			<div className="flex w-full flex-col items-center space-y-4">
				<div className="bg-[#c9c2ba] w-full py-5 rounded-b-3xl flex-col flex items-center justify-center">
					<Image
						src={staff?.avatarUrl}
						alt="OCO Logo"
						width={365}
						height={205}
						className="w-40"
					/>
					<h1 className="text-white text-2xl font-semibold">{staff?.name}</h1>
				</div>
				<div className="w-full max-w-lg px-4 py-10 md:max-h-80">
					<QRCode
						size={256}
						style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
						value={`http://localhost:3000/staff/staff-list/${url}/vcard`}
						viewBox={`0 0 256 256`}
						bgColor="#f4e8d1"
						fgColor="#385678"
					/>
				</div>
			</div>
		</div>
	);
}
