'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import BookForm from '@/components/forms/BookForm';
import { Book } from '@/pages/types/Books';

type URL = {
	params: {
		slug: string;
	};
};

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/books/${slug}`);
	return response.data;
};

export default function EditBook(url: URL) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [base64Cover, setBase64Cover] = useState<string>('');

	const { data: book } = useQuery<Book[]>({
		queryKey: ['detailBookEdit'],
		queryFn: () => fetchDetails(url.params.slug),
	});
	const [title, setTitle] = useState<string>(`Edit Book: ${book?.title}`);
	// console.log('Books :', book);

	const [formValues, setFormValues] = useState<any>({
		cover_url: '',
		title: '',
		author: '',
		publisher: '',
		mediaType: '',
		edition: '',
		staffId: '',
		subject: '',
		copies: '',
		isbnIssn: '',
		publicationYear: '',
	});

	let toastBookID: string;

	useEffect(() => {
		if (book) {
			setFormValues({
				cover_url: book.cover_url,
				title: book.title,
				author: book.author,
				publisher: book.publisher,
				staffId: '45',
				mediaType: book.media_type,
				edition: book.edition,
				copies: book.copies,
				isbnIssn: book.isbn_issn,
				publicationYear: book.publication_year,
				subject: book.subject,
			});
		}
	}, [book]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const router = useRouter();

	const { mutate } = useMutation(
		async () => {
			const bookData = {
				id: book?.id,
				title: formValues.title,
				author: formValues.author,
				publisher: formValues.publisher,
				media_type: formValues.mediaType,
				edition: formValues.edition,
				staff_id: formValues.staffId,
				subject: formValues.subject,
				copies: formValues.copies,
				isbn_issn: formValues.isbnIssn,
				publication_year: formValues.publicationYear,
				cover_url: base64Cover || selectedFile || formValues.cover_url,
			};
			// console.log('Book Data', bookData);
			await axios.patch(`/api/books/editBook`, { bookData });
		},
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data.message, {
						id: toastBookID,
					});
					console.error('Form submission error:', error);
				}
			},
			onSuccess: (data) => {
				toast.success('Book has been Edited', {
					id: toastBookID,
				});
				setFormValues({
					...formValues,
					cover_url: '',
					title: '',
					author: '',
					publisher: '',
					mediaType: '',
					edition: '',
					staffId: '45',
					subject: '',
					copies: '',
					isbnIssn: '',
					publicationYear: '',
				});
				setSelectedFile(null);
				router.push('/library');
			},
		}
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		toastBookID = toast.loading('Editing Your Book', { id: toastBookID });
		mutate();
	};

	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
			</div>
			<form onSubmit={handleSubmit} className="rounded-md shadow-md shadow-ocoblue-200">
				<div>
					<BookForm
						formValues={formValues}
						onChange={handleChange}
						setSelectedFile={setSelectedFile}
						setBase64Cover={setBase64Cover}
					/>
				</div>
				<div className="flex items-center justify-center w-full py-8 space-x-2">
					{/* Submit Form Button  */}
					<button
						type="submit"
						className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocobrown-600 hover:opacity-80 border-ocobrown-300 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					>
						Submit Form
					</button>
					<Link
						href={'/library'}
						className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
					>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}
