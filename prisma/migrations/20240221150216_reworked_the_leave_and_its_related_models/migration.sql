/*
  Warnings:

  - You are about to drop the column `hRMApprovalId` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the column `partnerApprovalId` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorApprovalId` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the `HRMApproval` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeaveDays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PartnerApproval` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupervisorApproval` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_hRMApprovalId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_partnerApprovalId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_supervisorApprovalId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveDays" DROP CONSTRAINT "LeaveDays_staffId_fkey";

-- AlterTable
ALTER TABLE "LeaveApplication" DROP COLUMN "hRMApprovalId",
DROP COLUMN "partnerApprovalId",
DROP COLUMN "supervisorApprovalId";

-- DropTable
DROP TABLE "HRMApproval";

-- DropTable
DROP TABLE "LeaveDays";

-- DropTable
DROP TABLE "PartnerApproval";

-- DropTable
DROP TABLE "SupervisorApproval";

-- CreateTable
CREATE TABLE "LeaveSupervisorApproval" (
    "id" TEXT NOT NULL,
    "leaveApplicationId" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LeaveSupervisorApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeavePartnerApproval" (
    "id" TEXT NOT NULL,
    "leaveApplicationId" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LeavePartnerApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveHRMApproval" (
    "id" TEXT NOT NULL,
    "leaveApplicationId" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LeaveHRMApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveBalance" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "annualEntitlement" DOUBLE PRECISION NOT NULL,
    "balanceBroughtForward" DOUBLE PRECISION NOT NULL,
    "earned" DOUBLE PRECISION NOT NULL,
    "taken" DOUBLE PRECISION NOT NULL,
    "sold" DOUBLE PRECISION NOT NULL,
    "forfeited" DOUBLE PRECISION NOT NULL,
    "balanceCarryForward" DOUBLE PRECISION NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "LeaveBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeaveBalance_employeeId_key" ON "LeaveBalance"("employeeId");

-- AddForeignKey
ALTER TABLE "LeaveSupervisorApproval" ADD CONSTRAINT "LeaveSupervisorApproval_leaveApplicationId_fkey" FOREIGN KEY ("leaveApplicationId") REFERENCES "LeaveApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeavePartnerApproval" ADD CONSTRAINT "LeavePartnerApproval_leaveApplicationId_fkey" FOREIGN KEY ("leaveApplicationId") REFERENCES "LeaveApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveHRMApproval" ADD CONSTRAINT "LeaveHRMApproval_leaveApplicationId_fkey" FOREIGN KEY ("leaveApplicationId") REFERENCES "LeaveApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveBalance" ADD CONSTRAINT "LeaveBalance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
