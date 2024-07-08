export type Id = string | number;

export type ProjectTag = {
	id: Id;
	name: string;
	colour: string;
	description: string;

	createdAt: Date | null;
	updatedAt: Date | null;
	deletedAt: Date | null;

	projects: Project[];
};

export type Project = {
	id: Id;
	title: string;
	description: string;
	startDate: Date | null;
	endDate: Date | null;
	reminderDates: Date | null;

	createdAt: Date | null;
	updatedAt: Date | null;
	deletedAt: Date | null;

	projectTag: ProjectTag;
	projectTagId: number;

	//   projectLead   Staff? @relation(fields: [projectLeadId], references: [id])
	//   projectLeadId :string
};
