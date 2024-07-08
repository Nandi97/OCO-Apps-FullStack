/*
  Warnings:

  - The `projectTagId` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProjectTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProjectTag` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_projectTagId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectTagId",
ADD COLUMN     "projectTagId" INTEGER;

-- AlterTable
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectTagId_fkey" FOREIGN KEY ("projectTagId") REFERENCES "ProjectTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
