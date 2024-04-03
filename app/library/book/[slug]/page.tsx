'use client';
import { Book } from '@/pages/types/Books';
import { useQuery } from '@tanstack/react-query';
import Book_Mockup from '@/public/assets/images/books/book-illustration.png';
import axios from 'axios';
import Image from 'next/image';
import OptDropdown from '@/components/my-ui/OptDropdown';
import { usePathname } from 'next/navigation';
import { URL } from '@/components/types/URL';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/books/${slug}`);
	return response.data;
};

export default function Book(url: URL) {
	const { data: book } = useQuery<Book[]>({
		queryKey: ['detailBook'],
		queryFn: () => fetchDetails(url.params.slug),
	});

	const pathname = usePathname();
	// console.log('Book Data:', book);
	const handleDelete = () => {
		console.log('Deleting Book');
	};

	const tableOptBtnTxt = {
		icon: 'heroicons:ellipsis-horizontal',
		buttonClassName:
			'flex items-center justify-center w-full h-8 px-4 text-secondary-900 rounded-sm hover:shadow-sm z-20',
	};
	const tableOptionsList = [
		{ name: 'Delete Book', icon: 'heroicons:trash', action: handleDelete },
	];
	return (
		<div className="space-y-2 bg-white">
			<div className="sticky top-2 z-20 flex items-center justify-between gap-2 bg-white">
				<h1 className="text-accent-700 text-lg font-extralight">{book?.title}</h1>
				<div className="inline-flex items-center space-x-2"></div>
			</div>
			<div className="relative">
				<div className="grid w-full grid-cols-6 overscroll-none p-4 shadow ring-1 ring-black ring-opacity-5 md:grid-cols-12 md:rounded-md">
					<div className="col-span-6 flex w-full items-center md:col-span-4">
						<Image
							width={180}
							height={320}
							alt="Book Cover Image"
							src={book?.coverUrl || Book_Mockup}
						/>
					</div>
					<div className="col-span-6 grid grid-cols-8 gap-2 md:col-span-8">
						{/* Author  */}
						<div className="flex w-full justify-between text-sm font-semibold text-secondary-700 sm:col-span-8 md:col-span-2">
							<span>Author</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold sm:col-span-8 md:col-span-6">
							<span>{book?.author}</span>
						</div>
						{/* Publisher  */}
						<div className="flex w-full justify-between text-sm font-semibold text-secondary-700 sm:col-span-8 md:col-span-2">
							<span>Publisher</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold sm:col-span-8 md:col-span-6">
							<span>{book?.publisher}</span>
						</div>
						{/* Publication Year  */}
						<div className="flex w-full justify-between text-sm font-semibold text-secondary-700 sm:col-span-8 md:col-span-2">
							<span>Publication Year</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold sm:col-span-8 md:col-span-6">
							<span>{book?.publicationYear}</span>
						</div>
						{/* Subject  */}
						<div className="flex w-full justify-between text-sm font-semibold text-secondary-700 sm:col-span-8 md:col-span-2">
							<span>Subject</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold sm:col-span-8 md:col-span-6">
							<span>{book?.subject}</span>
						</div>
						{/* Edition  */}
						<div className="flex w-full justify-between text-sm font-semibold text-secondary-700 sm:col-span-8 md:col-span-2">
							<span>Edition</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold sm:col-span-8 md:col-span-6">
							<span>{book?.edition}</span>
						</div>
						{/* Edition  */}
						<div className="flex w-full justify-between text-sm font-semibold text-secondary-700 sm:col-span-8 md:col-span-2">
							<span>ISBN_ISSN</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold sm:col-span-8 md:col-span-6">
							<span>{book?.isbnIssn}</span>
						</div>
						{/* Copies  */}
						<div className="col-span-8 flex w-full items-center text-sm font-semibold">
							<div className="space-x-4 rounded-md bg-primary-400 p-2 text-secondary-50 ">
								<span className="inline-flex h-full rounded-md ">
									Available Copies
								</span>
								<span className="inline-flex items-center justify-center rounded-full text-xs ">
									{book?.copies}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute right-2 top-2 z-30 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-secondary-400 hover:bg-secondary-200 hover:text-secondary-900">
					<OptDropdown
						optBtn={tableOptBtnTxt}
						optionsList={[
							...tableOptionsList,
							{
								name: 'Edit Book',
								icon: 'heroicons:pencil-square',
								link: `${pathname}/edit`,
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
}
