/*
  Warnings:

  - A unique constraint covering the columns `[bettorId,leagueId]` on the table `LeagueBettorsCurrency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxMembers` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numMembers` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingCurrency` to the `League` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "League" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "maxMembers" INTEGER NOT NULL,
ADD COLUMN     "numMembers" INTEGER NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startingCurrency" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LeagueBettorsCurrency_bettorId_leagueId_key" ON "LeagueBettorsCurrency"("bettorId", "leagueId");
