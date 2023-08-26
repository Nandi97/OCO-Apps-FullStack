'use client';
import { PurchaseOrder } from '@/pages/types/PurchaseOrder';
import { URL } from '@/pages/types/URL';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/purchase-order/${slug}`);
	return response.data;
};

export default function PurchaseOrder(url: URL) {
	const { data: purchaseOrder } = useQuery<PurchaseOrder>({
		queryKey: ['detailPurchaseOrder'],
		queryFn: () => fetchDetails(url.params.slug),
	});

	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">
					{purchaseOrder?.poNumber}
				</h1>
				<div className="inline-flex items-center space-x-2"></div>
			</div>
		</div>
	);
}
