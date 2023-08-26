/*
  Warnings:

  - Made the column `coverUrl` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "coverUrl" SET NOT NULL;
