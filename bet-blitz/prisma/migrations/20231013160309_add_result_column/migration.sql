/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `teamOneOdd` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `teamTwoOdd` on the `Event` table. All the data in the column will be lost.
  - Added the required column `result` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Result" AS ENUM ('IN_PROGESS', 'HOME_TEAM', 'AWAY_TEAM', 'DRAW');

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "teamOneOdd",
DROP COLUMN "teamTwoOdd",
ADD COLUMN     "result" "Result" NOT NULL,
ADD COLUMN     "teamOneOdds" INTEGER,
ADD COLUMN     "teamTwoOdds" INTEGER,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Event_id_seq";
