/*
  Warnings:

  - You are about to drop the `AttendanceTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeetingAttendees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MeetingAttendees" DROP CONSTRAINT "MeetingAttendees_atendeeTypeId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingAttendees" DROP CONSTRAINT "MeetingAttendees_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingAttendees" DROP CONSTRAINT "MeetingAttendees_staffId_fkey";

-- DropTable
DROP TABLE "AttendanceTypes";

-- DropTable
DROP TABLE "MeetingAttendees";

-- CreateTable
CREATE TABLE "AttendanceType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AttendanceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingAttendee" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "atendeeTypeId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MeetingAttendee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MeetingAttendee" ADD CONSTRAINT "MeetingAttendee_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendee" ADD CONSTRAINT "MeetingAttendee_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendee" ADD CONSTRAINT "MeetingAttendee_atendeeTypeId_fkey" FOREIGN KEY ("atendeeTypeId") REFERENCES "AttendanceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
