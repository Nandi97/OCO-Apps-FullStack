/*
  Warnings:

  - Changed the type of `ext` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "ext",
ADD COLUMN     "ext" INTEGER NOT NULL;