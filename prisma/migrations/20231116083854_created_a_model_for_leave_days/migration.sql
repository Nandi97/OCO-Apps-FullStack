-- CreateTable
CREATE TABLE "LeaveDays" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "daysEntitled" DOUBLE PRECISION NOT NULL,
    "daysAccumulated" DOUBLE PRECISION NOT NULL,
    "daysTaken" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LeaveDays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaveDays" ADD CONSTRAINT "LeaveDays_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
