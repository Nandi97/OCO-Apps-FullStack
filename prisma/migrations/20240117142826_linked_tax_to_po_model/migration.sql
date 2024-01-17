/*
  Warnings:

  - You are about to drop the column `vatable` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Tax` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tax` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Tax` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rate]` on the table `Tax` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taxId` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "vatable",
ADD COLUMN     "taxId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tax" DROP COLUMN "value",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tax_name_key" ON "Tax"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tax_description_key" ON "Tax"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Tax_rate_key" ON "Tax"("rate");

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "Tax"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
