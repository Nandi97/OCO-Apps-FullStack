/*
  Warnings:

  - You are about to drop the column `approvingPartnerId` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the `LeavePartnerApproval` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[leaveApplicationId]` on the table `LeaveHRMApproval` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaveApplicationId]` on the table `LeaveSupervisorApproval` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_approvingHRMId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_approvingPartnerId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "LeavePartnerApproval" DROP CONSTRAINT "LeavePartnerApproval_leaveApplicationId_fkey";

-- AlterTable
ALTER TABLE "LeaveApplication" DROP COLUMN "approvingPartnerId",
ADD COLUMN     "finalApproverId" TEXT,
ALTER COLUMN "supervisorId" DROP NOT NULL,
ALTER COLUMN "approvingHRMId" DROP NOT NULL;

-- DropTable
DROP TABLE "LeavePartnerApproval";

-- CreateTable
CREATE TABLE "LeaveFinalApproval" (
    "id" TEXT NOT NULL,
    "leaveApplicationId" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LeaveFinalApproval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeaveFinalApproval_leaveApplicationId_key" ON "LeaveFinalApproval"("leaveApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveHRMApproval_leaveApplicationId_key" ON "LeaveHRMApproval"("leaveApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveSupervisorApproval_leaveApplicationId_key" ON "LeaveSupervisorApproval"("leaveApplicationId");

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_finalApproverId_fkey" FOREIGN KEY ("finalApproverId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_approvingHRMId_fkey" FOREIGN KEY ("approvingHRMId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveFinalApproval" ADD CONSTRAINT "LeaveFinalApproval_leaveApplicationId_fkey" FOREIGN KEY ("leaveApplicationId") REFERENCES "LeaveApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
