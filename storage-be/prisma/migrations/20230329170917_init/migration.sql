/*
  Warnings:

  - You are about to drop the column `hasRefreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasRefreshToken",
ADD COLUMN     "hashRefreshToken" TEXT;
