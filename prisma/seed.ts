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

	// Menus
	for (const menu of menus) {
		await prisma.menu.create({
			data: {
				name: menu.name,
				url: menu.url,
				icon: menu.icon,
				listOrder: menu.listOrder,
			},
		});
	}

	// Matters
	for (const matter of matters) {
		await prisma.matter.create({
			data: {
				code: matter.code,
				description: matter.description,
			},
		});
	}

	//Taxes
	for (const tax of taxes) {
		await prisma.tax.create({
			data: {
				name: tax.name,
				value: tax.value,
				rate: tax.rate,
				deletedAt: null,
			},
		});
	}

	// Genders
	for (const gender of genders) {
		await prisma.gender.create({
			data: {
				name: gender.name,
			},
		});
	}

	// Towns
	for (const town of towns) {
		await prisma.town.create({
			data: {
				name: town.name,
			},
		});
	}

	//Currencies
	for (const currency of currencies) {
		await prisma.currency.create({
			data: {
				name: currency.name,
				initial: currency.initial,
			},
		});
	}

	//Staff Types
	for (const staffType of staffTypes) {
		await prisma.staffType.create({
			data: {
				name: staffType.name,
			},
		});
	}

	// Designation
	for (const designation of designations) {
		await prisma.designation.create({
			data: {
				name: designation.name,
				staffTypeId: designation.staffTypeId,
			},
		});
	}

	// Teams
	for (const team of teams) {
		await prisma.team.create({
			data: {
				name: team.name,
			},
		});
	}

	// Staff
	for (const staff of staffs) {
		await prisma.staff.create({
			data: {
				ext: staff.ext,
				email: staff.email,
				mobile: staff.mobile,
				name: staff.name,
				staffNo: staff.staffNo,
				avatarUrl: staff.avatarUrl,
				teamId: staff.teamId,
				designationId: staff.designationId,
				genderId: staff.genderId,
				deletedAt: staff.deletedAt,
			},
		});
	}

	const librarianEmail = 'asenath@oraro.co.ke';

	const librarian = await prisma.staff.findUnique({
		where: { email: 'asenath@oraro.co.ke' },
	});

	if (librarian) {
		const staffId = librarian.id;

		for (const book of books) {
			await prisma.book.create({
				data: {
					author: book.author,
					copies: book.copies,
					createdAt: book.createdAt,
					edition: book.edition,
					isbnIssn: book.isbnIssn,
					staffId: staffId, // Set the staffId to the found staff member's ID
					mediaType: book.mediaType,
					publicationYear: book.publicationYear,
					publisher: book.publisher,
					status: book.status,
					subject: book.subject,
					title: book.title,
					coverUrl: book.coverUrl,
					updatedAt: book.updatedAt,
				},
			});
		}
	} else {
		console.error(`No staff found with the email: ${librarianEmail}`);
	}

	// Stop Watch Item Tasks
	for (const stopWatchItemTask of stopWatchItemTasks) {
		await prisma.stopWatchItemTask.create({
			data: { name: stopWatchItemTask.name },
		});
	}

	// Attendee Types
	for (const attendanceType of attendanceTypes) {
		await prisma.attendanceType.create({
			data: {
				name: attendanceType.name,
				description: attendanceType.description,
			},
		});
	}

	console.log('Menus seeded successfully.');
}

main()
	.catch((error) => {
		console.error('Error seeding menus:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
