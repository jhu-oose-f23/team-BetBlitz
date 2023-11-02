/*
  Warnings:

  - You are about to drop the column `chosenTeam` on the `Bet` table. All the data in the column will be lost.
  - Added the required column `chosenResult` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `odds` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "chosenTeam",
ADD COLUMN     "chosenResult" "EventResult" NOT NULL,
ADD COLUMN     "odds" INTEGER NOT NULL;
