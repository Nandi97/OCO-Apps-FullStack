export type PurchaseOrder = {
	id: number;
	poNumber: string;
	type: string;
	vatable: boolean;
	currencyId: number;
	name: string;
	email: string;
	phoneNumber: string;
	physicalAddress: string;
	approverId: number;
	createdById: string;
	townId: number;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	totalAmount: number;
	deletedAt: string | null;
	createdAt: string;
	approvedOn: string | null;
	purchaseItems: {
		id: number;
		description: string;
		quantity: number;
		cost: number;
		purchaseOrderId: number;
		deletedAt: string | null;
		createdAt: string;
		updatedAt: string;
	}[];

	approver: {
		id: number;
		name: string;
		email: string;
		mobile: string;
		ext: number;
		staffNo: number;
		avatarUrl: string;
		teamId: number;
		designationId: number;
		genderId: number;
		deletedAt: string | null;
	};
	creator: {
		id: string;
		name: string;
		email: string;
		emailVerified: null;
		image: string;
	};
	currency: {
		id: number;
		name: string;
		initial: string;
	};
	town: {
		id: number;
		name: string;
	};
};
