import { Icon } from '@iconify/react/dist/iconify.js';

interface PurchaseItemFormProp {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: (event: any) => void;
}

export default function PurchaseItemForm({ formValues, onChange, onClick }: PurchaseItemFormProp) {
	return (
		<div className="grid grid-cols-12 gap-2 border rounded-md border-ocoblue-400 p-2">
			<div className="col-span-5 md:col-span-5">
				<label
					htmlFor="description"
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
				>
					<span> Description</span>
				</label>
				<div className="mt-1">
					<input
						type="text"
						name="description"
						id="description"
						value={formValues?.description}
						onChange={onChange}
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div className="col-span-5 md:col-span-2">
				<label
					htmlFor="quantity"
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
				>
					<span> Qty</span>
				</label>
				<div className="mt-1">
					<input
						type="number"
						name="quantity"
						id="quantity"
						value={formValues?.quantity}
						onChange={onChange}
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div className="col-span-6 md:col-span-4">
				<label
					htmlFor="cost"
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700"
				>
					<span>Cost</span>
				</label>
				<div className="mt-1">
					<input
						type="number"
						name="cost"
						value={formValues?.cost}
						onChange={onChange}
						id="cost"
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div className="md:col-span-1 flex w-full items-center justify-center">
				<button
					onClick={onClick}
					className="bg-ocobrown-600 text-white p-2 rounded-md mt-5"
					type="button"
				>
					<Icon icon="heroicons:trash" />
				</button>
			</div>
		</div>
	);
}
