import { useState } from 'react';
import Tiptap from '@/components/my-ui/Tiptap';

interface ArticleFormProp {
	addArticle: (article: any) => void;
}

export default function SubForm({ addArticle }: ArticleFormProp) {
	const [formValues, setFormData] = useState<any>({
		title: '',
		content: '',
		url: '',
		tags: '',
	});
	const isButtonDisabled = () => {
		if (!formValues.title || !formValues.content || !formValues.url || !formValues.tags) {
			return true;
		} else {
			return false;
		}
	};
	const handleAddArticle = () => {
		addArticle(formValues);
		setFormData({ title: '', content: '', url: '', tags: '' });
	};
	return (
		<div className="flex w-full flex-col">
			<input type="text" value={formValues?.key} name="key" id="key" hidden />
			<div>
				<label
					htmlFor="title"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					Feed Title
				</label>
				<div className="mt-1">
					<input
						type="text"
						name="title"
						id="title"
						value={formValues?.title}
						onChange={(e) =>
							setFormData({
								...formValues,
								title: e.target.value,
							})
						}
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="content"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					Body
				</label>
				<div className="mt-1">
					<textarea
						id="content"
						name="content"
						value={formValues?.content}
						onChange={(e) =>
							setFormData({
								...formValues,
								content: e.target.value,
							})
						}
						className="border-1 shadow-accent-300 block h-20 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
					{/* <Tiptap /> */}
				</div>
			</div>
			<div>
				<label
					htmlFor="url"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					URL
				</label>
				<div className="mt-1">
					<input
						type="text"
						id="url"
						name="url"
						value={formValues?.url}
						onChange={(e) =>
							setFormData({
								...formValues,
								url: e.target.value,
							})
						}
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="tags"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					Tags
				</label>
				<div className="mt-1">
					<input
						type="text"
						id="tags"
						name="tags"
						value={formValues?.tags}
						onChange={(e) =>
							setFormData({
								...formValues,
								tags: e.target.value,
							})
						}
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
				</div>
			</div>
			<div className="col-span-1 flex w-full items-center justify-center md:col-span-full">
				<button
					onClick={handleAddArticle}
					className={`${isButtonDisabled() ? 'bg-slate-600' : 'bg-primary-600'} mt-5 rounded-md p-2 text-white`}
					disabled={isButtonDisabled()}
					type="button"
				>
					Add Article
				</button>
			</div>
		</div>
	);
}
