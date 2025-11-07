# DocBolt Implementation Plan

## Overview
DocBolt is a ReadMe.io clone providing a complete documentation platform with custom theming, markdown authoring, API exploration, and enterprise features.

---

## Phase 1: MVP - Core Documentation Platform (Weeks 1-8)

### Objective
Launch a functional documentation site with basic authoring, rendering, and navigation capabilities.

### Features

#### 1.1 Basic Infrastructure
- **Project Setup**
  - Next.js 14+ with App Router
  - TypeScript configuration
  - TailwindCSS + shadcn/ui components
  - ESLint + Prettier
  - Git repository structure

- **Database Setup**
  - PostgreSQL database
  - Prisma ORM
  - Initial schema: users, projects, pages, versions
  - Migration system

- **Authentication**
  - NextAuth.js integration
  - Email/password authentication
  - Session management
  - Basic user roles (admin, editor, viewer)

#### 1.2 Documentation Authoring
- **Markdown Editor**
  - MDX support for React components
  - Live preview (split-pane editor)
  - Markdown parsing with remark/rehype
  - Code syntax highlighting (Prism.js or Shiki)
  - Basic formatting toolbar

- **Content Management**
  - Create/Edit/Delete pages
  - Page metadata (title, description, slug)
  - Draft vs Published status
  - Simple file upload for images

#### 1.3 Documentation Frontend
- **Reader Experience**
  - Clean, responsive documentation layout
  - Mobile-optimized reading
  - Table of contents (auto-generated from headings)
  - Breadcrumb navigation
  - Next/Previous page navigation

- **Navigation System**
  - Sidebar with hierarchical structure
  - Manual page ordering (drag-and-drop in admin)
  - Category/folder organization
  - Collapsible sections

- **Basic Theming**
  - Logo upload
  - Primary color customization
  - Light/dark mode toggle
  - Custom CSS injection

#### 1.4 Project Structure
```
docbolt/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/
│   │   │   ├── (auth)/        # Auth pages
│   │   │   ├── (dashboard)/   # Admin dashboard
│   │   │   ├── (docs)/        # Doc reader
│   │   │   └── api/           # API routes
│   │   ├── components/
│   │   │   ├── editor/        # MDX editor
│   │   │   ├── ui/            # shadcn components
│   │   │   └── layout/        # Layout components
│   │   └── lib/
│   │       ├── db/            # Database client
│   │       └── utils/         # Utilities
│   └── api/                    # Node.js API (optional separate service)
├── packages/
│   ├── db/                     # Prisma schema & client
│   ├── ui/                     # Shared UI components
│   └── config/                 # Shared config
├── docs/                       # Project documentation
└── package.json
```

#### 1.5 Tech Stack Decisions
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS 3.x, shadcn/ui, Radix UI
- **Content**: MDX, remark, rehype, gray-matter
- **Database**: PostgreSQL 15+, Prisma ORM
- **Auth**: NextAuth.js v5
- **Deployment**: Vercel (frontend), Railway/Supabase (database)

### MVP Database Schema
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String
  role          Role      @default(VIEWER)
  projects      ProjectMember[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Project {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  description   String?
  logoUrl       String?
  theme         Json?     # Theme settings
  members       ProjectMember[]
  versions      Version[]
  pages         Page[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model ProjectMember {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  user        User      @relation(fields: [userId], references: [id])
  userId      String
  role        ProjectRole
  @@unique([projectId, userId])
}

model Version {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  name        String    # e.g., "v1.0", "v2.0"
  slug        String
  isDefault   Boolean   @default(false)
  pages       Page[]
  createdAt   DateTime  @default(now())
  @@unique([projectId, slug])
}

model Page {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  version     Version   @relation(fields: [versionId], references: [id])
  versionId   String
  title       String
  slug        String
  content     String    @db.Text
  parentId    String?   # For hierarchy
  order       Int       @default(0)
  status      Status    @default(DRAFT)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  @@unique([versionId, slug])
}

enum Role { ADMIN, USER, VIEWER }
enum ProjectRole { OWNER, EDITOR, VIEWER }
enum Status { DRAFT, PUBLISHED }
```

### Deliverables
- Working documentation site with reader + editor
- User authentication and basic permissions
- Markdown rendering with syntax highlighting
- Manual navigation management
- Basic theming capabilities
- Deployed MVP on Vercel

---

## Phase 2: Enhanced Features (Weeks 9-16)

### Objective
Add advanced documentation features, improve UX, and introduce API documentation capabilities.

### Features

#### 2.1 OpenAPI/Swagger Integration
- **API Explorer**
  - OpenAPI 3.0 spec upload/import
  - Interactive API reference (Swagger UI or custom)
  - Try-it-out functionality
  - Request/response examples
  - Authentication preview (API keys, OAuth)

- **API Documentation Generator**
  - Auto-generate docs from OpenAPI spec
  - Sync OpenAPI changes
  - Versioned API specs
  - Schema visualization

#### 2.2 Git Workflow Integration
- **Git Sync**
  - Connect to GitHub/GitLab repository
  - Webhook listeners for push events
  - Auto-sync markdown files from repo
  - Bidirectional sync (UI edits → commits)
  - Branch-based preview deployments

- **Version Control**
  - Git-based versioning (map to branches/tags)
  - Automatic version creation from tags
  - Diff viewer for content changes
  - Rollback capabilities

#### 2.3 Advanced Navigation
- **Smart Navigation**
  - Auto-generate nav from folder structure
  - Search in navigation
  - Keyboard shortcuts (CMD+K search)
  - Anchor links with smooth scroll
  - Sticky headers

- **Content Organization**
  - Multi-level categories (unlimited depth)
  - Custom page templates
  - Hidden pages (unlisted)
  - External links in navigation

#### 2.4 Search System
- **Full-Text Search**
  - PostgreSQL full-text search OR
  - Algolia integration OR
  - MeiliSearch (open-source)
  - Search across all versions
  - Faceted search (by category, version)
  - Search analytics

- **Search UI**
  - Instant search results
  - Keyboard navigation
  - Search highlighting
  - Recent searches

#### 2.5 Landing Pages & Changelogs
- **Landing Page Builder**
  - Hero section with CTA
  - Feature grid
  - Testimonials section
  - Drag-and-drop block builder
  - Custom HTML/React components

- **Changelog System**
  - Changelog entries (title, date, content, tags)
  - RSS feed for updates
  - Email notifications for subscribers
  - Categorized changes (features, fixes, improvements)

#### 2.6 Enhanced Theming
- **Theme Customization**
  - Font selection (Google Fonts)
  - Advanced color palette
  - Custom CSS/SCSS
  - Component-level styling
  - Multiple theme presets
  - Footer customization (links, copyright)

### Additional Schema Updates
```prisma
model APISpec {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  version     Version   @relation(fields: [versionId], references: [id])
  versionId   String
  spec        Json      # OpenAPI spec
  url         String?   # External spec URL
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Changelog {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  title       String
  content     String    @db.Text
  publishedAt DateTime
  tags        String[]  # ["feature", "bugfix"]
  createdAt   DateTime  @default(now())
}

model GitIntegration {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String    @unique
  provider    GitProvider # GITHUB, GITLAB
  repoUrl     String
  branch      String    @default("main")
  token       String    # Encrypted
  webhookId   String?
  syncEnabled Boolean   @default(true)
  lastSync    DateTime?
}

enum GitProvider { GITHUB, GITLAB }
```

### Deliverables
- API documentation with interactive explorer
- Git-based content sync (GitHub/GitLab)
- Full-text search implementation
- Landing page builder
- Changelog system
- Enhanced theming options

---

## Phase 3: Enterprise & Advanced Features (Weeks 17-24)

### Objective
Add enterprise-grade features including SSO, analytics, webhooks, and advanced integrations.

### Features

#### 3.1 Enterprise Authentication & RBAC
- **SSO Integration**
  - SAML 2.0 support
  - OAuth2/OIDC (Okta, Auth0, Google Workspace)
  - SCIM for user provisioning
  - Domain-based auto-assignment

- **Advanced RBAC**
  - Custom role creation
  - Granular permissions (read, write, publish, admin)
  - Team management
  - Audit logs for all actions

#### 3.2 Analytics Dashboard
- **Documentation Analytics**
  - Page views and unique visitors
  - Popular pages and search queries
  - User flow visualization
  - Time on page metrics
  - Geographic distribution
  - Referrer tracking

- **API Usage Analytics**
  - API endpoint popularity
  - Search pattern analysis
  - Version adoption rates
  - User engagement metrics

- **Integration Options**
  - Custom analytics backend
  - Google Analytics 4 integration
  - PostHog (open-source alternative)
  - Mixpanel integration

#### 3.3 Feedback & Engagement
- **Feedback Widget**
  - In-page "Was this helpful?" buttons
  - Comment/suggestion system
  - Rating system (1-5 stars)
  - Feedback dashboard for admins
  - Email notifications

- **User Engagement**
  - Page reactions (emoji)
  - "Suggest edits" button (GitHub PR creation)
  - Discussion threads (optional)

#### 3.4 Content APIs & Webhooks
- **Public APIs**
  - REST API for content retrieval
  - GraphQL endpoint (optional)
  - API key management
  - Rate limiting
  - CORS configuration

- **Webhook System**
  - Event types: page.published, page.updated, version.created
  - Custom webhook endpoints
  - Retry logic and delivery logs
  - Webhook signing for security

#### 3.5 Advanced Integrations
- **Third-Party Integrations**
  - Slack notifications
  - Discord webhooks
  - Intercom/Zendesk integration
  - JIRA/Linear for feedback
  - Zapier webhooks

- **Export/Import**
  - Export to PDF
  - Export to static HTML
  - Import from other platforms (Confluence, GitBook, Notion)
  - Bulk operations API

#### 3.6 Performance & Scale
- **Optimization**
  - Edge caching (Vercel Edge, Cloudflare)
  - Image optimization (Next.js Image)
  - Lazy loading for content
  - CDN for assets
  - Database query optimization

- **Infrastructure**
  - Multi-region deployment
  - Read replicas for database
  - Redis for caching
  - S3/R2 for file storage
  - Background job processing (BullMQ)

### Additional Schema
```prisma
model Analytics {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  page        Page?     @relation(fields: [pageId], references: [id])
  pageId      String?
  event       AnalyticsEvent
  metadata    Json?
  timestamp   DateTime  @default(now())
  @@index([projectId, timestamp])
}

model Feedback {
  id          String    @id @default(cuid())
  page        Page      @relation(fields: [pageId], references: [id])
  pageId      String
  rating      Int?      # 1-5
  comment     String?   @db.Text
  email       String?
  createdAt   DateTime  @default(now())
}

model Webhook {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  url         String
  events      WebhookEvent[]
  secret      String
  enabled     Boolean   @default(true)
  createdAt   DateTime  @default(now())
}

model WebhookDelivery {
  id          String    @id @default(cuid())
  webhook     Webhook   @relation(fields: [webhookId], references: [id])
  webhookId   String
  event       String
  payload     Json
  response    Json?
  success     Boolean
  attempts    Int       @default(1)
  createdAt   DateTime  @default(now())
}

model APIKey {
  id          String    @id @default(cuid())
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   String
  name        String
  key         String    @unique
  permissions String[]
  lastUsed    DateTime?
  expiresAt   DateTime?
  createdAt   DateTime  @default(now())
}

enum AnalyticsEvent { PAGE_VIEW, SEARCH, API_CALL, FEEDBACK }
enum WebhookEvent { PAGE_PUBLISHED, PAGE_UPDATED, VERSION_CREATED }
```

### Deliverables
- SSO and advanced RBAC
- Comprehensive analytics dashboard
- Feedback widget system
- Content APIs with authentication
- Webhook system
- Third-party integrations
- Performance optimizations

---

## Technology Stack Summary

### Frontend
```
- Next.js 14+ (App Router, RSC)
- React 18
- TypeScript 5+
- TailwindCSS 3.x
- shadcn/ui + Radix UI
- MDX with remark/rehype
- React Hook Form + Zod
- Tanstack Query (data fetching)
- Zustand (state management)
- Framer Motion (animations)
```

### Backend
```
- Next.js API Routes OR Express.js
- Prisma ORM
- PostgreSQL 15+
- Redis (caching & sessions)
- BullMQ (job queues)
- NextAuth.js v5 OR Auth.js
```

### Content & Search
```
- MDX (markdown processing)
- Shiki or Prism (syntax highlighting)
- MeiliSearch OR Algolia (search)
- gray-matter (frontmatter parsing)
- remark-gfm (GitHub Flavored Markdown)
```

### DevOps & Infrastructure
```
- Docker & Docker Compose
- Vercel (frontend hosting)
- Railway/Supabase/Render (backend + DB)
- S3/Cloudflare R2 (file storage)
- GitHub Actions (CI/CD)
- Sentry (error tracking)
- Plausible/PostHog (analytics)
```

### Third-Party Services
```
- OpenAPI/Swagger UI
- GitHub/GitLab APIs
- Stripe (if monetizing)
- SendGrid/Resend (email)
- Cloudflare Workers (edge functions)
```

---

## Detailed Project Structure

```
docbolt/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── apps/
│   ├── web/                          # Next.js application
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── layout.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   ├── projects/
│   │   │   │   ├── settings/
│   │   │   │   ├── analytics/
│   │   │   │   └── layout.tsx
│   │   │   ├── (docs)/
│   │   │   │   └── [project]/
│   │   │   │       ├── [version]/
│   │   │   │       │   └── [...slug]/
│   │   │   │       │       └── page.tsx
│   │   │   │       └── layout.tsx
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   ├── projects/
│   │   │   │   ├── pages/
│   │   │   │   ├── webhooks/
│   │   │   │   └── public/         # Public API
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx             # Landing page
│   │   ├── components/
│   │   │   ├── editor/
│   │   │   │   ├── mdx-editor.tsx
│   │   │   │   ├── toolbar.tsx
│   │   │   │   └── preview.tsx
│   │   │   ├── docs/
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── toc.tsx
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   └── page-nav.tsx
│   │   │   ├── api-explorer/
│   │   │   │   ├── swagger-ui.tsx
│   │   │   │   └── endpoint-list.tsx
│   │   │   ├── analytics/
│   │   │   ├── feedback/
│   │   │   ├── search/
│   │   │   │   └── command-palette.tsx
│   │   │   ├── theme/
│   │   │   │   └── theme-customizer.tsx
│   │   │   ├── ui/                  # shadcn components
│   │   │   └── layout/
│   │   ├── lib/
│   │   │   ├── auth/
│   │   │   ├── db/
│   │   │   ├── api/
│   │   │   ├── mdx/
│   │   │   ├── search/
│   │   │   ├── git/
│   │   │   ├── analytics/
│   │   │   └── utils/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── worker/                       # Background jobs (optional)
│       ├── jobs/
│       │   ├── git-sync.ts
│       │   ├── analytics.ts
│       │   └── webhooks.ts
│       └── index.ts
├── packages/
│   ├── database/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   └── seed.ts
│   │   └── package.json
│   ├── ui/                           # Shared components
│   │   ├── src/
│   │   └── package.json
│   ├── config/                       # Shared configs
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── tailwind/
│   └── types/                        # Shared types
├── docs/                             # Project documentation
│   ├── architecture.md
│   ├── api.md
│   └── deployment.md
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── scripts/
│   ├── setup.sh
│   └── migrate.sh
├── .env.example
├── .gitignore
├── package.json
├── turbo.json                        # Turborepo config
├── README.md
└── LICENSE
```

---

## Development Workflow

### Phase 1 (Weeks 1-8)
1. **Week 1-2**: Project setup, database schema, auth
2. **Week 3-4**: MDX editor, content management
3. **Week 5-6**: Documentation frontend, navigation
4. **Week 7-8**: Theming, polish, MVP deployment

### Phase 2 (Weeks 9-16)
1. **Week 9-10**: OpenAPI integration, API explorer
2. **Week 11-12**: Git sync (GitHub/GitLab)
3. **Week 13-14**: Search implementation
4. **Week 15-16**: Landing pages, changelogs

### Phase 3 (Weeks 17-24)
1. **Week 17-18**: SSO, RBAC
2. **Week 19-20**: Analytics dashboard
3. **Week 21-22**: Webhooks, APIs, feedback
4. **Week 23-24**: Integrations, optimization, launch

---

## Deployment Strategy

### Development
- **Database**: Docker PostgreSQL + Redis locally
- **Frontend**: Next.js dev server
- **Hot reload**: Enabled for all file changes

### Staging
- **Frontend**: Vercel preview deployments
- **Database**: Supabase or Railway staging instance
- **Branch deployments**: Auto-deploy from feature branches

### Production
- **Frontend**: Vercel production (with CDN)
- **Database**: Managed PostgreSQL (Supabase/Railway/RDS)
- **Cache**: Redis (Upstash or Railway)
- **Storage**: S3 or Cloudflare R2
- **Monitoring**: Sentry, Vercel Analytics
- **CI/CD**: GitHub Actions

---

## Key Considerations

### Security
- Input sanitization for markdown (prevent XSS)
- API rate limiting
- CORS configuration
- Environment variable management
- Database connection pooling
- SQL injection prevention (Prisma helps)

### Performance
- Edge caching for static content
- Database indexing on frequently queried fields
- Lazy loading for navigation and content
- Image optimization
- Code splitting in Next.js

### Scalability
- Stateless architecture
- Horizontal scaling for frontend
- Database read replicas
- CDN for global distribution
- Background job processing

### Testing
- Unit tests (Jest, Vitest)
- Integration tests (Playwright)
- E2E tests for critical flows
- Accessibility testing
- Load testing for API endpoints

---

## Recommended Libraries

### Editor
- `@monaco-editor/react` - VS Code-like editor
- `react-markdown` - Markdown renderer
- `@mdx-js/react` - MDX support
- `remark-gfm` - GitHub Flavored Markdown
- `rehype-highlight` - Syntax highlighting

### UI Components
- `shadcn/ui` - Component library
- `@radix-ui/react-*` - Headless components
- `cmdk` - Command palette
- `react-hot-toast` - Notifications
- `recharts` - Charts for analytics

### Git Integration
- `@octokit/rest` - GitHub API
- `@gitbeaker/node` - GitLab API
- `simple-git` - Git operations

### Search
- `meilisearch` - Search engine
- `algoliasearch` - Algolia SDK
- `flexsearch` - Client-side search

### API Documentation
- `swagger-ui-react` - API explorer
- `openapi-typescript` - Type generation

---

## Success Metrics

### MVP (Phase 1)
- Documentation site loads in <2s
- Editor supports all common markdown
- Basic auth and permissions working
- Mobile responsive

### Phase 2
- Search returns results in <100ms
- Git sync completes in <30s
- API explorer handles 100+ endpoints
- Support 10+ concurrent editors

### Phase 3
- Dashboard loads analytics in <1s
- Webhooks deliver in <5s
- Support 10,000+ pages per project
- 99.9% uptime

---

## Next Steps

1. **Initialize repository** with Next.js and Turborepo
2. **Set up database** with Prisma and initial schema
3. **Implement authentication** with NextAuth.js
4. **Build MDX editor** as first major feature
5. **Create documentation reader** layout
6. **Iterate based on user feedback**

This plan provides a clear roadmap from MVP to enterprise-grade documentation platform. Each phase builds on the previous, allowing for iterative development and early user feedback.
