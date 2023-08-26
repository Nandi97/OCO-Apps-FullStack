-- AlterTable
ALTER TABLE "StopWatchItem" ADD COLUMN     "matterId" INTEGER;

-- AddForeignKey
ALTER TABLE "StopWatchItem" ADD CONSTRAINT "StopWatchItem_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
