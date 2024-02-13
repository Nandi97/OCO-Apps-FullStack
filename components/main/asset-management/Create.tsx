import AssetForm from '@/components/forms/asset/AssetForm';
import React from 'react';

const Create = () => {
	return (
		<div className="w-3/4 bg-primary-50 rounded-md shadow-md">
			<div className="w-full flex flex-col items-center text-secondary-700 justify-center space-y-2">
				<h1 className="text-2xl font-bold">Asset Details</h1>
				<h2 className="text-xl font-semibold">Enter the asset details below.</h2>
			</div>
			<AssetForm />
		</div>
	);
};

export default Create;
