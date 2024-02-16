-- AlterTable
ALTER TABLE "AssetTransaction" ADD COLUMN     "createdById" TEXT;

-- AddForeignKey
ALTER TABLE "AssetTransaction" ADD CONSTRAINT "AssetTransaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
