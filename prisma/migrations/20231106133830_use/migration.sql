/*
  Warnings:

  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Currency` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Designation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Designation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Gender` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Gender` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Matter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Matter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Menu` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `townId` column on the `PurchaseOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StaffType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `StaffType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StopWatchItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `StopWatchItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Town` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Town` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `staffTypeId` on the `Designation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currencyId` on the `PurchaseOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `teamId` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `designationId` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `genderId` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `matterId` on the `StopWatchItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Designation" DROP CONSTRAINT "Designation_staffTypeId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_townId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_designationId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_genderId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_teamId_fkey";

-- DropForeignKey
ALTER TABLE "StopWatchItem" DROP CONSTRAINT "StopWatchItem_matterId_fkey";

-- AlterTable
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Designation" DROP CONSTRAINT "Designation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "staffTypeId",
ADD COLUMN     "staffTypeId" INTEGER NOT NULL,
ADD CONSTRAINT "Designation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Gender" DROP CONSTRAINT "Gender_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Gender_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Matter" DROP CONSTRAINT "Matter_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Matter_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "currencyId",
ADD COLUMN     "currencyId" INTEGER NOT NULL,
DROP COLUMN "townId",
ADD COLUMN     "townId" INTEGER;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER NOT NULL,
DROP COLUMN "designationId",
ADD COLUMN     "designationId" INTEGER NOT NULL,
DROP COLUMN "genderId",
ADD COLUMN     "genderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StaffType" DROP CONSTRAINT "StaffType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StaffType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StopWatchItem" DROP CONSTRAINT "StopWatchItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "matterId",
ADD COLUMN     "matterId" INTEGER NOT NULL,
ADD CONSTRAINT "StopWatchItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Town" DROP CONSTRAINT "Town_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Town_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_staffTypeId_fkey" FOREIGN KEY ("staffTypeId") REFERENCES "StaffType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopWatchItem" ADD CONSTRAINT "StopWatchItem_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town"("id") ON DELETE SET NULL ON UPDATE CASCADE;
