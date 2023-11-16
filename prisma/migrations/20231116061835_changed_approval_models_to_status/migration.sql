/*
  Warnings:

  - You are about to drop the column `approval` on the `HRMApproval` table. All the data in the column will be lost.
  - You are about to drop the column `dispproval` on the `HRMApproval` table. All the data in the column will be lost.
  - You are about to drop the column `approval` on the `PartnerApproval` table. All the data in the column will be lost.
  - You are about to drop the column `dispproval` on the `PartnerApproval` table. All the data in the column will be lost.
  - You are about to drop the column `approval` on the `SupervisorApproval` table. All the data in the column will be lost.
  - You are about to drop the column `dispproval` on the `SupervisorApproval` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HRMApproval" DROP COLUMN "approval",
DROP COLUMN "dispproval",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PartnerApproval" DROP COLUMN "approval",
DROP COLUMN "dispproval",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "SupervisorApproval" DROP COLUMN "approval",
DROP COLUMN "dispproval",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;
