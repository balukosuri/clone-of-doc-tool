#!/usr/bin/env python3
import re
import os

files_to_update = [
    'apps/web/app/(dashboard)/dashboard/projects/[id]/versions/page.tsx',
    'apps/web/app/api/projects/[id]/versions/[versionId]/route.ts',
    'apps/web/app/api/projects/[id]/versions/route.ts',
    'apps/web/app/(dashboard)/dashboard/projects/[id]/pages/[pageId]/edit/page.tsx',
    'apps/web/app/(dashboard)/dashboard/projects/[id]/pages/new/page.tsx',
    'apps/web/app/(dashboard)/dashboard/projects/[id]/pages/page.tsx',
    'apps/web/app/(dashboard)/dashboard/projects/[id]/page.tsx',
    'apps/web/app/api/projects/[id]/pages/[pageId]/route.ts',
    'apps/web/app/api/projects/[id]/pages/route.ts',
    'apps/web/app/api/projects/[id]/route.ts',
]

for file_path in files_to_update:
    full_path = f'/home/user/clone-of-doc-tool/{file_path}'

    if not os.path.exists(full_path):
        print(f"Skipping {file_path} - not found")
        continue

    with open(full_path, 'r') as f:
        content = f.read()

    # Remove auth import
    content = re.sub(r"import \{ auth \} from '@/lib/auth';\n?", '', content)
    content = re.sub(r"import \{ redirect \} from 'next/navigation';\n?", '', content)

    # Add default user import if not present
    if 'getDefaultUser' not in content:
        # Find last import statement
        imports = list(re.finditer(r'^import .+?;\n', content, re.MULTILINE))
        if imports:
            last_import = imports[-1]
            insert_pos = last_import.end()
            content = content[:insert_pos] + "import { getDefaultUser } from '@/lib/default-user';\n" + content[insert_pos:]

    # Replace session = await auth() with user = getDefaultUser()
    content = re.sub(r'const session = await auth\(\);', 'const user = getDefaultUser();', content)

    # Remove auth checks
    content = re.sub(r'\s*if \(!session\?\.user\) \{\s*return NextResponse\.json\([^}]+\}, \{ status: \d+ \}\);\s*\}', '', content)
    content = re.sub(r'\s*if \(!session\) \{\s*return NextResponse\.json\([^}]+\}, \{ status: \d+ \}\);\s*\}', '', content)
    content = re.sub(r'\s*if \(!session\?\.user\) \{\s*redirect\([^)]+\);\s*\}', '', content)
    content = re.sub(r'\s*if \(!session\) \{\s*redirect\([^)]+\);\s*\}', '', content)

    # Replace session.user.id with user.id
    content = re.sub(r'session\.user\.id', 'user.id', content)

    # Replace session.user with user
    content = re.sub(r'session\.user', 'user', content)

    with open(full_path, 'w') as f:
        f.write(content)

    print(f"✓ Updated {file_path}")

print("\nDone!")
