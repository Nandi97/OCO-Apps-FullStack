/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Matter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Matter_code_key" ON "Matter"("code");
