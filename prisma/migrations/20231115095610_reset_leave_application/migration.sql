/*
  Warnings:

  - You are about to drop the column `approvalID` on the `LeaveApplication` table. All the data in the column will be lost.
  - You are about to drop the `LeaveApproval` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_approvalID_fkey";

-- AlterTable
ALTER TABLE "LeaveApplication" DROP COLUMN "approvalID",
ADD COLUMN     "HRMApprovalDate" TIMESTAMP(3),
ADD COLUMN     "partnerApprovalDate" TIMESTAMP(3),
ADD COLUMN     "supervisorApprovalDate" TIMESTAMP(3);

-- DropTable
DROP TABLE "LeaveApproval";
