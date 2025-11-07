#!/bin/bash

# This script removes authentication from all API routes and pages

echo "Removing authentication from all files..."

# Find and update all API route files
find apps/web/app/api/projects -name "route.ts" -type f | while read file; do
  echo "Processing: $file"

  # Create a temporary file
  tmp=$(mktemp)

  # Remove auth import and add default-user import
  sed 's/import { auth } from/@\/lib\/auth'"'"';/d' "$file" | \
  sed '/import.*from.*next/a\
import { getDefaultUser } from '"'"'@/lib/default-user'"'"';' | \
  sed 's/const session = await auth();/const user = getDefaultUser();/g' | \
  sed '/if (!session.*user.*) {/,/}/d' | \
  sed 's/session\.user\.id/user.id/g' | \
  sed 's/session\.user/user/g' > "$tmp"

  # Only replace if different
  if ! cmp -s "$file" "$tmp"; then
    mv "$tmp" "$file"
    echo "  ✓ Updated"
  else
    rm "$tmp"
    echo "  - No changes"
  fi
done

# Find and update all dashboard page files
find apps/web/app/\(dashboard\) -name "page.tsx" -type f | while read file; do
  echo "Processing: $file"

  tmp=$(mktemp)

  sed 's/import { auth } from/@\/lib\/auth'"'"';/d' "$file" | \
  sed 's/import { redirect } from/\/\/import { redirect } from/g' | \
  sed '/import.*from.*next/a\
import { getDefaultUser } from '"'"'@/lib/default-user'"'"';' | \
  sed 's/const session = await auth();/const user = getDefaultUser();/g' | \
  sed '/if (!session) {/,/}/d' | \
  sed 's/session\.user\.id/user.id/g' | \
  sed 's/session\.user/user/g' > "$tmp"

  if ! cmp -s "$file" "$tmp"; then
    mv "$tmp" "$file"
    echo "  ✓ Updated"
  else
    rm "$tmp"
    echo "  - No changes"
  fi
done

echo "Done!"
