/*
  Warnings:

  - You are about to drop the column `HRMApprovalDate` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the column `partnerApprovalDate` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorApprovalDate` on the `LeaveApplication` table. All the data in the column will be lost.
  - Added the required column `approvalID` to the `LeaveApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_approvingHRMId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_approvingPartnerId_fkey";

-- AlterTable
ALTER TABLE "LeaveApplication" DROP COLUMN "HRMApprovalDate",
DROP COLUMN "partnerApprovalDate",
DROP COLUMN "supervisorApprovalDate",
ADD COLUMN     "approvalID" TEXT NOT NULL,
ALTER COLUMN "approvingPartnerId" DROP NOT NULL,
ALTER COLUMN "approvingHRMId" DROP NOT NULL;

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

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_approvingPartnerId_fkey" FOREIGN KEY ("approvingPartnerId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_approvingHRMId_fkey" FOREIGN KEY ("approvingHRMId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_approvalID_fkey" FOREIGN KEY ("approvalID") REFERENCES "LeaveApproval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
