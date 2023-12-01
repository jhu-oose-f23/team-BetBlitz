-- AlterTable
ALTER TABLE "League" ADD COLUMN     "winnerBettorId" TEXT;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_winnerBettorId_fkey" FOREIGN KEY ("winnerBettorId") REFERENCES "Bettor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
