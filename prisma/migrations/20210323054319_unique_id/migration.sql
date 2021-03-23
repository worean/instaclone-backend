/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId,photoId]` on the table `Like`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.userId_photoId_unique" ON "Like"("userId", "photoId");
