'use client';
import TextInput from '@/components/my-ui/form-inputs/InputField';
import BookPlaceholder from '@/public/assets/images/books/book-illustration.png';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface BookForm {
	author: string;
	title: string;
	coverUrl: string;
	copies: number;
	edition: string;
	isbnIssn: string;
	mediaType: string;
	publicationYear: number;
	publisher: string;
	subject: string;
}

interface BookFormProps {
	initialValues?: BookForm;
	onSubmit: SubmitHandler<BookForm>;
	isPending: boolean;
}

export default function BookForm({ onSubmit, initialValues, isPending }: BookFormProps) {
	const [selectedImage, setSelectedImage] = useState<string>('');
	const coverRef = useRef<HTMLInputElement>(null);
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<BookForm>({
		defaultValues: initialValues,
	});

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};
	const onBookCoverSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event?.target?.files;
		if (files && files.length > 0) {
			const file = files[0];
			const base64Image = await convertToBase64(file);
			setSelectedImage(base64Image);
		}
	};

	const handleSubmitForm: SubmitHandler<BookForm> = (data) => {
		if (selectedImage) {
			data.coverUrl = selectedImage;
		} else {
			data.coverUrl = '/assets/images/books/book-illustration.png';
		}
		try {
			onSubmit(data);
			// console.log(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};

	return (
		<form
			className="md:w-4/6 w-full flex flex-col justify-center"
			onSubmit={handleSubmit(handleSubmitForm)}
		>
			<div className="grid grid-cols-6 md:gap-4 md:grid-cols-12">
				{/* Photo Upload Component */}
				<div className="col-span-6 p-1 md:col-span-3 md:border-r-2 border-secondary-100">
					<div className="flex flex-col items-center justify-center w-full space-y-2">
						<label htmlFor="photo" className="text-sm font-medium text-secondary-700">
							Book Cover Photo
						</label>
						<Image
							height={20}
							width={20}
							src={initialValues?.coverUrl || selectedImage || BookPlaceholder}
							alt="Book Cover Image"
							className="inline-flex items-center justify-center overflow-hidden rounded-md aspect-[9/16] md:w-24 object-contain sm:w-10 ring-2 ring-offset-1 ring-primary-600 bg-secondary-300"
						/>
						<input
							type="file"
							name="cover"
							id="coverFile"
							ref={coverRef}
							accept="image/*"
							className="hidden"
							placeholder="Book Avatar"
							onChange={onBookCoverSelected}
						/>
						<button
							onClick={() => coverRef.current?.click()}
							type="button"
							className="p-1 text-sm font-medium leading-4 bg-white border rounded-md shadow-sm border-secondary-300 text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
						>
							Change
						</button>
					</div>
				</div>
				<div className="grid grid-cols-6 col-span-6 gap-4 p-2 md:col-span-9">
					{/* Title */}

					<TextInput
						type="text"
						label="Name"
						className="col-span-6 space-y-1 md:col-span-3"
						error={errors.title}
						registration={register('title', { required: true })}
					/>

					{/* Author */}

					<TextInput
						type="text"
						label="Author"
						className="col-span-6 space-y-1 md:col-span-3"
						error={errors.author}
						registration={register('author', { required: true })}
					/>

					{/* Publisher */}

					<TextInput
						type="text"
						label="Publisher"
						className="col-span-6 space-y-1 md:col-span-3"
						error={errors.publisher}
						registration={register('publisher', { required: true })}
					/>

					{/* Media Type */}
					<TextInput
						type="text"
						label="Media Type"
						className="col-span-6 space-y-1 md:col-span-3"
						error={errors.mediaType}
						registration={register('mediaType', { required: true })}
					/>

					{/* Edition */}
					<TextInput
						type="text"
						label="Edition"
						className="col-span-6 space-y-1 md:col-span-3"
						error={errors.edition}
						registration={register('edition', { required: true })}
					/>

					{/** Subject */}
					<TextInput
						type="text"
						label="Subject"
						className="col-span-6 space-y-1 md:col-span-3"
						error={errors.subject}
						registration={register('subject', { required: true })}
					/>

					{/* Copies */}

					<TextInput
						type="number"
						label="Copies"
						className="col-span-6 space-y-1 md:col-span-2"
						error={errors.copies}
						registration={register('copies', {
							required: true,
							valueAsNumber: true,
							validate: (value) => value > 0,
						})}
					/>

					{/* ISBN ISSN */}

					<TextInput
						type="text"
						label="Isbn Issn"
						className="col-span-6 space-y-1 md:col-span-2"
						error={errors.isbnIssn}
						registration={register('isbnIssn', {
							required: true,
						})}
					/>

					{/* Publication Year */}

					<TextInput
						type="number"
						label="Publication Year"
						className="col-span-6 space-y-1 md:col-span-2"
						error={errors.publicationYear}
						registration={register('publicationYear', {
							minLength: 1900,
							maxLength: 2099,
							required: true,
							valueAsNumber: true,
							validate: (value) => value > 0,
						})}
					/>
					{/* Subject */}
				</div>
			</div>
			<div className="flex items-center justify-center w-full py-8 space-x-2">
				<button
					type="submit"
					className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-primary-600 hover:opacity-80 border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
				>
					Submit Form
				</button>
				<Link
					href={`/library`}
					className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-secondary-600 hover:opacity-80 border-secondary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
				>
					Cancel
				</Link>
			</div>
		</form>
	);
}
