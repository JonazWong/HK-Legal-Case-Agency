#!/bin/bash
set -e

################################################################################
# HK Legal Case Agency - Database Backup Script
# Creates compressed PostgreSQL database backups
################################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"

# Load environment variables from .env if exists
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
fi

# Database configuration
DB_HOST="${DATABASE_HOST:-localhost}"
DB_PORT="${DATABASE_PORT:-5432}"
DB_NAME="${DATABASE_NAME:-hk_legal}"
DB_USER="${DATABASE_USER:-postgres}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Generate backup filename with timestamp
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/hk-legal-$TIMESTAMP.sql"
BACKUP_FILE_GZ="$BACKUP_FILE.gz"

echo -e "${GREEN}🔄 Starting database backup...${NC}"
echo "Backup file: $BACKUP_FILE_GZ"

# Check if using Docker
if command -v docker &> /dev/null && docker ps | grep -q postgres; then
    echo "Using Docker PostgreSQL container"
    # Get container name
    CONTAINER=$(docker ps --filter "ancestor=postgres" --format "{{.Names}}" | head -1)
    
    # Create database dump from Docker
    if docker exec "$CONTAINER" pg_dump -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"; then
        # Compress the backup
        gzip "$BACKUP_FILE"
        
        # Get file size
        BACKUP_SIZE=$(du -h "$BACKUP_FILE_GZ" | cut -f1)
        
        echo -e "${GREEN}✅ Backup created successfully!${NC}"
        echo "File: $BACKUP_FILE_GZ"
        echo "Size: $BACKUP_SIZE"
    else
        echo -e "${RED}❌ Backup failed!${NC}"
        rm -f "$BACKUP_FILE" "$BACKUP_FILE_GZ"
        exit 1
    fi
else
    echo "Using local PostgreSQL installation"
    # Create database dump from local PostgreSQL
    if PGPASSWORD="$DATABASE_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"; then
        # Compress the backup
        gzip "$BACKUP_FILE"
        
        # Get file size
        BACKUP_SIZE=$(du -h "$BACKUP_FILE_GZ" | cut -f1)
        
        echo -e "${GREEN}✅ Backup created successfully!${NC}"
        echo "File: $BACKUP_FILE_GZ"
        echo "Size: $BACKUP_SIZE"
    else
        echo -e "${RED}❌ Backup failed!${NC}"
        rm -f "$BACKUP_FILE" "$BACKUP_FILE_GZ"
        exit 1
    fi
fi

# Cleanup old backups
echo -e "${YELLOW}🧹 Cleaning up old backups (keeping last ${RETENTION_DAYS} days)...${NC}"
find "$BACKUP_DIR" -name "hk-legal-*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete

# Count remaining backups
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "hk-legal-*.sql.gz" -type f | wc -l)
echo -e "${GREEN}Total backups: $BACKUP_COUNT${NC}"

# Optional: Upload to cloud storage (uncomment if needed)
# if [ ! -z "$AWS_S3_BUCKET" ]; then
#     echo "Uploading to S3..."
#     aws s3 cp "$BACKUP_FILE_GZ" "s3://$AWS_S3_BUCKET/backups/"
# fi

exit 0
