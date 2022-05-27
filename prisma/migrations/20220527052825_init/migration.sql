-- CreateTable
CREATE TABLE "GameSession" (
    "gameid" VARCHAR(255) NOT NULL,
    "gamestate" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("gameid")
);

-- CreateTable
CREATE TABLE "Deck" (
    "uid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Stack" (
    "uid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icons" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stack_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Face" (
    "uid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "backgroundImage" TEXT,
    "description" TEXT,
    "prompts" TEXT[],
    "rule" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Face_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Card" (
    "uid" UUID NOT NULL,
    "deckId" UUID NOT NULL,
    "stackId" UUID NOT NULL,
    "frontId" UUID NOT NULL,
    "backId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_frontId_key" ON "Card"("frontId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_backId_key" ON "Card"("backId");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "Stack"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_frontId_fkey" FOREIGN KEY ("frontId") REFERENCES "Face"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_backId_fkey" FOREIGN KEY ("backId") REFERENCES "Face"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
