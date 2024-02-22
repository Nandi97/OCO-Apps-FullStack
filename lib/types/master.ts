export type Team = {
	id: number;
	name: string;
};

export type Currency = {
	id: number;
	name: string;
	initial: string;

	//   purchaseOrders PurchaseOrder[]
	createdAt: string;
	updatedAt: string;
	asset: Asset[];
};

export type Staff = {
	id: string;
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

export type LeaveType = {
	id: string;
	name: string;
	description: string;

	deletedAt: string;
	createdAt: string;
	updatedAt: string;

	//   leaveApplication LeaveApplication[]
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

export type Tax = {
	id: string;
	name: string;
	description: string;
	rate: number;
};

export type CauseListCase = {
	id: string;
	coram: string;
	virtual: number;
	url: string;
	case: string;
	advocates: Staff[];
};
export type CauseList = {
	id: string;
	createdBy: Staff;
	team: Team;
	date: string;
	cases: CauseListCase[];
	createdAt: string;
};

export type AssetTransactionType = {
	id: string;
	name: string;
	description: string;

	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	// assetTransaction: AssetTransaction[];
};

export type AssetType = {
	id: string;
	name: string;
	description: string;
	assetCategoryId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	asset: Asset[];
};

export type AssetCategory = {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	assetTypes: AssetType[];
};

export type AssetCondition = {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	asset: Asset[];
};

export type Asset = {
	id: string;
	name: string;
	imageUrl: string;
	description: string;
	serialNumber: string;
	ocoTagNumber: string;
	location: string;
	purchaseDate: string;
	purchasePrice: number;
	currencyId: number;
	typeId: string;
	conditionId: string;
	currentlyWithId: string;
	createdById: string;

	createdAt: string;
	updatedAt: string;
	deletedAt: string;

	type: AssetType;
	condition: AssetCondition;
	currentlyWith: Staff;
	createdBy: Staff;
	currency: Currency;
};
