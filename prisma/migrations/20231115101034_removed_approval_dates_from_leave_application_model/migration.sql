/*
  Warnings:

  - You are about to drop the column `HRMApprovalDate` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the column `partnerApprovalDate` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorApprovalDate` on the `LeaveApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LeaveApplication" DROP COLUMN "HRMApprovalDate",
DROP COLUMN "partnerApprovalDate",
DROP COLUMN "supervisorApprovalDate";

-- CreateTable
CREATE TABLE "LeaveApproval" (
    "id" TEXT NOT NULL,
    "supervisorApproval" TIMESTAMP(3),
    "supervisorDispproval" TIMESTAMP(3),
    "supervisorDispprovalComment" TEXT,
    "partnerApproval" TIMESTAMP(3),
    "partnerDispproval" TIMESTAMP(3),
    "partnerDispprovalComment" TEXT,
    "humanResourceManagerApproval" TIMESTAMP(3),
    "humanResourceManagerDispproval" TIMESTAMP(3),
    "humanResourceManagerDispprovalComment" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LeaveApproval_pkey" PRIMARY KEY ("id")
);
