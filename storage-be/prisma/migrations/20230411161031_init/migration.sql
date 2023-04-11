/*
  Warnings:

  - You are about to drop the column `otp` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "otp";

-- CreateTable
CREATE TABLE "OtpAttempts" (
    "id" TEXT NOT NULL,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpAttempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OtpAttempts_id_key" ON "OtpAttempts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OtpAttempts_userId_key" ON "OtpAttempts"("userId");

-- AddForeignKey
ALTER TABLE "OtpAttempts" ADD CONSTRAINT "OtpAttempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
