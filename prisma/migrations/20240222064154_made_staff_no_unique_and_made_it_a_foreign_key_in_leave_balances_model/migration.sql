/*
  Warnings:

  - You are about to drop the column `employeeId` on the `LeaveBalance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffNo]` on the table `LeaveBalance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffNo]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffNo` to the `LeaveBalance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LeaveBalance" DROP CONSTRAINT "LeaveBalance_employeeId_fkey";

-- DropIndex
DROP INDEX "LeaveBalance_employeeId_key";

-- AlterTable
ALTER TABLE "LeaveBalance" DROP COLUMN "employeeId",
ADD COLUMN     "staffNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LeaveBalance_staffNo_key" ON "LeaveBalance"("staffNo");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffNo_key" ON "Staff"("staffNo");

-- AddForeignKey
ALTER TABLE "LeaveBalance" ADD CONSTRAINT "LeaveBalance_staffNo_fkey" FOREIGN KEY ("staffNo") REFERENCES "Staff"("staffNo") ON DELETE RESTRICT ON UPDATE CASCADE;
