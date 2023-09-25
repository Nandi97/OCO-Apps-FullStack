import Image from 'next/image';
import avatar from '@/public/assets/images/avatar_placeholder.png';

type UserPanelType = {
	userImage: string;
	userName?: string;
	userEmail?: string;
};

export default function UserPanel({ userImage, userName, userEmail }: UserPanelType) {
	return (
		<div className="flex w-2/3 justify-center items-center flex-col p-4 space-y-4 hover:shadow-md transition-all duration-300 hover:p-5 cursor-pointer shadow-md border border-ocoblue-100 rounded-md bg-transparent h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
			<div
				className="h-20 w-20 rounded-full shadow-md shadow-ocobrown-300"
				style={{
					backgroundImage: `url("https://via.placeholder.com/500")`,
				}}
			>
				<Image
					width={1000}
					height={1000}
					className="h-20 w-20 p-2 rounded-full z-10"
					src={userImage}
					alt="User Image"
					quality={100}
					style={{ objectFit: 'contain' }}
				/>
			</div>
			<h1 className="font-bold text-lg">{userName}</h1>
			<span className="font-normal text-ocobrown-600">{userEmail}</span>
		</div>
	);
}
