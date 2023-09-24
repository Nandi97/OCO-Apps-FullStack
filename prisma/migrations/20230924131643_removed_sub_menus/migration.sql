/*
  Warnings:

  - You are about to drop the `SubMenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubMenu" DROP CONSTRAINT "SubMenu_menuId_fkey";

-- DropTable
DROP TABLE "SubMenu";
