/*
  Warnings:

  - You are about to drop the `LeaveApproval` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "LeaveApplication" ADD COLUMN     "hRMApprovalId" TEXT,
ADD COLUMN     "partnerApprovalId" TEXT,
ADD COLUMN     "supervisorApprovalId" TEXT;

-- DropTable
DROP TABLE "LeaveApproval";

-- CreateTable
CREATE TABLE "SupervisorApproval" (
    "id" TEXT NOT NULL,
    "approval" TIMESTAMP(3),
    "dispproval" TIMESTAMP(3),
    "dispprovalComment" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SupervisorApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerApproval" (
    "id" TEXT NOT NULL,
    "approval" TIMESTAMP(3),
    "dispproval" TIMESTAMP(3),
    "dispprovalComment" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PartnerApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HRMApproval" (
    "id" TEXT NOT NULL,
    "approval" TIMESTAMP(3),
    "dispproval" TIMESTAMP(3),
    "dispprovalComment" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HRMApproval_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_supervisorApprovalId_fkey" FOREIGN KEY ("supervisorApprovalId") REFERENCES "SupervisorApproval"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_partnerApprovalId_fkey" FOREIGN KEY ("partnerApprovalId") REFERENCES "PartnerApproval"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_hRMApprovalId_fkey" FOREIGN KEY ("hRMApprovalId") REFERENCES "HRMApproval"("id") ON DELETE SET NULL ON UPDATE CASCADE;
