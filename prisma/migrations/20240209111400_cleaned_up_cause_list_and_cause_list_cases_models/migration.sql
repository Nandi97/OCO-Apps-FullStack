/*
  Warnings:

  - Changed the type of `virtual` on the `CauseListCase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CauseListCase" ADD COLUMN     "url" TEXT,
DROP COLUMN "virtual",
ADD COLUMN     "virtual" INTEGER NOT NULL;
