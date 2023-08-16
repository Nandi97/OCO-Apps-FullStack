/*
  Warnings:

  - Made the column `stopWatchItemTaskId` on table `StopWatchItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StopWatchItem" DROP CONSTRAINT "StopWatchItem_stopWatchItemTaskId_fkey";

-- AlterTable
ALTER TABLE "StopWatchItem" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "stopWatchItemTaskId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "StopWatchItem" ADD CONSTRAINT "StopWatchItem_stopWatchItemTaskId_fkey" FOREIGN KEY ("stopWatchItemTaskId") REFERENCES "StopWatchItemTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
