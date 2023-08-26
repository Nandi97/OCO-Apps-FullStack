'use client';
import { Book } from '@/pages/types/Books';
import { useQuery } from '@tanstack/react-query';
import Book_Mockup from '@/public/assets/images/books/book-illustration.png';
import axios from 'axios';
import Image from 'next/image';
import OptDropdown from '@/components/my-ui/OptDropdown';
import { usePathname } from 'next/navigation';
import { URL } from '@/pages/types/URL';

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
			'flex items-center justify-center w-full h-8 px-4 text-ocoblue-900 rounded-sm hover:shadow-sm z-20',
	};
	const tableOptionsList = [
		{ name: 'Delete Book', icon: 'heroicons:trash', action: handleDelete },
	];
	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{book?.title}</h1>
				<div className="inline-flex items-center space-x-2"></div>
			</div>
			<div className="relative">
				<div className="grid w-full grid-cols-6 p-4 shadow md:grid-cols-12 overscroll-none ring-1 ring-black ring-opacity-5 md:rounded-md">
					<div className="flex items-center w-full col-span-6 md:col-span-4">
						<Image
							width={180}
							height={320}
							alt="Book Cover Image"
							src={book?.coverUrl || Book_Mockup}
						/>
					</div>
					<div className="grid grid-cols-8 col-span-6 gap-2 md:col-span-8">
						{/* Author  */}
						<div className="flex justify-between w-full text-sm font-semibold text-ocoblue-700 md:col-span-2 sm:col-span-8">
							<span>Author</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold md:col-span-6 sm:col-span-8">
							<span>{book?.author}</span>
						</div>
						{/* Publisher  */}
						<div className="flex justify-between w-full text-sm font-semibold text-ocoblue-700 md:col-span-2 sm:col-span-8">
							<span>Publisher</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold md:col-span-6 sm:col-span-8">
							<span>{book?.publisher}</span>
						</div>
						{/* Publication Year  */}
						<div className="flex justify-between w-full text-sm font-semibold text-ocoblue-700 md:col-span-2 sm:col-span-8">
							<span>Publication Year</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold md:col-span-6 sm:col-span-8">
							<span>{book?.publicationYear}</span>
						</div>
						{/* Subject  */}
						<div className="flex justify-between w-full text-sm font-semibold text-ocoblue-700 md:col-span-2 sm:col-span-8">
							<span>Subject</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold md:col-span-6 sm:col-span-8">
							<span>{book?.subject}</span>
						</div>
						{/* Edition  */}
						<div className="flex justify-between w-full text-sm font-semibold text-ocoblue-700 md:col-span-2 sm:col-span-8">
							<span>Edition</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold md:col-span-6 sm:col-span-8">
							<span>{book?.edition}</span>
						</div>
						{/* Edition  */}
						<div className="flex justify-between w-full text-sm font-semibold text-ocoblue-700 md:col-span-2 sm:col-span-8">
							<span>ISBN_ISSN</span>
							<span>:</span>
						</div>
						<div className="px-2 text-sm font-semibold md:col-span-6 sm:col-span-8">
							<span>{book?.isbnIssn}</span>
						</div>
						{/* Copies  */}
						<div className="flex items-center w-full col-span-8 text-sm font-semibold">
							<div className="p-2 space-x-4 rounded-md bg-ocobrown-400 text-ocoblue-50 ">
								<span className="inline-flex h-full rounded-md ">
									Available Copies
								</span>
								<span className="inline-flex items-center justify-center text-xs rounded-full ">
									{book?.copies}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute z-30 top-2 right-2 text-ocoblue-400 bg-transparent hover:bg-ocoblue-200 hover:text-ocoblue-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
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
