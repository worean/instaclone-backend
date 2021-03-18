/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[hashTag]` on the table `Hashtag`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.hashTag_unique" ON "Hashtag"("hashTag");
