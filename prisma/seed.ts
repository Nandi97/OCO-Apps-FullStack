import { PrismaClient } from '@prisma/client';
import { getMenus } from './seeders/menus';
import { getMatters } from './seeders/matters';
import { getGenders } from './seeders/genders';
import { getStaffTypes } from './seeders/staffTypes';
import { getDesignations } from './seeders/designations';
import { getTeams } from './seeders/teams';
import { getStaff } from './seeders/staff';
import { getBooks } from './seeders/books';
import { getStopWatchItemTasks } from './seeders/stopWatchItemTasks';
import { getCurrencies } from './seeders/currencies';
import { getTowns } from './seeders/towns';
import { getAttendanceTypes } from './seeders/attendeeTypes';
import { getTax } from './seeders/tax';
import { getLeaveTypes } from './seeders/leaveTypes';
import {
	getAssetCategories,
	getAssetConditions,
	getAssetTransactionTypes,
	getAssetTypes,
} from './seeders/assets';

const prisma = new PrismaClient();

async function main() {
	const menus = getMenus();
	const matters = getMatters();
	const genders = getGenders();
	const taxes = getTax();
	const towns = getTowns();
	const currencies = getCurrencies();
	const staffTypes = getStaffTypes();
	const books = getBooks();
	const designations = getDesignations();
	const teams = getTeams();
	const staffs = getStaff();
	const stopWatchItemTasks = getStopWatchItemTasks();
	const attendanceTypes = getAttendanceTypes();
	const leaveTypes = getLeaveTypes();
	const assetTypes = getAssetTypes();
	const assetCategories = getAssetCategories();
	const assetConditions = getAssetConditions();
	const assetTransactionTypes = getAssetTransactionTypes();
	try {
		// Menus
		for (const menu of menus) {
			const existingMenu = await prisma.menu.findUnique({ where: { name: menu.name } });
			if (!existingMenu) {
				await prisma.menu.create({ data: { ...menu } });
			} else {
				await prisma.menu.update({ where: { id: existingMenu.id }, data: { ...menu } });
			}
		}

		// Matters
		for (const matter of matters) {
			const existingMatter = await prisma.matter.findUnique({ where: { code: matter.code } });
			if (!existingMatter) {
				await prisma.matter.create({
					data: {
						...matter,
					},
				});
			} else {
				await prisma.matter.update({
					where: { id: existingMatter.id },
					data: { ...matter },
				});
			}
		}

		//Taxes
		for (const tax of taxes) {
			const existingTax = await prisma.tax.findUnique({ where: { name: tax.name } });
			if (!existingTax) {
				await prisma.tax.create({
					data: {
						...tax,
					},
				});
			} else {
				await prisma.tax.update({
					where: { id: existingTax.id },
					data: { ...tax },
				});
			}
		}

		// Genders
		for (const gender of genders) {
			const existing = await prisma.gender.findUnique({ where: { name: gender.name } });
			if (!existing) {
				await prisma.gender.create({
					data: {
						...gender,
					},
				});
			} else {
				await prisma.gender.update({
					where: { id: existing.id },
					data: { ...gender },
				});
			}
		}

		// Towns
		for (const town of towns) {
			const existingTown = await prisma.town.findUnique({ where: { name: town.name } });
			if (!existingTown) {
				await prisma.town.create({
					data: {
						...town,
					},
				});
			} else {
				await prisma.town.update({
					where: { id: existingTown.id },
					data: { ...town },
				});
			}
		}

		//Currencies
		for (const currency of currencies) {
			const existing = await prisma.currency.findUnique({ where: { name: currency.name } });
			if (!existing) {
				await prisma.currency.create({
					data: {
						...currency,
					},
				});
			} else {
				await prisma.currency.update({
					where: { id: existing.id },
					data: { ...currency },
				});
			}
		}

		//Staff Types
		for (const staffType of staffTypes) {
			const existing = await prisma.staffType.findUnique({ where: { name: staffType.name } });
			if (!existing) {
				await prisma.staffType.create({
					data: {
						...staffType,
					},
				});
			} else {
				await prisma.staffType.update({
					where: { id: existing.id },
					data: { ...staffType },
				});
			}
		}

		// Designation
		for (const designation of designations) {
			const existing = await prisma.designation.findUnique({
				where: { name: designation.name },
			});
			if (!existing) {
				await prisma.designation.create({
					data: {
						...designation,
					},
				});
			} else {
				await prisma.designation.update({
					where: { id: existing.id },
					data: { ...designation },
				});
			}
		}

		// Teams
		for (const team of teams) {
			const existing = await prisma.team.findUnique({
				where: { name: team.name },
			});
			if (!existing) {
				await prisma.team.create({
					data: {
						...team,
					},
				});
			} else {
				await prisma.team.update({
					where: { id: existing.id },
					data: { ...team },
				});
			}
		}

		const librarianEmail = 'asenath@oraro.co.ke';
		// Staff
		for (const staff of staffs) {
			const existing = await prisma.staff.findUnique({
				where: { email: staff.email },
			});
			if (!existing) {
				await prisma.staff.create({
					data: {
						...staff,
					},
				});
			} else {
				await prisma.staff.update({
					where: { id: existing.id },
					data: { ...staff },
				});
			}
		}

		const librarian = await prisma.staff.findUnique({
			where: { email: 'asenath@oraro.co.ke' },
		});

		if (librarian) {
			const userId = librarian.id;

			for (const book of books) {
				const existing = await prisma.book.findUnique({
					where: { title: book.title },
				});
				if (!existing) {
					await prisma.book.create({
						data: {
							...book,
							userId: userId,
						},
					});
				} else {
					await prisma.book.update({
						where: { id: existing.id },
						data: { ...book, userId: userId },
					});
				}
			}
		} else {
			console.error(`No staff found with the email: ${librarianEmail}`);
		}

		// Stop Watch Item Tasks
		for (const stopWatchItemTask of stopWatchItemTasks) {
			const existing = await prisma.stopWatchItemTask.findUnique({
				where: { name: stopWatchItemTask.name },
			});
			if (!existing) {
				await prisma.stopWatchItemTask.create({
					data: {
						...stopWatchItemTask,
					},
				});
			} else {
				await prisma.stopWatchItemTask.update({
					where: { id: existing.id },
					data: { ...stopWatchItemTask },
				});
			}
		}

		// Attendee Types
		for (const attendanceType of attendanceTypes) {
			const existing = await prisma.attendanceType.findUnique({
				where: { name: attendanceType.name },
			});
			if (!existing) {
				await prisma.attendanceType.create({
					data: {
						...attendanceType,
					},
				});
			} else {
				await prisma.attendanceType.update({
					where: { id: existing.id },
					data: { ...attendanceType },
				});
			}
		}

		//Leave Types
		for (const leaveType of leaveTypes) {
			const existing = await prisma.leaveType.findUnique({
				where: { name: leaveType.name },
			});
			if (!existing) {
				await prisma.leaveType.create({
					data: {
						...leaveType,
					},
				});
			} else {
				await prisma.leaveType.update({
					where: { id: existing.id },
					data: { ...leaveType },
				});
			}
		}

		//Asset Types
		for (const assetType of assetTypes) {
			const existing = await prisma.assetType.findUnique({
				where: { name: assetType.name },
			});
			if (!existing) {
				await prisma.assetType.create({
					data: {
						...assetType,
					},
				});
			} else {
				await prisma.assetType.update({
					where: { id: existing.id },
					data: { ...assetType },
				});
			}
		}

		//Asset Types
		for (const assetCategory of assetCategories) {
			const existing = await prisma.assetCategory.findUnique({
				where: { name: assetCategory.name },
			});
			if (!existing) {
				await prisma.assetCategory.create({
					data: {
						...assetCategory,
					},
				});
			} else {
				await prisma.assetCategory.update({
					where: { id: existing.id },
					data: { ...assetCategory },
				});
			}
		}

		//Asset Conditions
		for (const assetCondition of assetConditions) {
			const existing = await prisma.assetCondition.findUnique({
				where: { name: assetCondition.name },
			});
			if (!existing) {
				await prisma.assetCondition.create({
					data: {
						...assetCondition,
					},
				});
			} else {
				await prisma.assetCondition.update({
					where: { id: existing.id },
					data: { ...assetCondition },
				});
			}
		}

		//Asset Transaction Types
		for (const assetTransactionType of assetTransactionTypes) {
			const existing = await prisma.assetTransactionType.findUnique({
				where: { name: assetTransactionType.name },
			});
			if (!existing) {
				await prisma.assetTransactionType.create({
					data: {
						...assetTransactionType,
					},
				});
			} else {
				await prisma.assetTransactionType.update({
					where: { id: existing.id },
					data: { ...assetTransactionType },
				});
			}
		}

		console.log('Seeder execution completed successfully.');
	} catch (error) {
		console.error('Error occurred during seeding:', error);
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error) => {
	console.error('Unhandled error in seeder:', error);
	process.exit(1);
});
