/*
  Warnings:

  - You are about to drop the column `hashTag` on the `Hashtag` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[hashtag]` on the table `Hashtag`. If there are existing duplicate values, the migration will fail.
  - Added the required column `hashtag` to the `Hashtag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Hashtag.hashTag_unique";

-- AlterTable
ALTER TABLE "Hashtag" DROP COLUMN "hashTag",
ADD COLUMN     "hashtag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.hashtag_unique" ON "Hashtag"("hashtag");
