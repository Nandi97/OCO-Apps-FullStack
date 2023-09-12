-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "atendeeIds" INTEGER NOT NULL,
    "absenteeIds" INTEGER NOT NULL,
    "absenteesWithApologiesIds" INTEGER NOT NULL,
    "chairPersonId" INTEGER NOT NULL,
    "scribeId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingItem" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "responsibleId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3),
    "meetingId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AOB" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AOB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_chairPersonId_key" ON "Meeting"("chairPersonId");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_scribeId_key" ON "Meeting"("scribeId");

-- CreateIndex
CREATE UNIQUE INDEX "MeetingItem_responsibleId_key" ON "MeetingItem"("responsibleId");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_atendeeIds_fkey" FOREIGN KEY ("atendeeIds") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_absenteeIds_fkey" FOREIGN KEY ("absenteeIds") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_absenteesWithApologiesIds_fkey" FOREIGN KEY ("absenteesWithApologiesIds") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_scribeId_fkey" FOREIGN KEY ("scribeId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_chairPersonId_fkey" FOREIGN KEY ("chairPersonId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingItem" ADD CONSTRAINT "MeetingItem_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingItem" ADD CONSTRAINT "MeetingItem_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AOB" ADD CONSTRAINT "AOB_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
