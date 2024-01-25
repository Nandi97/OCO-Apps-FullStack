export type Article = {
	id: string;
	title: string;
	content: string;
	url: string;
	tags: string;
	newsFeedId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
};

export type NewsFeed = {
	id: string;
	date: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	userId: string;
	articles: Article[];
	user: {
		id: string;
		name: string;
		email: string;
		mobile: string;
		ext: number;
		staffNo: number;
		avatarUrl: string;
		teamId: number;
		designationId: number;
		genderId: number;
		createdById: string | null;
		deletedAt: string | null;
		createdAt: string;
		updatedAt: string;
	};
};
