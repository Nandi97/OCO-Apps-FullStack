-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "causeListCaseId" TEXT;

-- CreateTable
CREATE TABLE "CauseList" (
    "id" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CauseList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauseListCase" (
    "id" TEXT NOT NULL,
    "coram" TEXT NOT NULL,
    "virtual" BOOLEAN NOT NULL DEFAULT false,
    "case" TEXT NOT NULL,
    "causeListId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CauseListCase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_causeListCaseId_fkey" FOREIGN KEY ("causeListCaseId") REFERENCES "CauseListCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseList" ADD CONSTRAINT "CauseList_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseListCase" ADD CONSTRAINT "CauseListCase_causeListId_fkey" FOREIGN KEY ("causeListId") REFERENCES "CauseList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
