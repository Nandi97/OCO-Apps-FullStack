/*
  Warnings:

  - Added the required column `staffId` to the `CauseList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CauseList" ADD COLUMN     "creatorId" TEXT,
ADD COLUMN     "staffId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CauseList" ADD CONSTRAINT "CauseList_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
