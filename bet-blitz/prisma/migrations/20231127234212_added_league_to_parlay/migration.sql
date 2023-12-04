/*
  Warnings:

  - The `leagueId` column on the `Parlay` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Parlay" DROP COLUMN "leagueId",
ADD COLUMN     "leagueId" UUID;

-- AddForeignKey
ALTER TABLE "Parlay" ADD CONSTRAINT "Parlay_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;
