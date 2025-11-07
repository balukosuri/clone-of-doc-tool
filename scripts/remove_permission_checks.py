#!/usr/bin/env python3
import re
import os
import glob

# Find all API route files
api_files = glob.glob('/home/user/clone-of-doc-tool/apps/web/app/api/**/*.ts', recursive=True)

for file_path in api_files:
    with open(file_path, 'r') as f:
        content = f.read()

    # Remove projectMember checks
    content = re.sub(
        r'\s*//[^\n]*Check if user has[^\n]*\n\s*const projectMember = await db\.projectMember\.findFirst\(\{[^}]+\}\);\n\n\s*if \(!projectMember\) \{\s*return NextResponse\.json\([^}]+\}, \{ status: \d+ \}\);\s*\}',
        '',
        content,
        flags=re.DOTALL
    )

    with open(file_path, 'w') as f:
        f.write(content)

    print(f"✓ Updated {file_path}")

# Update dashboard pages
dashboard_files = glob.glob('/home/user/clone-of-doc-tool/apps/web/app/(dashboard)/**/*.tsx', recursive=True)

for file_path in dashboard_files:
    with open(file_path, 'r') as f:
        content = f.read()

    # Remove projectMember checks and redirects
    content = re.sub(
        r'\s*//[^\n]*Check if user has[^\n]*\n\s*const projectMember = await db\.projectMember\.findFirst\(\{[^}]+\}\);\n\n\s*if \(!projectMember\) \{\s*redirect\([^)]+\);\s*\}',
        '',
        content,
        flags=re.DOTALL
    )

    with open(file_path, 'w') as f:
        f.write(content)

    print(f"✓ Updated {file_path}")

print("\nDone!")
