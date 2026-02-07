#!/bin/bash
set -e

################################################################################
# HK Legal Case Agency - Database Restore Script
# Restores PostgreSQL database from backup
################################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./backups}"
TMP_DIR="/tmp/hk-legal-restore"

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

# Function to list available backups
list_backups() {
    echo -e "${GREEN}Available backups:${NC}"
    ls -lht "$BACKUP_DIR"/hk-legal-*.sql.gz 2>/dev/null | head -10 || echo "No backups found"
}

# Check if backup file is provided
if [ -z "$1" ]; then
    echo -e "${RED}Usage: $0 <backup-file|latest>${NC}"
    echo ""
    list_backups
    exit 1
fi

# Determine backup file
if [ "$1" = "latest" ]; then
    BACKUP_FILE=$(ls -t "$BACKUP_DIR"/hk-legal-*.sql.gz 2>/dev/null | head -1)
    if [ -z "$BACKUP_FILE" ]; then
        echo -e "${RED}No backup files found!${NC}"
        exit 1
    fi
    echo -e "${GREEN}Using latest backup: $BACKUP_FILE${NC}"
else
    BACKUP_FILE="$1"
    if [ ! -f "$BACKUP_FILE" ]; then
        echo -e "${RED}Backup file not found: $BACKUP_FILE${NC}"
        list_backups
        exit 1
    fi
fi

# Confirm restore
echo -e "${YELLOW}⚠️  WARNING: This will replace the current database!${NC}"
echo "Backup file: $BACKUP_FILE"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Restore cancelled.${NC}"
    exit 0
fi

echo -e "${GREEN}🔄 Starting database restore...${NC}"

# Create temporary directory
mkdir -p "$TMP_DIR"

# Decompress backup to temporary file
echo "Decompressing backup..."
TMP_SQL="$TMP_DIR/restore.sql"
gunzip -c "$BACKUP_FILE" > "$TMP_SQL"

# Check if using Docker
if command -v docker &> /dev/null && docker ps | grep -q postgres; then
    echo "Using Docker PostgreSQL container"
    CONTAINER=$(docker ps --filter "ancestor=postgres" --format "{{.Names}}" | head -1)
    
    # Drop and recreate database
    echo "Dropping existing database..."
    docker exec "$CONTAINER" psql -U "$DB_USER" -c "DROP DATABASE IF EXISTS $DB_NAME;"
    echo "Creating fresh database..."
    docker exec "$CONTAINER" psql -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;"
    
    # Restore database
    echo "Restoring database..."
    if docker exec -i "$CONTAINER" psql -U "$DB_USER" "$DB_NAME" < "$TMP_SQL"; then
        echo -e "${GREEN}✅ Database restored successfully!${NC}"
    else
        echo -e "${RED}❌ Restore failed!${NC}"
        rm -rf "$TMP_DIR"
        exit 1
    fi
else
    echo "Using local PostgreSQL installation"
    
    # Drop and recreate database
    echo "Dropping existing database..."
    PGPASSWORD="$DATABASE_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "DROP DATABASE IF EXISTS $DB_NAME;"
    echo "Creating fresh database..."
    PGPASSWORD="$DATABASE_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;"
    
    # Restore database
    echo "Restoring database..."
    if PGPASSWORD="$DATABASE_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" < "$TMP_SQL"; then
        echo -e "${GREEN}✅ Database restored successfully!${NC}"
    else
        echo -e "${RED}❌ Restore failed!${NC}"
        rm -rf "$TMP_DIR"
        exit 1
    fi
fi

# Cleanup temporary files
rm -rf "$TMP_DIR"

echo -e "${GREEN}🎉 Restore completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Run Prisma migrations: npm run prisma:migrate"
echo "2. Restart the application: npm run dev"

exit 0
