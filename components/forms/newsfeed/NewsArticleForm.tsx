import { useState } from 'react';

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
		<div className="w-full flex flex-col">
			<input type="text" value={formValues?.key} name="key" id="key" hidden />
			<div>
				<label
					htmlFor="title"
					className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
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
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="content"
					className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
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
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-20  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="url"
					className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
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
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="tags"
					className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
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
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div className="col-span-1 flex w-full items-center justify-center md:col-span-full">
				<button
					onClick={handleAddArticle}
					className={`${isButtonDisabled() ? 'bg-slate-600' : 'bg-primary-600'} text-white p-2 rounded-md mt-5`}
					disabled={isButtonDisabled()}
					type="button"
				>
					Add Article
				</button>
			</div>
		</div>
	);
}
