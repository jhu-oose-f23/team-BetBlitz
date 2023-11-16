-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "parlayId" UUID;

-- CreateTable
CREATE TABLE "Parlay" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bettorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "odds" INTEGER NOT NULL,
    "betResult" "BetResult" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Parlay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parlay_id_key" ON "Parlay"("id");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_parlayId_fkey" FOREIGN KEY ("parlayId") REFERENCES "Parlay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
