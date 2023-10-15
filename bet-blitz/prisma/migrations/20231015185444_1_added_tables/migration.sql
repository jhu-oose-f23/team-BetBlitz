/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Bettor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "privateCurrencyId" UUID NOT NULL,

    CONSTRAINT "Bettor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" DOUBLE PRECISION,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bettorId" UUID NOT NULL,
    "gameId" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "leagueId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "scheduleId" UUID,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "currentWeek" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchUpWeek" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "scheduleId" UUID NOT NULL,

    CONSTRAINT "MatchUpWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchUp" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "matchUpWeekId" UUID NOT NULL,
    "bettorId1" UUID NOT NULL,
    "bettorId2" UUID NOT NULL,
    "bettor1Score" DOUBLE PRECISION,
    "bettor2Score" DOUBLE PRECISION,

    CONSTRAINT "MatchUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BetBoard" (
    "gameId" UUID NOT NULL,

    CONSTRAINT "BetBoard_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "LeagueBettorsCurrency" (
    "bettorId" UUID NOT NULL,
    "leagueId" UUID NOT NULL,
    "currencyId" UUID NOT NULL,

    CONSTRAINT "LeagueBettorsCurrency_pkey" PRIMARY KEY ("bettorId","leagueId")
);

-- CreateTable
CREATE TABLE "LeagueRecord" (
    "bettorId" UUID NOT NULL,
    "leagueId" UUID NOT NULL,
    "win" INTEGER NOT NULL,
    "loss" INTEGER NOT NULL,
    "draw" INTEGER NOT NULL,

    CONSTRAINT "LeagueRecord_pkey" PRIMARY KEY ("bettorId","leagueId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bettor_id_key" ON "Bettor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bettor_privateCurrencyId_key" ON "Bettor"("privateCurrencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_id_key" ON "Currency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bet_id_key" ON "Bet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "League_id_key" ON "League"("id");

-- CreateIndex
CREATE UNIQUE INDEX "League_scheduleId_key" ON "League"("scheduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_id_key" ON "Schedule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchUp_id_key" ON "MatchUp"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BetBoard_gameId_key" ON "BetBoard"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueBettorsCurrency_bettorId_key" ON "LeagueBettorsCurrency"("bettorId");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueBettorsCurrency_leagueId_key" ON "LeagueBettorsCurrency"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueBettorsCurrency_currencyId_key" ON "LeagueBettorsCurrency"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- AddForeignKey
ALTER TABLE "Bettor" ADD CONSTRAINT "Bettor_privateCurrencyId_fkey" FOREIGN KEY ("privateCurrencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_bettorId_fkey" FOREIGN KEY ("bettorId") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchUpWeek" ADD CONSTRAINT "MatchUpWeek_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchUp" ADD CONSTRAINT "MatchUp_bettorId1_fkey" FOREIGN KEY ("bettorId1") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchUp" ADD CONSTRAINT "MatchUp_bettorId2_fkey" FOREIGN KEY ("bettorId2") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchUp" ADD CONSTRAINT "MatchUp_matchUpWeekId_fkey" FOREIGN KEY ("matchUpWeekId") REFERENCES "MatchUpWeek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetBoard" ADD CONSTRAINT "BetBoard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueBettorsCurrency" ADD CONSTRAINT "LeagueBettorsCurrency_bettorId_fkey" FOREIGN KEY ("bettorId") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueBettorsCurrency" ADD CONSTRAINT "LeagueBettorsCurrency_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueBettorsCurrency" ADD CONSTRAINT "LeagueBettorsCurrency_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueRecord" ADD CONSTRAINT "LeagueRecord_bettorId_fkey" FOREIGN KEY ("bettorId") REFERENCES "Bettor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueRecord" ADD CONSTRAINT "LeagueRecord_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
