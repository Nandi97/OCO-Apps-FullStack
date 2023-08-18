interface PurchaseItemFormProp {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	currency: any;
}

export default function PurchaseItemForm({ formValues, onChange, currency }: PurchaseItemFormProp) {
	return (
		<div className="grid grid-cols-12 gap-2">
			<div className="col-span-6 md:col-span-6">
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
			<div className="col-span-6 md:col-span-2">
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
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
				>
					<span>Cost</span>
				</label>
				<div className="mt-1">
					<div className="ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-ocoblue-600 sm:max-w-md sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1">
						<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
							{currency}
						</span>
						<input
							type="number"
							name="cost"
							value={formValues?.cost}
							onChange={onChange}
							id="cost"
							className="flex flex-1 border-0 bg-transparent  text-ocoblue-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
