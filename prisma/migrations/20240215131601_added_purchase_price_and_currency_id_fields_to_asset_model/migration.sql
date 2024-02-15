-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "currencyId" INTEGER,
ADD COLUMN     "purchasePrice" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
