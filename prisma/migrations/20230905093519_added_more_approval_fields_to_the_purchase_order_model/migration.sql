-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "approvedOn" TIMESTAMP(3),
ADD COLUMN     "status" BOOLEAN DEFAULT false;
