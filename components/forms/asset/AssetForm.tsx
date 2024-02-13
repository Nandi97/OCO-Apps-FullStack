import React from 'react';

const AssetForm = () => {
	return (
		<form className="p-4 w-full flex justify-center">
			<div className="grid grid-cols-12 divide-x-2 gap-2">
				<div className="md:col-span-4 col-span-full"></div>
				<div className="grid w-11/12 p-2 grid-cols-6  md:col-span-8 col-span-full gap-4">
					<div className="space-y-2 md:col-span-4 col-span-full">
						<label htmlFor="name">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Asset Name</span>
							</div>
							<div className="mt-1">
								<input
									id="name"
									placeholder="Name"
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
								/>
							</div>
						</label>
					</div>
					<div className="space-y-1.5 md:col-span-6 col-span-full">
						<label htmlFor="description">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Description</span>
							</div>
							<div className="mt-1">
								<textarea
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-20  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									id="description"
									placeholder="Description"
								/>
							</div>
						</label>
					</div>
					<div className="space-y-1.5 md:col-span-3 col-span-full">
						<label htmlFor="serial-number">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Serial Number</span>
							</div>
							<div className="mt-1">
								<input
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									id="serial-number"
									placeholder="Serial Number"
								/>
							</div>
						</label>
					</div>
					<div className="space-y-1.5 md:col-span-3 col-span-full">
						<label htmlFor="oco-tag-number">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">OCO Tag Number</span>
							</div>
							<div className="mt-1">
								<input
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									id="oco-tag-number"
									placeholder="OCO Tag Number"
								/>
							</div>
						</label>
					</div>
					<div className="space-y-1.5 md:col-span-3 col-span-full">
						<label htmlFor="location">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Location</span>
							</div>
							<div className="mt-1">
								<input
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									id="location"
									placeholder="Location"
								/>
							</div>
						</label>
					</div>
					<div className="space-y-1.5  md:col-span-3 col-span-full">
						<label htmlFor="purchase-date">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Purchase Date</span>
							</div>
							<div className="mt-1">
								<input
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									id="purchase-date"
									placeholder="Purchase Date"
									type="date"
								/>
							</div>
						</label>
					</div>
					<div className="space-y-1.5  md:col-span-2 col-span-full">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>Asset Type</span>
						</label>
						<select className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
							<option
								disabled
								value=""
								className="text-opacity-50 text-secondary-700"
							>
								--Asset Type--
							</option>
							<option value="laptop">Laptop</option>
							<option value="desktop">Desktop</option>
							<option value="mobile">Mobile</option>
							<option value="tablet">Tablet</option>
						</select>
					</div>
					<div className="space-y-1.5  md:col-span-2 col-span-full">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>Asset Category</span>
						</label>
						<select className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
							<option
								disabled
								value=""
								className="text-opacity-50 text-secondary-700"
							>
								--Asset Category--
							</option>
							<option value="1">Category 1</option>
							<option value="2">Category 2</option>
							<option value="3">Category 3</option>
							<option value="4">Category 4</option>
						</select>
					</div>
					<div className="space-y-1.5  md:col-span-2 col-span-full">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>Condition</span>
						</label>
						<select className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
							<option
								disabled
								value=""
								className="text-opacity-50 text-secondary-700"
							>
								--Asset Condition--
							</option>
							<option value="excellent">Excellent</option>
							<option value="good">Good</option>
							<option value="fair">Fair</option>
							<option value="poor">Poor</option>
						</select>
					</div>

					<div className="space-y-1.5  md:col-span-4 col-span-full">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>Currently With</span>
						</label>
						<select className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
							<option value="alice">Alice</option>
							<option value="bob">Bob</option>
							<option value="charlie">Charlie</option>
							<option value="dan">Dan</option>
						</select>
					</div>
				</div>
			</div>
		</form>
	);
};

export default AssetForm;
