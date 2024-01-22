export type Staff = {
	id: number;
	name: string;
	email: string;
	mobile: string;
	ext: number;
	staffNo: number;
	avatarUrl: string | null;
	teamId: number;
	team?: {
		id: number;
		name: string;
	};
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
