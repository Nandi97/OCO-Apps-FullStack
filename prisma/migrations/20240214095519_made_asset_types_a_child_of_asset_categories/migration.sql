/*
  Warnings:

  - You are about to drop the column `assetCategoryId` on the `Asset` table. All the data in the column will be lost.
  - The primary key for the `AssetCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_assetCategoryId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "assetCategoryId";

-- AlterTable
ALTER TABLE "AssetCategory" DROP CONSTRAINT "AssetCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AssetCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AssetCategory_id_seq";

-- AlterTable
ALTER TABLE "AssetType" ADD COLUMN     "assetCategoryId" TEXT;

-- AddForeignKey
ALTER TABLE "AssetType" ADD CONSTRAINT "AssetType_assetCategoryId_fkey" FOREIGN KEY ("assetCategoryId") REFERENCES "AssetCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
