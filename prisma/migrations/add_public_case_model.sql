-- CreateTable
CREATE TABLE "PublicCase" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "externalId" TEXT,
    "caseNumber" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "court" TEXT,
    "judge" TEXT,
    "hearingDate" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "tags" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicCase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PublicCase_source_idx" ON "PublicCase"("source");

-- CreateIndex
CREATE INDEX "PublicCase_caseNumber_idx" ON "PublicCase"("caseNumber");

-- CreateIndex
CREATE INDEX "PublicCase_hearingDate_idx" ON "PublicCase"("hearingDate");

-- CreateIndex
CREATE INDEX "PublicCase_title_idx" ON "PublicCase"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PublicCase_source_externalId_key" ON "PublicCase"("source", "externalId");
