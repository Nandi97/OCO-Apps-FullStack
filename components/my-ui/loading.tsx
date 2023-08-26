import { Skeleton } from '@/components/my-ui/skeleton';

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
			<div className="flex-col justify-between flex h-screen shadow-lg md:flex md:col-span-3 xl:col-span-2 bg-ocoblue-100 grow gap-y-5 overflow-y-auto border-r border-gray-200 px-6">
				<div>
					<Skeleton className="h-8 w-8 object-contain bg-ocobrown-600 rounded full bg-opacity-20" />
				</div>
				<div>
					<Skeleton className="h-4 w-full bg-ocobrown-600 bg-opacity-20" />
				</div>
			</div>
			<div className="flex flex-col flex-grow mt-5">
				<div className="flex-1 px-4" aria-label="Sidebar">
					{[...Array(11)].map((_, index) => (
						<div key={index}>
							<Skeleton className="h-4 w-full bg-ocoblue-600 space-x-2  my-4 bg-opacity-20" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
