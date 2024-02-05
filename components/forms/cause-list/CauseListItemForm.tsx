import React from 'react';

const CauseListItemForm = () => {
    
	const isVirtual = [
		{ id: 1, name: 'YES' },
		{ id: 2, name: 'NO' },
	];
	return (
		<>
			<div className="md:col-span-4 col-span-6">
				<label className="form-control w-full max-w-xs ">
					<div className="block text-sm font-medium text-secondary-700">
						<span className="label-text">Coram</span>
					</div>
					<input
						type="text"
						placeholder="Coram"
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					/>
				</label>
			</div>
			<div className="md:col-span-2 col-span-6">
				<label className="form-control w-full max-w-xs ">
					<div className="block text-sm font-medium text-secondary-700">
						<span className="label-text">Virtual</span>
					</div>
					<select className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
						<option
							selected
							disabled
							value=""
							className="text-opacity-50 text-secondary-700"
						>
							--Is Virtual?--
						</option>

						{isVirtual?.map((item) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</label>
			</div>
			<div className="col-span-6">
				<label className="form-control w-full max-w-xs ">
					<div className="block text-sm font-medium text-secondary-700">
						<span className="label-text">Case No. & Parties</span>
					</div>
					<textarea
						placeholder="Case No. & Parties"
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-20  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					/>
				</label>
			</div>
		</>
	);
};

export default CauseListItemForm;
