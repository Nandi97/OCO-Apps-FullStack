-- CreateTable
CREATE TABLE "StopWatchItemTask" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StopWatchItemTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StopWatchItem" (
    "id" SERIAL NOT NULL,
    "narration" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "stopWatchItemTaskId" INTEGER,

    CONSTRAINT "StopWatchItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StopWatchItem" ADD CONSTRAINT "StopWatchItem_stopWatchItemTaskId_fkey" FOREIGN KEY ("stopWatchItemTaskId") REFERENCES "StopWatchItemTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopWatchItem" ADD CONSTRAINT "StopWatchItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
