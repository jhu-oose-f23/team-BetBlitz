-- CreateEnum
CREATE TYPE "Result" AS ENUM ('IN_PROGESS', 'HOME_TEAM', 'AWAY_TEAM', 'DRAW');

-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "sportKey" TEXT,
    "commenceTime" TIMESTAMP(3),
    "homeTeam" TEXT,
    "awayTeam" TEXT,
    "teamOneName" TEXT,
    "teamTwoName" TEXT,
    "teamOneOdds" INTEGER,
    "teamTwoOdds" INTEGER,
    "result" "Result" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Example_name_idx" ON "Example"("name");
