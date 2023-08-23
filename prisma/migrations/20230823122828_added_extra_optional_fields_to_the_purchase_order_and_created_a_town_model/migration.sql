/*
  Warnings:

  - You are about to drop the column `vendorAddress` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `vendorEmail` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `vendorName` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `vendorPhoneNumber` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `vendorType` on the `PurchaseOrder` table. All the data in the column will be lost.
  - Added the required column `email` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalAddress` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "vendorAddress",
DROP COLUMN "vendorEmail",
DROP COLUMN "vendorName",
DROP COLUMN "vendorPhoneNumber",
DROP COLUMN "vendorType",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "physicalAddress" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "totalAmount" INTEGER NOT NULL,
ADD COLUMN     "townId" INTEGER,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Town" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Town_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town"("id") ON DELETE SET NULL ON UPDATE CASCADE;
