/*
  Warnings:

  - Added the required column `age_rating` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "age_rating" TEXT NOT NULL,
ADD COLUMN     "director" TEXT NOT NULL;
