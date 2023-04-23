/*
  Warnings:

  - Added the required column `size` to the `Chunk` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `buffer` on the `Chunk` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `encoding` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chunk" ADD COLUMN     "size" INTEGER NOT NULL,
DROP COLUMN "buffer",
ADD COLUMN     "buffer" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "encoding" TEXT NOT NULL;
