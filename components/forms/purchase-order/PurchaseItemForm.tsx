import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

type Currency = {
	id: number;
	name: string;
	initial: string;
};

interface PurchaseItemFormProp {
	addPOItem: (service: any) => void;
	currency: string;
}

export default function PurchaseItemForm({ addPOItem, currency }: PurchaseItemFormProp) {
	const [formValues, setFormData] = useState<any>({
		description: '',
		cost: 0,
		quantity: 0,
	});

	const { data: currencies } = useQuery<Currency[]>({
		queryKey: ['currencies'],
		queryFn: () => axios.get('/api/general/getCurrencies').then((res) => res.data),
	});
	const isButtonDisabled = () => {
		if (!formValues.description || formValues.cost === 0 || formValues.quantity === 0) {
			return true;
		} else {
			return false;
		}
	};
	const handleAddService = () => {
		addPOItem(formValues);
		setFormData({ description: '', cost: 0, quantity: 0 });
	};

	// const currId = parseInt(currencyId);
	// const selectedCurrency = currencies?.find((currency) => currency.id === currId)?.initial;

	return (
		<div className="grid grid-cols-12 gap-2 rounded-md border border-secondary-400 p-2">
			<div className="col-span-5 md:col-span-6">
				<label
					htmlFor="description"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					<span> Description</span>
				</label>
				<div className="mt-1">
					<input
						type="text"
						name="description"
						id="description"
						value={formValues?.description}
						onChange={(e) =>
							setFormData({
								...formValues,
								description: e.target.value,
							})
						}
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
				</div>
			</div>
			<div className="col-span-5 md:col-span-2">
				<label
					htmlFor="quantity"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					<span> Qty</span>
				</label>
				<div className="mt-1">
					<input
						type="number"
						name="quantity"
						id="quantity"
						value={formValues?.quantity}
						onChange={(e) =>
							setFormData({
								...formValues,
								quantity: e.target.value,
							})
						}
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
				</div>
			</div>
			<div className="col-span-6 md:col-span-4">
				<label
					htmlFor="cost"
					className="flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					<span>Cost</span>
				</label>
				<div className="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						name="cost"
						id="cost"
						value={formValues?.cost}
						onChange={(e) =>
							setFormData({
								...formValues,
								cost: e.target.value,
							})
						}
						className="border-1 shadow-accent-300  block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50  bg-opacity-70 p-2.5 px-3  py-1 pr-12 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
						placeholder="0.00"
					/>
					<div className="pointer-events-none absolute inset-y-0 right-0 flex cursor-default items-center rounded-r-md border-l border-secondary-400/50 bg-secondary-300 px-2 pr-3">
						<span className="cursor-default text-secondary-50 sm:text-sm">
							{currency}
						</span>
					</div>
				</div>
			</div>
			<div className="col-span-1 flex w-full items-center justify-center md:col-span-full">
				<button
					onClick={handleAddService}
					className={`${isButtonDisabled() ? 'bg-slate-600' : 'bg-primary-600'} mt-5 rounded-md p-2 text-white`}
					disabled={isButtonDisabled()}
					type="button"
				>
					Add Service
				</button>
			</div>
		</div>
	);
}
