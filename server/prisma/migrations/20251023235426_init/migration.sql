/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "popularity" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL,
    "budget" DECIMAL(65,30) NOT NULL,
    "revenue" DECIMAL(65,30) NOT NULL,
    "votes" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "profit" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "url_cover" TEXT NOT NULL,
    "url_background" TEXT NOT NULL,
    "url_trailer" TEXT NOT NULL,
    "approval_rating" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "genres" TEXT[],

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
