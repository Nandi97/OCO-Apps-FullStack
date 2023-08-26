/*
  Warnings:

  - A unique constraint covering the columns `[poNumber]` on the table `PurchaseOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `poNumber` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "poNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_poNumber_key" ON "PurchaseOrder"("poNumber");
