import { Skeleton } from '@/components/my-ui/skeleton';

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
			<div className="flex h-screen grow flex-col justify-between gap-y-5 overflow-y-auto border-r border-gray-200 bg-secondary-100 px-6 shadow-lg md:col-span-3 md:flex xl:col-span-2">
				<div>
					<Skeleton className="full h-8 w-8 rounded bg-primary-600 bg-opacity-20 object-contain" />
				</div>
				<div>
					<Skeleton className="h-4 w-full bg-primary-600 bg-opacity-20" />
				</div>
			</div>
			<div className="mt-5 flex flex-grow flex-col">
				<div className="flex-1 px-4" aria-label="Sidebar">
					{[...Array(11)].map((_, index) => (
						<div key={index}>
							<Skeleton className="my-4 h-4 w-full space-x-2  bg-secondary-600 bg-opacity-20" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
