const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to update
const patterns = [
  'apps/web/app/(dashboard)/**/*.tsx',
  'apps/web/app/api/**/*.ts',
  'apps/web/components/**/*.tsx'
];

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove auth imports
  if (content.includes("import { auth } from '@/lib/auth'")) {
    content = content.replace(/import { auth } from '@\/lib\/auth';\n?/g, '');
    modified = true;
  }

  if (content.includes("import { redirect } from 'next/navigation'") && content.includes('redirect(')) {
    // Keep redirect import but we'll remove usage
  }

  // Remove auth checks
  if (content.includes('const session = await auth()')) {
    content = content.replace(/const session = await auth\(\);\n?/g, '');
    modified = true;
  }

  // Remove redirect checks
  if (content.includes("if (!session?.user)") || content.includes("if (!session)")) {
    content = content.replace(/if \(!session\?\.user\) {\s*return NextResponse\.json\([^}]+\);\s*}\n?/g, '');
    content = content.replace(/if \(!session\?\.user\) {\s*redirect\([^)]+\);\s*}\n?/g, '');
    content = content.replace(/if \(!session\) {\s*return NextResponse\.json\([^}]+\);\s*}\n?/g, '');
    content = content.replace(/if \(!session\) {\s*redirect\([^)]+\);\s*}\n?/g, '');
    modified = true;
  }

  // Replace session.user with getDefaultUser()
  if (content.includes('session.user')) {
    if (!content.includes("import { getDefaultUser } from '@/lib/default-user'")) {
      // Add import after other imports
      const lastImport = content.lastIndexOf('\nimport');
      if (lastImport > -1) {
        const endOfLine = content.indexOf('\n', lastImport + 1);
        content = content.slice(0, endOfLine + 1) +
                  "import { getDefaultUser } from '@/lib/default-user';\n" +
                  content.slice(endOfLine + 1);
      }
    }

    // Add const user = getDefaultUser(); at start of function
    const functionStart = content.search(/export (?:default )?(?:async )?function/);
    if (functionStart > -1) {
      const openBrace = content.indexOf('{', functionStart);
      const nextLine = content.indexOf('\n', openBrace) + 1;
      if (!content.includes('const user = getDefaultUser()')) {
        content = content.slice(0, nextLine) +
                  '  const user = getDefaultUser();\n' +
                  content.slice(nextLine);
      }
    }

    content = content.replace(/session\.user/g, 'user');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// Process all files
patterns.forEach(pattern => {
  const files = glob.sync(pattern, { cwd: path.join(__dirname, '..') });
  files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    try {
      updateFile(fullPath);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  });
});

console.log('Done!');
