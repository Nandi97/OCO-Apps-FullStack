/*
  Warnings:

  - A unique constraint covering the columns `[staffId]` on the table `LeaveDays` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LeaveDays_staffId_key" ON "LeaveDays"("staffId");
