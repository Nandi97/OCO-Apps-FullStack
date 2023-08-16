/*
  Warnings:

  - Made the column `matterId` on table `StopWatchItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StopWatchItem" DROP CONSTRAINT "StopWatchItem_matterId_fkey";

-- AlterTable
ALTER TABLE "StopWatchItem" ALTER COLUMN "matterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "StopWatchItem" ADD CONSTRAINT "StopWatchItem_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
