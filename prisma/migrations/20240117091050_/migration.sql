/*
  Warnings:

  - You are about to drop the column `dispprovalComment` on the `PartnerApproval` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PartnerApproval" DROP COLUMN "dispprovalComment",
ADD COLUMN     "disapprovalComment" TEXT;
