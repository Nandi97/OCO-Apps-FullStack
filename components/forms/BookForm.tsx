'use client';
import Book_Placeholder from '@/public/assets/images/books/book-illustration.png';

import Image from 'next/image';
import { useRef, useState } from 'react';

interface BookFormProps {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setSelectedFile: (file: File | null) => void;
	setBase64Cover: (base64: string) => void;
}

export default function BookForm({
	formValues,
	onChange,
	setSelectedFile,
	setBase64Cover,
}: BookFormProps) {
	const [selectedImage, setSelectedImage] = useState<string>('');
	const coverRef = useRef<HTMLInputElement>(null);

	const onBookCoverSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event?.target?.files;
		if (files && files.length > 0) {
			const file = files[0];
			const base64Image = await convertToBase64(file);
			setSelectedImage(base64Image);
			setSelectedFile(file);
			setBase64Cover(base64Image);
		}
	};

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	return (
		<div>
			<div className="grid grid-cols-6 md:gap-4 md:grid-cols-12">
				{/* Photo Upload Component */}
				<div className="col-span-6 p-1 md:col-span-3 md:border-r-2 border-ocoblue-100">
					<div className="flex flex-col items-center justify-center w-full space-y-2">
						<label htmlFor="photo" className="text-sm font-medium text-ocoblue-700">
							Book Cover Photo
						</label>
						<Image
							height={20}
							width={20}
							src={formValues?.cover_url || selectedImage || Book_Placeholder}
							alt="Book Cover Image"
							className="inline-flex items-center justify-center overflow-hidden rounded-md aspect-[9/16] md:w-24 object-contain sm:w-10 ring-2 ring-offset-1 ring-ocobrown-600 bg-ocoblue-300"
						/>
						<input
							type="file"
							name="cover"
							id="coverFile"
							ref={coverRef}
							accept="image/*"
							className="hidden"
							onChange={onBookCoverSelected}
						/>
						<button
							onClick={() => coverRef.current?.click()}
							type="button"
							className="p-1 text-sm font-medium leading-4 bg-white border rounded-md shadow-sm border-ocoblue-300 text-ocoblue-700 hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
						>
							Change
						</button>
					</div>
				</div>
				<div className="grid grid-cols-6 col-span-6 gap-4 p-2 md:col-span-9">
					{/* Title */}
					<div className="col-span-6 space-y-1 md:col-span-3">
						<label
							htmlFor="title"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Title
						</label>
						<input
							type="text"
							name="title"
							id="title"
							onChange={onChange}
							value={formValues?.title}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>

					{/* Author */}
					<div className="col-span-6 space-y-1 md:col-span-3">
						<label
							htmlFor="author"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Author
						</label>
						<input
							type="text"
							name="author"
							id="author"
							onChange={onChange}
							value={formValues?.author}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>

					{/* Publisher */}
					<div className="col-span-6 space-y-1 md:col-span-3">
						<label
							htmlFor="publisher"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Publisher
						</label>
						<input
							type="text"
							name="publisher"
							id="publisher"
							onChange={onChange}
							value={formValues?.publisher}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>

					{/* Staff Member Field  */}
					<div className="hidden col-span-3 space-y-1 md:col-span-3">
						<label
							htmlFor="staff member"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Staff Member
						</label>
						<select
							id="staffId"
							name="staffId"
							value={formValues?.staffId} // Use value instead of defaultValue
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-ocoblue-500 block p-2.5 h-8 px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						>
							{/* Remove the disabled attribute */}
							<option value="">--Select Staff Member--</option>
							{formValues?.staff?.map((item: any) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>

					{/* Media Type */}
					<div className="col-span-6 space-y-1 md:col-span-3">
						<label
							htmlFor="mediaType"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Media Type
						</label>
						<input
							type="text"
							name="mediaType"
							id="mediaType"
							onChange={onChange}
							value={formValues?.mediaType}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>
					{/* Edition */}
					<div className="col-span-6 space-y-1 md:col-span-3">
						<label
							htmlFor="edition"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Edition
						</label>
						<input
							type="text"
							name="edition"
							id="edition"
							onChange={onChange}
							value={formValues?.edition}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>
					{/** Subject */}
					<div className="col-span-6 space-y-1 md:col-span-3">
						<label
							htmlFor="subject"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Subject
						</label>
						<input
							type="text"
							name="subject"
							id="subject"
							onChange={onChange}
							value={formValues?.subject}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>
					{/* Copies */}
					<div className="col-span-6 space-y-1 md:col-span-2">
						<label
							htmlFor="copies"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Copies
						</label>
						<input
							type="number"
							name="copies"
							id="copies"
							onChange={onChange}
							value={formValues?.copies}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>

					{/* ISBN ISSN */}
					<div className="col-span-6 space-y-1 md:col-span-2">
						<label
							htmlFor="isbnIssn"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Isbn Issn
						</label>
						<input
							type="text"
							name="isbnIssn"
							id="isbnIssn"
							onChange={onChange}
							value={formValues?.isbnIssn}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>

					{/* Publication Year */}
					<div className="col-span-6 space-y-1 md:col-span-2">
						<label
							htmlFor="publicationYear"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Publication Year
						</label>
						<input
							type="number"
							name="publicationYear"
							id="publicationYear"
							onChange={onChange}
							value={formValues?.publicationYear}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							required
						/>
					</div>

					{/* Subject */}
				</div>
			</div>
		</div>
	);
}
