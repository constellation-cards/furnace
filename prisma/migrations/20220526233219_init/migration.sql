-- CreateTable
CREATE TABLE "sessions_v1" (
    "gameid" VARCHAR(255) NOT NULL,
    "gamestate" JSONB NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_v1_pkey" PRIMARY KEY ("gameid")
);
