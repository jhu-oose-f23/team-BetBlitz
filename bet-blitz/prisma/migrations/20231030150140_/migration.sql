/*
  Warnings:

  - The primary key for the `Bettor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LeagueBettorsCurrency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LeagueRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `betResult` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chosenTeam` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `result` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventResult" AS ENUM ('IN_PROGESS', 'HOME_TEAM', 'AWAY_TEAM', 'DRAW');

-- CreateEnum
CREATE TYPE "BetResult" AS ENUM ('IN_PROGRESS', 'WIN', 'LOSS', 'PUSH');

-- DropForeignKey
ALTER TABLE "Bet" DROP CONSTRAINT "Bet_bettorId_fkey";

-- DropForeignKey
ALTER TABLE "LeagueBettorsCurrency" DROP CONSTRAINT "LeagueBettorsCurrency_bettorId_fkey";

-- DropForeignKey
ALTER TABLE "LeagueRecord" DROP CONSTRAINT "LeagueRecord_bettorId_fkey";

-- DropForeignKey
ALTER TABLE "MatchUp" DROP CONSTRAINT "MatchUp_bettorId1_fkey";

-- DropForeignKey
ALTER TABLE "MatchUp" DROP CONSTRAINT "MatchUp_bettorId2_fkey";

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "betResult" "BetResult" NOT NULL,
ADD COLUMN     "chosenTeam" TEXT NOT NULL,
ALTER COLUMN "bettorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Bettor" DROP CONSTRAINT "Bettor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bettor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "result",
ADD COLUMN     "result" "EventResult" NOT NULL;

-- AlterTable
ALTER TABLE "LeagueBettorsCurrency" DROP CONSTRAINT "LeagueBettorsCurrency_pkey",
ALTER COLUMN "bettorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LeagueBettorsCurrency_pkey" PRIMARY KEY ("bettorId", "leagueId");

-- AlterTable
ALTER TABLE "LeagueRecord" DROP CONSTRAINT "LeagueRecord_pkey",
ALTER COLUMN "bettorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LeagueRecord_pkey" PRIMARY KEY ("bettorId", "leagueId");

-- AlterTable
ALTER TABLE "MatchUp" ALTER COLUMN "bettorId1" SET DATA TYPE TEXT,
ALTER COLUMN "bettorId2" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Result";

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_bettorId_fkey" FOREIGN KEY ("bettorId") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchUp" ADD CONSTRAINT "MatchUp_bettorId1_fkey" FOREIGN KEY ("bettorId1") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchUp" ADD CONSTRAINT "MatchUp_bettorId2_fkey" FOREIGN KEY ("bettorId2") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueBettorsCurrency" ADD CONSTRAINT "LeagueBettorsCurrency_bettorId_fkey" FOREIGN KEY ("bettorId") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueRecord" ADD CONSTRAINT "LeagueRecord_bettorId_fkey" FOREIGN KEY ("bettorId") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
