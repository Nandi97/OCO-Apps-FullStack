-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "currentlyWithId" TEXT;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_currentlyWithId_fkey" FOREIGN KEY ("currentlyWithId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
