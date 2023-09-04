-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_createdById_fkey";

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
