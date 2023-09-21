import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Currency = {
	id: number;
	name: string;
	initial: string;
};

interface PurchaseItemFormProp {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: (event: any) => void;
	currencyId: string;
}

export default function PurchaseItemForm({
	formValues,
	onChange,
	onClick,
	currencyId,
}: PurchaseItemFormProp) {
	const { data: currencies } = useQuery<Currency[]>(['currencies'], () =>
		axios.get('/api/general/getCurrencies').then((res) => res.data)
	);

	const currId = parseInt(currencyId);
	const selectedCurrency = currencies?.find((currency) => currency.id === currId)?.initial;

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
				<div className="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						name="cost"
						id="cost"
						value={formValues?.cost}
						onChange={onChange}
						className="block pr-12  sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						placeholder="0.00"
					/>
					<div className="pointer-events-none cursor-default absolute inset-y-0 right-0 flex items-center pr-3 border-l border-ocoblue-400/50 px-2 bg-ocoblue-300 rounded-r-md">
						<span className="text-ocoblue-50 cursor-default sm:text-sm">
							{selectedCurrency}
						</span>
					</div>
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
