/*
  Warnings:

  - Added the required column `colour` to the `ProjectTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectTag" ADD COLUMN     "colour" TEXT NOT NULL;
