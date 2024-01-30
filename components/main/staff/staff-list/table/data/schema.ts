import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const staffSchema = z.object({
	id: z.string(),
	name: z.string(),
	designation: z.object({ id: z.number(), name: z.string() }),
	email: z.string(),
	ext: z.string(),
	team: z.object({ id: z.number(), name: z.string() }),
	status: z.string(),
	deletedAt: z.string().nullable(),
});

export type Staff = z.infer<typeof staffSchema>;
