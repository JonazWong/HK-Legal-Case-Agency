-- Step 1: Drop the unused PublicTrackingConfig table
DROP TABLE IF EXISTS "PublicTrackingConfig";

-- Step 2: Verify no NULL externalId exists (should return 0)
SELECT COUNT(*) as null_count FROM "PublicCase" WHERE "externalId" IS NULL;

-- Step 3: Make externalId NOT NULL
ALTER TABLE "PublicCase" ALTER COLUMN "externalId" SET NOT NULL;

-- Verify the change
SELECT column_name, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'PublicCase' AND column_name = 'externalId';
