# DocBolt Build Guide

This guide shows you exactly how to build out the complete DocBolt application from the foundation that's been created.

## 🎯 Current Status

### ✅ Completed
- [x] Project structure (Turborepo monorepo)
- [x] Database schema (Prisma with 20+ models)
- [x] Docker services configuration
- [x] Next.js application setup
- [x] Tailwind CSS configuration
- [x] TypeScript configuration

### 🚧 In Progress
The foundation is ready. Now you need to implement the features.

## 📁 Project Structure Overview

```
docbolt/
├── apps/
│   └── web/                    # Next.js application
│       ├── app/                # App Router
│       │   ├── (auth)/         # Authentication routes
│       │   ├── (dashboard)/    # Admin dashboard
│       │   ├── (docs)/         # Public docs reader
│       │   ├── api/            # API routes
│       │   └── layout.tsx      # Root layout
│       ├── components/         # React components
│       │   ├── ui/             # shadcn/ui components
│       │   ├── editor/         # Markdown editor
│       │   ├── dashboard/      # Dashboard components
│       │   └── docs/           # Docs reader components
│       ├── lib/                # Utilities
│       └── public/             # Static assets
├── packages/
│   └── database/               # Prisma schema
└── docker-compose.yml          # Services
```

## 🚀 Step-by-Step Implementation

### Phase 1: MVP Features (Weeks 1-8)

#### Week 1-2: Authentication & User Management

**Files to create:**

1. **`apps/web/lib/auth.ts`** - NextAuth configuration
```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@docbolt/database';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
```

2. **`apps/web/app/(auth)/signin/page.tsx`** - Sign in page
3. **`apps/web/app/(auth)/signup/page.tsx`** - Sign up page
4. **`apps/web/components/auth/signin-form.tsx`** - Sign in form component
5. **`apps/web/components/auth/signup-form.tsx`** - Sign up form component

#### Week 3-4: Project Management

**Files to create:**

1. **`apps/web/app/(dashboard)/dashboard/projects/page.tsx`** - Projects list
2. **`apps/web/app/(dashboard)/dashboard/projects/new/page.tsx`** - Create project
3. **`apps/web/app/(dashboard)/dashboard/projects/[id]/page.tsx`** - Project detail
4. **`apps/web/components/dashboard/project-card.tsx`** - Project card component
5. **`apps/web/app/api/projects/route.ts`** - Projects API
6. **`apps/web/app/api/projects/[id]/route.ts`** - Single project API

**Example API implementation:**
```typescript
// apps/web/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@docbolt/database';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projects = await db.project.findMany({
    where: {
      members: {
        some: { userId: session.user.id },
      },
    },
    include: {
      _count: {
        select: { pages: true, versions: true },
      },
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();

  const project = await db.project.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      members: {
        create: {
          userId: session.user.id,
          role: 'OWNER',
        },
      },
      versions: {
        create: {
          name: 'v1.0',
          slug: 'v1',
          isDefault: true,
          isPublished: true,
        },
      },
    },
  });

  return NextResponse.json(project);
}
```

#### Week 5-6: Markdown Editor & Page Management

**Key files:**

1. **`apps/web/components/editor/markdown-editor.tsx`** - Main editor
2. **`apps/web/components/editor/live-preview.tsx`** - Live preview pane
3. **`apps/web/components/editor/file-tree.tsx`** - File navigation
4. **`apps/web/app/(dashboard)/dashboard/projects/[id]/pages/new/page.tsx`** - New page
5. **`apps/web/app/(dashboard)/dashboard/projects/[id]/pages/[pageId]/edit/page.tsx`** - Edit page

**Editor implementation example:**
```typescript
'use client';

import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

export function MarkdownEditor({ initialContent, onSave }: Props) {
  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState('');

  const updatePreview = async (markdown: string) => {
    const result = await remark().use(html).process(markdown);
    setPreview(result.toString());
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div>
        <MDEditor
          value={content}
          onChange={(val) => {
            setContent(val || '');
            updatePreview(val || '');
          }}
          height="100%"
        />
      </div>
      <div className="prose dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: preview }} />
      </div>
    </div>
  );
}
```

#### Week 7-8: Documentation Reader & Navigation

**Key files:**

1. **`apps/web/app/(docs)/[project]/[...slug]/page.tsx`** - Docs page
2. **`apps/web/components/docs/sidebar.tsx`** - Navigation sidebar
3. **`apps/web/components/docs/toc.tsx`** - Table of contents
4. **`apps/web/components/docs/breadcrumbs.tsx`** - Breadcrumbs
5. **`apps/web/lib/docs/navigation.ts`** - Navigation builder

**Navigation builder:**
```typescript
export async function buildNavigation(projectId: string, versionId: string) {
  const pages = await db.page.findMany({
    where: {
      projectId,
      versionId,
      status: 'PUBLISHED',
      isHidden: false,
    },
    orderBy: [{ order: 'asc' }, { title: 'asc' }],
  });

  // Build tree structure
  const tree = buildTree(pages);
  return tree;
}

function buildTree(pages: Page[], parentId: string | null = null) {
  return pages
    .filter(p => p.parentId === parentId)
    .map(page => ({
      ...page,
      children: buildTree(pages, page.id),
    }));
}
```

### Phase 2: Enhanced Features (Weeks 9-16)

#### Week 9-10: OpenAPI/Swagger Integration

**Key files:**

1. **`apps/web/app/(dashboard)/dashboard/projects/[id]/api-specs/page.tsx`** - API specs list
2. **`apps/web/app/(dashboard)/dashboard/projects/[id]/api-specs/new/page.tsx`** - Upload spec
3. **`apps/web/app/(docs)/[project]/api/[spec]/page.tsx`** - API reference viewer
4. **`apps/web/components/api/swagger-ui.tsx`** - Swagger UI wrapper
5. **`apps/web/components/api/try-it-console.tsx`** - Try-it console

**Swagger UI integration:**
```typescript
'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export function SwaggerViewer({ spec }: { spec: any }) {
  return (
    <div className="swagger-container">
      <SwaggerUI
        spec={spec}
        docExpansion="list"
        defaultModelsExpandDepth={1}
      />
    </div>
  );
}
```

#### Week 11-12: Git Integration

**Key files:**

1. **`apps/web/lib/git/github.ts`** - GitHub API client
2. **`apps/web/lib/git/gitlab.ts`** - GitLab API client
3. **`apps/web/app/api/integrations/github/webhook/route.ts`** - GitHub webhook
4. **`apps/web/lib/git/sync.ts`** - Sync logic
5. **`apps/web/components/dashboard/git-settings.tsx`** - Git settings UI

**Git sync example:**
```typescript
import { Octokit } from '@octokit/rest';

export async function syncFromGitHub(integration: Integration) {
  const octokit = new Octokit({ auth: integration.config.token });

  const { data: contents } = await octokit.repos.getContent({
    owner: integration.config.owner,
    repo: integration.config.repo,
    path: integration.config.docsPath || 'docs',
  });

  // Process files and update database
  for (const file of contents) {
    if (file.type === 'file' && file.name.endsWith('.md')) {
      await syncPage(file);
    }
  }
}
```

#### Week 13-14: Full-Text Search

**Key files:**

1. **`apps/web/lib/search/meilisearch.ts`** - MeiliSearch client
2. **`apps/web/app/api/search/route.ts`** - Search API
3. **`apps/web/components/search/search-bar.tsx`** - Search component
4. **`apps/web/components/search/search-results.tsx`** - Results display
5. **`apps/web/lib/search/indexer.ts`** - Index builder

**Search implementation:**
```typescript
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.MEILI_HOST!,
  apiKey: process.env.MEILI_MASTER_KEY!,
});

export async function indexPage(page: Page) {
  const index = client.index('pages');

  await index.addDocuments([{
    id: page.id,
    title: page.title,
    content: page.content,
    slug: page.slug,
    projectId: page.projectId,
    versionId: page.versionId,
    tags: page.tags,
  }]);
}

export async function search(query: string, projectId: string) {
  const index = client.index('pages');

  const results = await index.search(query, {
    filter: `projectId = ${projectId}`,
    attributesToHighlight: ['title', 'content'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  });

  return results;
}
```

#### Week 15-16: Landing Pages & Changelogs

**Key files:**

1. **`apps/web/app/(dashboard)/dashboard/projects/[id]/landing/page.tsx`** - Landing editor
2. **`apps/web/components/landing/builder.tsx`** - Drag-and-drop builder
3. **`apps/web/app/(docs)/[project]/page.tsx`** - Landing page view
4. **`apps/web/app/(dashboard)/dashboard/projects/[id]/changelog/page.tsx`** - Changelog manager
5. **`apps/web/app/(docs)/[project]/changelog/page.tsx`** - Changelog view
6. **`apps/web/app/(docs)/[project]/changelog/rss/route.ts`** - RSS feed

### Phase 3: Enterprise Features (Weeks 17-24)

#### Week 17-18: SSO & Advanced RBAC

**Key files:**

1. **`apps/web/lib/auth.ts`** - Update with SAML support
2. **`apps/web/app/(dashboard)/dashboard/projects/[id]/team/page.tsx`** - Team management
3. **`apps/web/components/dashboard/role-editor.tsx`** - Custom roles
4. **`apps/web/lib/permissions.ts`** - Permission checks

#### Week 19-20: Analytics Dashboard

**Key files:**

1. **`apps/web/app/(dashboard)/dashboard/projects/[id]/analytics/page.tsx`** - Analytics
2. **`apps/web/components/analytics/page-views-chart.tsx`** - Charts
3. **`apps/web/components/analytics/top-pages.tsx`** - Top pages
4. **`apps/web/lib/analytics/tracker.ts`** - Event tracking

#### Week 21-22: Feedback & Webhooks

**Key files:**

1. **`apps/web/components/docs/feedback-widget.tsx`** - Thumbs up/down
2. **`apps/web/app/api/feedback/route.ts`** - Feedback API
3. **`apps/web/app/(dashboard)/dashboard/projects/[id]/webhooks/page.tsx`** - Webhook manager
4. **`apps/web/lib/webhooks/dispatcher.ts`** - Webhook dispatcher

#### Week 23-24: Content APIs & Polish

**Key files:**

1. **`apps/web/app/api/v1/[project]/pages/route.ts`** - Pages API
2. **`apps/web/app/api/v1/[project]/search/route.ts`** - Search API
3. **`apps/web/app/api/v1/[project]/changelog/route.ts`** - Changelog API
4. Final testing and bug fixes

## 🎨 UI Components Library

Use shadcn/ui for all components. Install with:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add form
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add tooltip
```

## 🧪 Testing Strategy

1. **Unit Tests**: Test utilities and business logic
2. **Integration Tests**: Test API routes
3. **E2E Tests**: Test user flows with Playwright

## 📦 Deployment

### Development

```bash
# Start services
docker-compose up -d

# Install dependencies
npm install

# Set up database
npm run db:push

# Start dev server
npm run dev
```

### Production

```bash
# Build
npm run build

# Start
npm run start
```

Deploy to:
- **Vercel** (recommended for Next.js)
- **Railway** (for database + app)
- **AWS** (ECS/EKS for containers)

## 🔍 Key Implementation Tips

1. **Authentication**: NextAuth v5 uses server actions - follow their latest docs
2. **Database**: Always use transactions for multi-step operations
3. **Search**: Index pages after every create/update operation
4. **Performance**: Use React Query for caching API responses
5. **Security**: Validate all inputs with Zod schemas
6. **Git Sync**: Use background jobs (BullMQ) for long-running operations
7. **Theming**: Store theme in database, apply via CSS variables

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [MeiliSearch Docs](https://docs.meilisearch.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com/docs)

## 🐛 Common Issues

### Database Connection
- Ensure PostgreSQL is running: `docker ps`
- Check connection string in `.env`

### Build Errors
- Clear cache: `rm -rf .next`
- Regenerate Prisma client: `npm run db:generate`

### Type Errors
- Regenerate types: `npm run db:generate`
- Restart TS server in VS Code

## ✅ Completion Checklist

- [ ] All Phase 1 features working
- [ ] All Phase 2 features working
- [ ] All Phase 3 features working
- [ ] Tests passing
- [ ] Documentation complete
- [ ] Deployed to staging
- [ ] Security audit completed
- [ ] Performance optimized
- [ ] Ready for production!

---

**Need help?** Refer to the IMPLEMENTATION_PLAN.md for detailed technical specs.
