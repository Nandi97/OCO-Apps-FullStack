import { PrismaClient } from '@prisma/client';
import { getMenus } from './seeders/menus';
import { getSubMenus } from './seeders/subMenus';
import { getBooks } from './seeders/books';
import { getGenders } from './seeders/genders';
import { getStaffTypes } from './seeders/staffTypes';
import { getDesignations } from './seeders/designations';
import { getTeams } from './seeders/teams';
import { getStaff } from './seeders/staff';

const prisma = new PrismaClient();

async function main() {
	const menus = getMenus();
	const subMenus = getSubMenus();
	const genders = getGenders();
	const staffTypes = getStaffTypes();
	const books = getBooks();
	const designations = getDesignations();
	const teams = getTeams();
	const staffs = getStaff();

	// Menus
	for (const menu of menus) {
		await prisma.menu.create({
			data: {
				name: menu.name,
				url: menu.url,
				icon: menu.icon,
				listOrder: menu.list_order,
			},
		});
	}

	// Sub Menus
	for (const subMenu of subMenus) {
		await prisma.subMenu.create({
			data: {
				name: subMenu.name,
				url: subMenu.url,
				icon: subMenu.icon,
				listOrder: subMenu.list_order,
				menuId: subMenu.menu_id,
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

	// Books
	for (const book of books) {
		await prisma.book.create({
			data: {
				author: book.author,
				copies: book.copies,
				createdAt: book.createdAt,
				edition: book.edition,
				isbnIssn: book.isbnIssn,
				staffId: book.staffId,
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

	console.log('Menus seeded successfully.');
}

main()
	.catch((error) => {
		console.error('Error seeding menus:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
