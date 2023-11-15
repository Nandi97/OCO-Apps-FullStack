/*
  Warnings:

  - Made the column `approvingPartnerId` on table `LeaveApplication` required. This step will fail if there are existing NULL values in that column.
  - Made the column `approvingHRMId` on table `LeaveApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_approvingHRMId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_approvingPartnerId_fkey";

-- AlterTable
ALTER TABLE "LeaveApplication" ALTER COLUMN "approvingPartnerId" SET NOT NULL,
ALTER COLUMN "approvingHRMId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_approvingPartnerId_fkey" FOREIGN KEY ("approvingPartnerId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_approvingHRMId_fkey" FOREIGN KEY ("approvingHRMId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
