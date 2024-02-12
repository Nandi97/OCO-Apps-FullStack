/*
  Warnings:

  - You are about to drop the column `staffId` on the `CauseList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CauseList" DROP CONSTRAINT "CauseList_staffId_fkey";

-- AlterTable
ALTER TABLE "CauseList" DROP COLUMN "staffId";

-- AddForeignKey
ALTER TABLE "CauseList" ADD CONSTRAINT "CauseList_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
