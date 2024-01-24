'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import SubForm from './NewsArticleForm';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

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
	const handleSubmitForm: SubmitHandler<NewsFeedForm> = (data) => {
		try {
			if (articleItems) {
				data.articles = articleItems;
			}

			console.log(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};
	return (
		<div className="grid grid-cols-6">
			<div className="md:col-span-3 col-span-6">
				<form
					className="shadow-inner bg-primary-50 p-2 w-full flex space-y-4 flex-col"
					onSubmit={handleSubmit(handleSubmitForm)}
				>
					<div>
						<label
							htmlFor="date"
							className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
						>
							Date
						</label>
						<div className="mt-1">
							<input
								type="date"
								id="date"
								{...register('date', { required: true })}
								className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
							/>
						</div>
					</div>
					<div className="shadow-md rounded-md shadow-slate-500 p-2">
						<div className="flex w-full divide-solid py-2">
							<SubForm addArticle={handleAddArticle} />
						</div>
						<div className="w-full flex flex-col space-y-4">
							{articleItems?.map((item, index: number) => (
								<div
									key={item?.key}
									className="relative shadow-sm shadow-slate-600 p-2"
								>
									<h1>Article {index + 1}</h1>
									<div>
										<h2 className="block text-sm font-medium text-secondary-700">
											Title:
										</h2>
										<p className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-400 shadow-sm cursor-default">
											{item?.title}
										</p>
									</div>
									<div>
										<h2 className="block text-sm font-medium text-secondary-700">
											Body:
										</h2>
										<p className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-400 shadow-sm cursor-default">
											{item?.content}
										</p>
									</div>
									<div>
										<h2 className="block text-sm font-medium text-secondary-700">
											Url:
										</h2>
										<p className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-400 shadow-sm cursor-default">
											{item?.url}
										</p>
									</div>
									<div>
										<h2 className="block text-sm font-medium text-secondary-700">
											Tags:
										</h2>
										<p className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-400 shadow-sm cursor-default">
											{item?.tags}
										</p>
									</div>
									<div className="absolute top-2 right-2">
										<button
											type="button"
											className="p-2 shadow-sm shadow-secondary-400 hover:shadow-md rounded-l-md"
											onClick={() => handleRemoveArticle(item?.key)}
										>
											<span className="sr-only">Delete</span>
											<Icon icon="heroicons:trash" />
										</button>
										<button
											type="button"
											className="p-2 shadow-sm shadow-secondary-400 hover:shadow-md rounded-r-md"
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
					<div className="w-full flex items-center py-2 justify-center">
						<button
							type="submit"
							className={`flex ${
								isPending
									? 'bg-slate-600 text-white'
									: 'bg-primary-600 text-white hover:bg-primary-600/90 hover:opacity-80 border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'
							} items-center gap-2 p-2 text-sm font-medium leading- border rounded-md shadow-sm  `}
							disabled={isPending ? true : false}
						>
							Save and Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
