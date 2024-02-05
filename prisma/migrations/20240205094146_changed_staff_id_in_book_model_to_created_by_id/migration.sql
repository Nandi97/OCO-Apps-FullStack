/*
  Warnings:

  - You are about to drop the column `staffId` on the `Book` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_staffId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "staffId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
