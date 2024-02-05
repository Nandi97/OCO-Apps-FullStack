/*
  Warnings:

  - You are about to drop the column `createdById` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_createdById_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "createdById",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
