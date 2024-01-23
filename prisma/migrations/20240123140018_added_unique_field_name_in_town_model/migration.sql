/*
  Warnings:

  - The primary key for the `Town` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Town` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_townId_fkey";

-- AlterTable
ALTER TABLE "PurchaseOrder" ALTER COLUMN "townId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Town" DROP CONSTRAINT "Town_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Town_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Town_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Town_name_key" ON "Town"("name");

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town"("id") ON DELETE SET NULL ON UPDATE CASCADE;
