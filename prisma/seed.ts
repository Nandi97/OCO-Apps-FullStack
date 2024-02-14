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
import { getAssetCategories, getAssetConditions, getAssetTransactionTypes } from './seeders/assets';

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
	const assetCategories = getAssetCategories();
	const assetConditions = getAssetConditions();
	const assetTransactionTypes = getAssetTransactionTypes();
	try {
		// Menus
		for (const menu of menus) {
			const existingMenu = await prisma.menu.findUnique({ where: { name: menu.name } });
			if (!existingMenu) {
				const newData = await prisma.menu.create({ data: { ...menu } });
				console.log(`Created menu item: ${newData.name}`);
			} else {
				const updatedData = await prisma.menu.update({
					where: { id: existingMenu.id },
					data: { ...menu },
				});
				console.log(`Updated menu Item: ${updatedData.name}`);
			}
		}

		// Matters
		for (const matter of matters) {
			const existingMatter = await prisma.matter.findUnique({ where: { code: matter.code } });
			if (!existingMatter) {
				const newData = await prisma.matter.create({
					data: {
						...matter,
					},
				});
				console.log(`Created matter: ${newData.code}`);
			} else {
				const updatedData = await prisma.matter.update({
					where: { id: existingMatter.id },
					data: { ...matter },
				});
				console.log(`Updated matter: ${updatedData.code}`);
			}
		}

		//Taxes
		for (const tax of taxes) {
			const existingTax = await prisma.tax.findUnique({ where: { name: tax.name } });
			if (!existingTax) {
				const newData = await prisma.tax.create({
					data: {
						...tax,
					},
				});
				console.log(`Created tax type: ${newData.name}`);
			} else {
				const updatedData = await prisma.tax.update({
					where: { id: existingTax.id },
					data: { ...tax },
				});
				console.log(`Updated tax type: ${updatedData.name}`);
			}
		}

		// Genders
		for (const gender of genders) {
			const existing = await prisma.gender.findUnique({ where: { name: gender.name } });
			if (!existing) {
				const newData = await prisma.gender.create({
					data: {
						...gender,
					},
				});
				console.log(`Created gender: ${newData.name}`);
			} else {
				const updatedData = await prisma.gender.update({
					where: { id: existing.id },
					data: { ...gender },
				});
				console.log(`Updated gender: ${updatedData.name}`);
			}
		}

		// Towns
		for (const town of towns) {
			const existingTown = await prisma.town.findUnique({ where: { name: town.name } });
			if (!existingTown) {
				const newData = await prisma.town.create({
					data: {
						...town,
					},
				});
				console.log(`Created town: ${newData.name}`);
			} else {
				const updatedData = await prisma.town.update({
					where: { id: existingTown.id },
					data: { ...town },
				});
				console.log(`Updated town: ${updatedData.name}`);
			}
		}

		//Currencies
		for (const currency of currencies) {
			const existing = await prisma.currency.findUnique({ where: { name: currency.name } });
			if (!existing) {
				const newData = await prisma.currency.create({
					data: {
						...currency,
					},
				});
				console.log(`Created currency: ${newData.name}`);
			} else {
				const updatedData = await prisma.currency.update({
					where: { id: existing.id },
					data: { ...currency },
				});
				console.log(`Updated currency: ${updatedData.name}`);
			}
		}

		//Staff Types
		for (const staffType of staffTypes) {
			const existing = await prisma.staffType.findUnique({ where: { name: staffType.name } });
			if (!existing) {
				const newData = await prisma.staffType.create({
					data: {
						...staffType,
					},
				});
				console.log(`Created Staff Type: ${newData.name}`);
			} else {
				const updatedData = await prisma.staffType.update({
					where: { id: existing.id },
					data: { ...staffType },
				});
				console.log(`Updated Staff Type: ${updatedData.name}`);
			}
		}

		// Designation
		for (const designation of designations) {
			const existing = await prisma.designation.findUnique({
				where: { name: designation.name },
			});
			if (!existing) {
				const newData = await prisma.designation.create({
					data: {
						...designation,
					},
				});
				console.log(`Created Staff Designation: ${newData.name}`);
			} else {
				const updatedData = await prisma.designation.update({
					where: { id: existing.id },
					data: { ...designation },
				});
				console.log(`Updated Staff Designation: ${updatedData.name}`);
			}
		}

		// Teams
		for (const team of teams) {
			const existing = await prisma.team.findUnique({
				where: { name: team.name },
			});
			if (!existing) {
				const newData = await prisma.team.create({
					data: {
						...team,
					},
				});
				console.log(`Created Staff Teams: ${newData.name}`);
			} else {
				const updatedData = await prisma.team.update({
					where: { id: existing.id },
					data: { ...team },
				});
				console.log(`Updated Staff Teams: ${updatedData.name}`);
			}
		}

		const librarianEmail = 'asenath@oraro.co.ke';
		// Staff
		for (const staff of staffs) {
			const existing = await prisma.staff.findUnique({
				where: { email: staff.email },
			});
			if (!existing) {
				const newData = await prisma.staff.create({
					data: {
						...staff,
					},
				});
				console.log(`Created Staff: ${newData.name}`);
			} else {
				const updatedData = await prisma.staff.update({
					where: { id: existing.id },
					data: { ...staff },
				});
				console.log(`Updated Staff: ${updatedData.name}`);
			}
		}

		const librarian = await prisma.staff.findUnique({
			where: { email: librarianEmail },
		});

		if (librarian) {
			const userId = librarian.id;

			for (const book of books) {
				const existing = await prisma.book.findUnique({
					where: { title: book.title },
				});
				if (!existing) {
					const newData = await prisma.book.create({
						data: {
							...book,
							userId: userId,
						},
					});
					console.log(`Created Book: ${newData.title}`);
				} else {
					const updatedData = await prisma.book.update({
						where: { id: existing.id },
						data: { ...book, userId: userId },
					});
					console.log(`Created Book: ${updatedData.title}`);
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
				const newData = await prisma.stopWatchItemTask.create({
					data: {
						...stopWatchItemTask,
					},
				});
				console.log(`Created Stop Watch Task: ${newData.name}`);
			} else {
				const updatedData = await prisma.stopWatchItemTask.update({
					where: { id: existing.id },
					data: { ...stopWatchItemTask },
				});
				console.log(`Updated Stop Watch Task: ${updatedData.name}`);
			}
		}

		// Attendee Types
		for (const attendanceType of attendanceTypes) {
			const existing = await prisma.attendanceType.findUnique({
				where: { name: attendanceType.name },
			});
			if (!existing) {
				const newData = await prisma.attendanceType.create({
					data: {
						...attendanceType,
					},
				});
				console.log(`Created Meeting Attendee Type: ${newData.name}`);
			} else {
				const updatedData = await prisma.attendanceType.update({
					where: { id: existing.id },
					data: { ...attendanceType },
				});
				console.log(`Updated Meeting Attendee Type: ${updatedData.name}`);
			}
		}

		//Leave Types
		for (const leaveType of leaveTypes) {
			const existing = await prisma.leaveType.findUnique({
				where: { name: leaveType.name },
			});
			if (!existing) {
				const newData = await prisma.leaveType.create({
					data: {
						...leaveType,
					},
				});
				console.log(`Created Leave Type: ${newData.name}`);
			} else {
				const updatedData = await prisma.leaveType.update({
					where: { id: existing.id },
					data: { ...leaveType },
				});
				console.log(`Updated Leave Type: ${updatedData.name}`);
			}
		}

		//Asset Types
		for (const assetCategory of assetCategories) {
			const existing = await prisma.assetCategory.findUnique({
				where: { name: assetCategory.name },
			});
			if (!existing) {
				const newData = await prisma.assetCategory.create({
					data: {
						name: assetCategory.name,
						description: assetCategory.description,
						assetTypes: {
							createMany: {
								data: assetCategory.assetTypes.map((type: any) => ({
									name: type.name,
									description: type.description,
								})),
							},
						},
					},
				});
				console.log(`Created asset category: ${newData.name}`);
			} else {
				const updatedData = await prisma.assetCategory.update({
					where: { id: existing.id },
					data: {
						description: assetCategory.description,
						assetTypes: {
							deleteMany: {},
							createMany: {
								data: assetCategory.assetTypes.map((type: any) => ({
									name: type.name,
									description: type.description,
								})),
							},
						},
					},
				});
				console.log(`Updated asset category: ${updatedData.name}`);
			}
		}

		//Asset Conditions
		for (const assetCondition of assetConditions) {
			const existing = await prisma.assetCondition.findUnique({
				where: { name: assetCondition.name },
			});
			if (!existing) {
				const newData = await prisma.assetCondition.create({
					data: {
						...assetCondition,
					},
				});
				console.log(`Created asset condition: ${newData.name}`);
			} else {
				const updatedData = await prisma.assetCondition.update({
					where: { id: existing.id },
					data: { ...assetCondition },
				});
				console.log(`Updated asset condition: ${updatedData.name}`);
			}
		}

		//Asset Transaction Types
		for (const assetTransactionType of assetTransactionTypes) {
			const existing = await prisma.assetTransactionType.findUnique({
				where: { name: assetTransactionType.name },
			});
			if (!existing) {
				const newData = await prisma.assetTransactionType.create({
					data: {
						...assetTransactionType,
					},
				});
				console.log(`Created asset transaction types: ${newData.name}`);
			} else {
				const updatedData = await prisma.assetTransactionType.update({
					where: { id: existing.id },
					data: { ...assetTransactionType },
				});
				console.log(`Updated asset transaction types: ${updatedData.name}`);
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
