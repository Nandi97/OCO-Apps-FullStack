'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import SubForm from './NewsArticleForm';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import NewsFeedPrev from '@/components/previews/NewsFeed';

interface Article {
	title: string;
	content: string;
	url: string;
	tags: string;
}
interface NewsFeedForm {
	date: string;
	articles: Article[];
}

interface NewsFeedFormProps {
	onSubmit: SubmitHandler<NewsFeedForm>;
	initialValues?: NewsFeedForm;
	isPending: boolean;
}

export default function Form({ onSubmit, initialValues, isPending }: NewsFeedFormProps) {
	const [articleItems, setArticleItems] = useState<any>([]);
	const [editableArticle, setEditableArticle] = useState<any>(null);
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialValues,
	});

	const handleAddArticle = (newArticle: any) => {
		const newItem = {
			key: articleItems.length + 1,
			...newArticle,
		};
		setArticleItems([...articleItems, newItem]);
	};
	const handleRemoveArticle = (key: any) => {
		const updatedArticles = articleItems.filter((item) => item.key !== key);
		setArticleItems(updatedArticles);
	};
	const handleEditArticle = (key: any) => {
		const articleToEdit = articleItems.find((item) => item.key === key);
		console.log(articleToEdit);
		setEditableArticle(articleToEdit);
	};

	const watchAllFields: NewsFeedForm = watch();

	const NewsFeedPreview = {
		date: watchAllFields?.date,
		articles: articleItems,
	};

	// console.log('News feed Preview', NewsFeedPreview);

	const handleSubmitForm: SubmitHandler<NewsFeedForm> = (data) => {
		try {
			if (articleItems) {
				data.articles = articleItems;
			}

			// console.log(data);
			onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};
	return (
		<div className="grid grid-cols-6 gap-2">
			<div className="col-span-6 md:col-span-3">
				<form
					className="flex w-full flex-col space-y-4 bg-primary-50 p-2 shadow-inner"
					onSubmit={handleSubmit(handleSubmitForm)}
				>
					<div>
						<label
							htmlFor="date"
							className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
						>
							Date
						</label>
						<div className="mt-1">
							<input
								type="date"
								id="date"
								{...register('date', { required: true })}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							/>
						</div>
					</div>
					<div className="rounded-md p-2 shadow-md shadow-slate-500">
						<div className="flex w-full divide-solid py-2">
							<SubForm addArticle={handleAddArticle} />
						</div>
						<div className="flex w-full flex-col space-y-4">
							{articleItems?.map((item, index: number) => (
								<div
									key={item?.key}
									className="relative p-2 shadow-sm shadow-slate-600"
								>
									<h1>Article {index + 1}</h1>
									<div>
										<h2 className="block text-sm font-medium text-secondary-700">
											Title:
										</h2>
										<p className="border-1 shadow-accent-300 block h-8 w-full cursor-default overflow-hidden truncate rounded-md  border border-secondary-300 bg-secondary-50 bg-opacity-70  p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-400 shadow-sm shadow-secondary-300 focus:border-secondary-500 focus:shadow-inner sm:text-sm">
											{item?.title}
										</p>
									</div>
									<div>
										<h2 className="block text-sm font-medium text-secondary-700">
											Body:
										</h2>
										<p className="border-1 shadow-accent-300 block h-8 w-full cursor-default overflow-hidden truncate rounded-md  border border-secondary-300 bg-secondary-50 bg-opacity-70  p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-400 shadow-sm shadow-secondary-300 focus:border-secondary-500 focus:shadow-inner sm:text-sm">
											{item?.content}
										</p>
									</div>
									<div>
										<h2 className="block text-sm font-medium text-secondary-700">
											Url:
										</h2>
										<p className="border-1 shadow-accent-300 block h-8 w-full cursor-default overflow-hidden truncate rounded-md  border border-secondary-300 bg-secondary-50 bg-opacity-70  p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-400 shadow-sm shadow-secondary-300 focus:border-secondary-500 focus:shadow-inner sm:text-sm">
											{item?.url}
										</p>
									</div>
									<div>
										<h2 className="block text-sm font-medium text-secondary-700">
											Tags:
										</h2>
										<p className="border-1 shadow-accent-300 block h-8 w-full cursor-default rounded-md  border border-secondary-300 bg-secondary-50 bg-opacity-70  p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-400 shadow-sm shadow-secondary-300 focus:border-secondary-500 focus:shadow-inner sm:text-sm">
											{item?.tags}
										</p>
									</div>
									<div className="absolute right-2 top-2">
										<button
											type="button"
											className="rounded-l-md p-2 shadow-sm shadow-secondary-400 hover:shadow-md"
											onClick={() => handleRemoveArticle(item?.key)}
										>
											<span className="sr-only">Delete</span>
											<Icon icon="heroicons:trash" />
										</button>
										<button
											type="button"
											className="rounded-r-md p-2 shadow-sm shadow-secondary-400 hover:shadow-md"
											onClick={() => handleEditArticle(item?.key)}
										>
											<span className="sr-only">Edit</span>
											<Icon icon="heroicons:pencil-square" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex w-full items-center justify-center py-2">
						<button
							type="submit"
							className={`flex ${
								isPending
									? 'bg-slate-600 text-white'
									: 'border-primary-300 bg-primary-600 text-white hover:bg-primary-600/90 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'
							} leading- items-center gap-2 rounded-md border p-2 text-sm font-medium shadow-sm  `}
							disabled={isPending ? true : false}
						>
							Save and Continue
						</button>
					</div>
				</form>
			</div>
			<div className="col-span-6 md:col-span-3">
				<NewsFeedPrev prevData={NewsFeedPreview} />
			</div>
		</div>
	);
}
