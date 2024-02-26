export type Team = {
	id: number;
	name: string;
};

export type Currency = {
	id: number;
	name: string;
	initial: string;

	//   purchaseOrders PurchaseOrder[]
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
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
	leaveBalance: LeaveBalance;
	deletedAt: string | Date | null;
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
	deletedAt: string | Date | null;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
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
	deletedAt: string | Date | null;
	createdAt: string | Date | null;
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
	createdAt: string | Date | null;
};

export type AssetTransactionType = {
	id: string;
	name: string;
	description: string;

	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;
	// assetTransaction: AssetTransaction[];
};

export type AssetType = {
	id: string;
	name: string;
	description: string;
	assetCategoryId: string;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;
	asset: Asset[];
};

export type AssetCategory = {
	id: string;
	name: string;
	description: string;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;
	assetTypes: AssetType[];
};

export type AssetCondition = {
	id: string;
	name: string;
	description: string;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;
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

	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;

	type: AssetType;
	condition: AssetCondition;
	currentlyWith: Staff;
	createdBy: Staff;
	currency: Currency;
};

export type LeaveBalance = {
	id: string;
	staffNo: number;
	annualEntitlement: number;
	balanceBroughtForward: number;
	earned: number;
	taken: number;
	sold: number;
	forfeited: number;
	balanceCarryForward: number;
	deletedAt: string | Date | null;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
};
export type LeaveSupervisorApproval = {
	id: string;
	leaveApplicationId: string;
	comments: string;
	status: number;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;
};
export type LeaveFinalApproval = {
	id: string;
	leaveApplicationId: string;
	comments: string;
	status: number;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;
};
export type LeaveHRMApproval = {
	id: string;
	leaveApplicationId: string;
	comments: string;
	status: number;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;
};
export type LeaveType = {
	id: string;
	name: string;
	description: string;
	deletedAt: string | Date | null;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
};

export type LeaveApplication = {
	id: string;
	employeeId: string;
	leaveTypeId: string;
	duration: number;
	startDate: string;
	endDate: string;
	reportDate: string;
	supervisorId: string;
	finalApproverId: string;
	approvingHRMId: string;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string | Date | null;
	employee: Staff;
	supervisor: Staff;
	humanResource: Staff;
	finalApprover: Staff;
	type: LeaveType;
	leaveSupervisorApproval: LeaveSupervisorApproval;
	leaveFinalApproval: LeaveFinalApproval;
	leaveHRMApproval: LeaveHRMApproval;
};
