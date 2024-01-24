-- DropForeignKey
ALTER TABLE "NewsFeed" DROP CONSTRAINT "NewsFeed_userId_fkey";

-- AddForeignKey
ALTER TABLE "NewsFeed" ADD CONSTRAINT "NewsFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
