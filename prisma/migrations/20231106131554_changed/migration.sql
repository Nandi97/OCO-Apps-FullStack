/*
  Warnings:

  - The primary key for the `AOB` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AttendanceType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Designation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Gender` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Matter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Meeting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MeetingAttendee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MeetingItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PurchaseItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PurchaseOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StaffType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StopWatchItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StopWatchItemTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Town` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AOB" DROP CONSTRAINT "AOB_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_staffId_fkey";

-- DropForeignKey
ALTER TABLE "Designation" DROP CONSTRAINT "Designation_staffTypeId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingAttendee" DROP CONSTRAINT "MeetingAttendee_atendeeTypeId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingAttendee" DROP CONSTRAINT "MeetingAttendee_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingAttendee" DROP CONSTRAINT "MeetingAttendee_staffId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingItem" DROP CONSTRAINT "MeetingItem_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_approverId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_townId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_designationId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_genderId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_teamId_fkey";

-- DropForeignKey
ALTER TABLE "StopWatchItem" DROP CONSTRAINT "StopWatchItem_matterId_fkey";

-- DropForeignKey
ALTER TABLE "StopWatchItem" DROP CONSTRAINT "StopWatchItem_stopWatchItemTaskId_fkey";

-- AlterTable
ALTER TABLE "AOB" DROP CONSTRAINT "AOB_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "meetingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AOB_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AOB_id_seq";

-- AlterTable
ALTER TABLE "AttendanceType" DROP CONSTRAINT "AttendanceType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AttendanceType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AttendanceType_id_seq";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "staffId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Book_id_seq";

-- AlterTable
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Currency_id_seq";

-- AlterTable
ALTER TABLE "Designation" DROP CONSTRAINT "Designation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "staffTypeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Designation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Designation_id_seq";

-- AlterTable
ALTER TABLE "Gender" DROP CONSTRAINT "Gender_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Gender_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Gender_id_seq";

-- AlterTable
ALTER TABLE "Matter" DROP CONSTRAINT "Matter_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Matter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Matter_id_seq";

-- AlterTable
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Meeting_id_seq";

-- AlterTable
ALTER TABLE "MeetingAttendee" DROP CONSTRAINT "MeetingAttendee_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "meetingId" SET DATA TYPE TEXT,
ALTER COLUMN "staffId" SET DATA TYPE TEXT,
ALTER COLUMN "atendeeTypeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MeetingAttendee_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MeetingAttendee_id_seq";

-- AlterTable
ALTER TABLE "MeetingItem" DROP CONSTRAINT "MeetingItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "meetingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MeetingItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MeetingItem_id_seq";

-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Menu_id_seq";

-- AlterTable
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "purchaseOrderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PurchaseItem_id_seq";

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "currencyId" SET DATA TYPE TEXT,
ALTER COLUMN "approverId" SET DATA TYPE TEXT,
ALTER COLUMN "townId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PurchaseOrder_id_seq";

-- AlterTable
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ALTER COLUMN "designationId" SET DATA TYPE TEXT,
ALTER COLUMN "genderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Staff_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Staff_id_seq";

-- AlterTable
ALTER TABLE "StaffType" DROP CONSTRAINT "StaffType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "StaffType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StaffType_id_seq";

-- AlterTable
ALTER TABLE "StopWatchItem" DROP CONSTRAINT "StopWatchItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "stopWatchItemTaskId" SET DATA TYPE TEXT,
ALTER COLUMN "matterId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StopWatchItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StopWatchItem_id_seq";

-- AlterTable
ALTER TABLE "StopWatchItemTask" DROP CONSTRAINT "StopWatchItemTask_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "StopWatchItemTask_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StopWatchItemTask_id_seq";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AlterTable
ALTER TABLE "Town" DROP CONSTRAINT "Town_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Town_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Town_id_seq";

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_staffTypeId_fkey" FOREIGN KEY ("staffTypeId") REFERENCES "StaffType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopWatchItem" ADD CONSTRAINT "StopWatchItem_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopWatchItem" ADD CONSTRAINT "StopWatchItem_stopWatchItemTaskId_fkey" FOREIGN KEY ("stopWatchItemTaskId") REFERENCES "StopWatchItemTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendee" ADD CONSTRAINT "MeetingAttendee_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendee" ADD CONSTRAINT "MeetingAttendee_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendee" ADD CONSTRAINT "MeetingAttendee_atendeeTypeId_fkey" FOREIGN KEY ("atendeeTypeId") REFERENCES "AttendanceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingItem" ADD CONSTRAINT "MeetingItem_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AOB" ADD CONSTRAINT "AOB_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
