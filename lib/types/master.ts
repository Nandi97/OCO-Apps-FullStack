export type Team = {
	id: number;
	name: string;
};

export type Staff = {
	id: number;
	name: string;
	email: string;
	mobile: string;
	ext: number;
	staffNo: number;
	avatarUrl: string | null;
	teamId: number;
	team?: Team;
	designationId: number;
	designation?: {
		id: number;
		name: string;
		staffTypeId: number;
		staffType?: {
			id: number;
			name: string;
		};
	};
	genderId: number;
	gender?: {
		id: number;
		name: string;
	};
	deletedAt: string | null;
};

export type Links = {
	url: string | null;
	label: string;
	active: boolean;
};

export type StaffData = {
	data: Staff[];
	total: number;
	links: Links[];
	firstPageUrl?: string;
	lastPageUrl?: string;
	from: number;
	to: number;
};

export type PurchaseItem = {
	id: number;
	description: string;
	quantity: number;
	cost: number;
	purchaseOrderId: number;
	deletedAt: string | null;
	createdAt: string;
	updatedAt: string;
};

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
	purchaseItems: PurchaseItem[];
	approver: Staff;
	creator: {
		id: string;
		name: string;
		email: string;
		emailVerified: null;
		image: string;
	};
	currency: Currency;
	town: Town;
};

export type Town = {
	id: number;
	name: string;
};

export type Currency = {
	id: number;
	name: string;
	initial: string;
};
export type Tax = {
	id: string;
	name: string;
	description: string;
	rate: number;
};

export type CauseListCase = {
	coram: string;
	virtual: number;
	url: string;
	case: string;
	advocates: Staff[];
};
export type CauseList = {
	team: Team;
	date: string;
	cases: CauseListCase[];
};
