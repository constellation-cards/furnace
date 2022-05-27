-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_backId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_frontId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_stackId_fkey";

-- AlterTable
ALTER TABLE "Card" RENAME COLUMN uid TO id;

-- AlterTable
ALTER TABLE "Deck" RENAME COLUMN uid TO id;

-- AlterTable
ALTER TABLE "Face" RENAME COLUMN uid TO id;

-- AlterTable
ALTER TABLE "Stack" RENAME COLUMN uid TO id;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_frontId_fkey" FOREIGN KEY ("frontId") REFERENCES "Face"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_backId_fkey" FOREIGN KEY ("backId") REFERENCES "Face"("id") ON DELETE CASCADE ON UPDATE CASCADE;
