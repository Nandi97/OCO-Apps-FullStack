/*
  Warnings:

  - You are about to drop the column `cover_url` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `isbn_issn` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publication_year` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `staff_id` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `staff_type_id` on the `Designation` table. All the data in the column will be lost.
  - You are about to drop the column `list_order` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `designation_id` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `gender_id` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `staff_no` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `StaffType` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `StaffType` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SubMenu` table. All the data in the column will be lost.
  - You are about to drop the column `list_order` on the `SubMenu` table. All the data in the column will be lost.
  - You are about to drop the column `menu_id` on the `SubMenu` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `SubMenu` table. All the data in the column will be lost.
  - Added the required column `isbnIssn` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationYear` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffTypeId` to the `Designation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listOrder` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designationId` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genderId` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffNo` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listOrder` to the `SubMenu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuId` to the `SubMenu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "Designation" DROP CONSTRAINT "Designation_staff_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_designation_id_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_gender_id_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_team_id_fkey";

-- DropForeignKey
ALTER TABLE "SubMenu" DROP CONSTRAINT "SubMenu_menu_id_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "cover_url",
DROP COLUMN "deleted_at",
DROP COLUMN "isbn_issn",
DROP COLUMN "media_type",
DROP COLUMN "publication_year",
DROP COLUMN "staff_id",
ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(0),
ADD COLUMN     "isbnIssn" TEXT NOT NULL,
ADD COLUMN     "mediaType" TEXT NOT NULL,
ADD COLUMN     "publicationYear" INTEGER NOT NULL,
ADD COLUMN     "staffId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Designation" DROP COLUMN "staff_type_id",
ADD COLUMN     "staffTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "list_order",
ADD COLUMN     "listOrder" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "avatar_url",
DROP COLUMN "deleted_at",
DROP COLUMN "designation_id",
DROP COLUMN "gender_id",
DROP COLUMN "staff_no",
DROP COLUMN "team_id",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(0),
ADD COLUMN     "designationId" INTEGER NOT NULL,
ADD COLUMN     "genderId" INTEGER NOT NULL,
ADD COLUMN     "staffNo" INTEGER NOT NULL,
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StaffType" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(0),
ADD COLUMN     "updatedAt" TIMESTAMP(0);

-- AlterTable
ALTER TABLE "SubMenu" DROP COLUMN "created_at",
DROP COLUMN "list_order",
DROP COLUMN "menu_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(0),
ADD COLUMN     "listOrder" INTEGER NOT NULL,
ADD COLUMN     "menuId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(0);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_staffTypeId_fkey" FOREIGN KEY ("staffTypeId") REFERENCES "StaffType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubMenu" ADD CONSTRAINT "SubMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
