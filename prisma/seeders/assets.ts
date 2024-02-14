export function getAssetCategories() {
	// Seed data for asset types
	return [
		{
			name: 'Computer',
			description: 'Electronic devices used for processing data.',
			assetTypes: [
				{ name: 'Desktop', description: 'Stationary computer system.' },
				{ name: 'Laptop', description: 'Portable computer system.' },
			],
		},
		{
			name: 'Furniture',
			description: 'Functional items that can be moved or rearranged.',
			assetTypes: [
				{ name: 'Chair', description: 'A seat with a back, for one person.' },
				{
					name: 'Desk',
					description: 'A piece of furniture with a flat or sloped surface.',
				},
			],
		},
		{
			name: 'Vehicle',
			description: 'Motorized machines used for transportation.',
			assetTypes: [
				{
					name: 'Car',
					description: 'A four-wheeled motor vehicle used for transportation.',
				},
				{
					name: 'Truck',
					description: 'A large, heavy motor vehicle used for transporting goods.',
				},
			],
		},
		// Add more asset types as needed
	];
}

export function getAssetConditions() {
	// Seed data for asset types
	return [
		{ name: 'New', description: 'Brand new, never used.' },
		{ name: 'Good', description: 'In good condition, minor wear and tear.' },
		{ name: 'Fair', description: 'In fair condition, noticeable wear and tear.' },
		{ name: 'Poor', description: 'In poor condition, significant damage or malfunction.' },
		// Add more asset conditions as needed
	];
}

export function getAssetTransactionTypes() {
	return [
		{ name: 'Purchase', description: 'Acquiring an asset by paying a price for it.' },
		{ name: 'Transfer', description: 'Moving an asset from one location or owner to another.' },
		{ name: 'Maintenance', description: 'Performing maintenance or repairs on an asset.' },
		{ name: 'Disposal', description: 'Getting rid of an asset that is no longer needed.' },
	];
}
