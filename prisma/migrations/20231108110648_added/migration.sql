/*
  Warnings:

  - You are about to drop the column `approvingHRId` on the `LeaveApplication` table. All the data in the column will be lost.
  - Added the required column `approvingHRMId` to the `LeaveApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_approvingHRId_fkey";

-- AlterTable
ALTER TABLE "LeaveApplication" DROP COLUMN "approvingHRId",
ADD COLUMN     "HRMApprovalDate" TIMESTAMP(3),
ADD COLUMN     "approvingHRMId" TEXT NOT NULL,
ADD COLUMN     "partnerApprovalDate" TIMESTAMP(3),
ADD COLUMN     "supervisorApprovalDate" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_approvingHRMId_fkey" FOREIGN KEY ("approvingHRMId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
