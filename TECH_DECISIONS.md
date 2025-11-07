# Technology Decision Document

This document outlines key technology choices for DocBolt and the rationale behind each decision.

---

## Frontend Framework: Next.js 14 with App Router

### Decision
Use Next.js 14+ with the new App Router architecture.

### Rationale
- **Server Components**: Reduce client-side JavaScript, improve performance
- **Built-in API routes**: No need for separate backend initially
- **File-based routing**: Intuitive organization for docs structure
- **SEO optimized**: Crucial for documentation discoverability
- **Image optimization**: Automatic image handling
- **Edge runtime**: Deploy globally with low latency
- **Vercel integration**: Seamless deployment and preview URLs
- **Strong ecosystem**: Large community and plugin support

### Alternatives Considered
- **Remix**: Great choice but smaller ecosystem
- **Vite + React Router**: More setup required, no SSR out of box
- **Astro**: Excellent for static content, but limited for dynamic features

---

## Styling: TailwindCSS + shadcn/ui

### Decision
Use TailwindCSS for utility-first styling with shadcn/ui component library.

### Rationale
- **Utility-first**: Rapid prototyping and consistent design
- **Customizable**: Easy theming for multi-tenant use case
- **Small bundle size**: Purges unused CSS
- **shadcn/ui**: Copy-paste components (not a dependency)
- **Radix UI primitives**: Accessible, unstyled components
- **Dark mode**: Built-in support with class strategy
- **Developer experience**: Auto-completion in editors

### Alternatives Considered
- **CSS Modules**: More verbose, harder to theme
- **Styled Components**: Runtime overhead, harder to optimize
- **Chakra UI**: Good but opinionated, harder to customize deeply

---

## Content Management: MDX

### Decision
Use MDX (Markdown + JSX) for content authoring.

### Rationale
- **Familiar**: Markdown is universally known
- **Extensible**: Embed React components in content
- **Type-safe**: TypeScript support for custom components
- **Ecosystem**: Rich plugin ecosystem (remark/rehype)
- **GitHub compatible**: Works with GitHub Flavored Markdown
- **Flexible**: Support for custom syntax and features

### Processing Pipeline
```
Markdown → remark (AST) → rehype (HTML AST) → React Components
```

### Key Plugins
- `remark-gfm`: GitHub Flavored Markdown
- `remark-math`: LaTeX math support
- `rehype-highlight`: Syntax highlighting
- `rehype-slug`: Auto-generate heading IDs
- `rehype-autolink-headings`: Add anchor links

### Alternatives Considered
- **Plain Markdown**: Not extensible enough
- **Rich text editor**: Too complex for technical docs
- **AsciiDoc**: Less familiar to developers

---

## Database: PostgreSQL + Prisma ORM

### Decision
PostgreSQL as primary database with Prisma as ORM.

### Rationale

**PostgreSQL**
- **Mature & reliable**: Battle-tested for 25+ years
- **Full-text search**: Built-in search capabilities
- **JSONB support**: Store flexible theme/config data
- **Transactions**: ACID compliance for data integrity
- **Relationships**: Excellent for hierarchical content
- **Scalability**: Read replicas, partitioning
- **Managed services**: Available on all major platforms

**Prisma**
- **Type-safety**: Auto-generated TypeScript types
- **Developer experience**: Intuitive schema language
- **Migrations**: Version-controlled schema changes
- **Query builder**: Prevents SQL injection
- **Multi-database**: Can switch to MySQL/SQLite if needed
- **Studio**: Built-in database GUI

### Schema Highlights
- Soft deletes for content
- Optimistic locking for concurrent edits
- Composite indexes for performance
- Foreign key constraints for data integrity

### Alternatives Considered
- **MongoDB**: Less suitable for relational data
- **MySQL**: Similar to PostgreSQL, less JSON support
- **Drizzle ORM**: Newer, less mature than Prisma
- **TypeORM**: More complex, less type-safe

---

## Authentication: NextAuth.js (Auth.js)

### Decision
Use NextAuth.js v5 (Auth.js) for authentication.

### Rationale
- **Next.js integration**: Designed for Next.js
- **Multiple providers**: Email, OAuth, SAML support
- **Session management**: Flexible (JWT or database)
- **RBAC ready**: Role-based access control
- **Secure by default**: CSRF protection, encrypted tokens
- **Edge compatible**: Works with Edge runtime
- **Open source**: No vendor lock-in

### Authentication Flow
1. Email/password for initial MVP
2. OAuth (Google, GitHub) in Phase 2
3. SAML/SSO for enterprise in Phase 3

### Session Strategy
- **Development**: Database sessions for debugging
- **Production**: JWT tokens for scalability
- **Redis**: Session store for distributed systems

### Alternatives Considered
- **Clerk**: Great but adds cost at scale
- **Auth0**: Powerful but expensive for open-source
- **Supabase Auth**: Good but ties you to Supabase
- **Custom solution**: Too much effort, security risk

---

## Search: MeiliSearch (Primary) / Algolia (Alternative)

### Decision
MeiliSearch as primary search engine, with Algolia as hosted alternative.

### Rationale

**MeiliSearch**
- **Open source**: Self-hostable, no vendor lock-in
- **Fast**: Written in Rust, optimized for speed
- **Typo tolerant**: Forgiving of user errors
- **Easy setup**: Simple to deploy and configure
- **Ranking**: Configurable relevance ranking
- **Filtering**: Support for faceted search
- **Docker ready**: Easy to containerize
- **Free**: No usage limits for self-hosted

**Algolia (Alternative)**
- **Managed service**: No infrastructure to maintain
- **Generous free tier**: Good for small projects
- **Global CDN**: Low-latency worldwide
- **Analytics**: Built-in search analytics

### Implementation Strategy
1. **MVP**: PostgreSQL full-text search
2. **Phase 2**: MeiliSearch for better UX
3. **Enterprise**: Option to use Algolia for managed solution

### Alternatives Considered
- **ElasticSearch**: Too heavy, complex setup
- **Typesense**: Similar to MeiliSearch, smaller community
- **PostgreSQL FTS**: Good for MVP, limited features
- **Client-side search**: Not scalable for large docs

---

## API Documentation: Swagger UI + Custom Components

### Decision
Use Swagger UI as base with custom React components for enhanced experience.

### Rationale
- **Industry standard**: Familiar to developers
- **Interactive**: Try-it-out functionality
- **OpenAPI support**: Standard spec format
- **Customizable**: Can wrap in custom UI
- **Multiple versions**: Support versioned APIs
- **Authentication**: Preview auth flows

### Enhancement Strategy
- Wrap Swagger UI in custom React components
- Add custom styling to match theme
- Integrate with authentication system
- Add examples from actual usage
- Link API docs to guide content

### Alternatives Considered
- **Redoc**: Beautiful but less interactive
- **Stoplight Elements**: Good but opinionated
- **Custom solution**: Too much effort to build
- **Postman**: Not embeddable

---

## Git Integration: Octokit (GitHub) + GitBeaker (GitLab)

### Decision
Use official SDKs for GitHub and GitLab integration.

### Rationale
- **Official SDKs**: Well-maintained, feature-complete
- **Type-safe**: TypeScript definitions included
- **REST + GraphQL**: Support both APIs
- **Webhooks**: Listen for repository events
- **Authentication**: OAuth2 and personal tokens
- **Rate limiting**: Built-in handling

### Integration Features
- Sync markdown files from repository
- Create commits from UI edits
- Webhook for automatic updates
- Branch-based preview deployments
- Pull request creation for suggestions

### Alternatives Considered
- **Simple Git**: Too low-level, requires git binary
- **Custom API calls**: Reinventing the wheel
- **GitLab SDK only**: Want to support both platforms

---

## Background Jobs: BullMQ

### Decision
Use BullMQ for background job processing.

### Rationale
- **Redis-based**: Reliable message queue
- **Type-safe**: TypeScript support
- **Retries**: Automatic retry with backoff
- **Priorities**: Job prioritization
- **Scheduling**: Delayed and repeated jobs
- **Monitoring**: Built-in UI for job status
- **Concurrency**: Parallel job processing

### Use Cases
- Git repository synchronization
- Analytics aggregation
- Webhook delivery
- Email notifications
- Search indexing
- PDF generation

### Alternatives Considered
- **Agenda**: MongoDB-based, less performant
- **pg-boss**: PostgreSQL-based, simpler but less features
- **Cloud functions**: More expensive, cold starts
- **Cron jobs**: Not suitable for on-demand tasks

---

## File Storage: S3-Compatible (S3/R2/MinIO)

### Decision
Support any S3-compatible storage provider.

### Rationale
- **Standard API**: Works with AWS S3, Cloudflare R2, MinIO
- **Scalable**: Handle unlimited files
- **CDN integration**: Serve files globally
- **Presigned URLs**: Secure direct uploads
- **Cost-effective**: R2 has no egress fees
- **Self-hostable**: MinIO for on-premise

### Storage Use Cases
- User-uploaded images
- Generated PDFs
- OpenAPI spec files
- Custom assets (logos, fonts)
- Analytics exports

### Alternatives Considered
- **Local filesystem**: Not scalable, not cloud-friendly
- **Database**: Too expensive for large files
- **Custom CDN**: Unnecessary complexity

---

## Deployment: Vercel (Frontend) + Railway/Supabase (Backend)

### Decision
Vercel for frontend hosting, Railway or Supabase for backend services.

### Rationale

**Vercel**
- **Next.js optimized**: Made by Next.js creators
- **Zero config**: Deploy with git push
- **Preview URLs**: Automatic PR previews
- **Edge network**: Global CDN
- **Serverless functions**: API routes handled
- **Environment variables**: Per-environment config
- **Analytics**: Built-in performance monitoring
- **Generous free tier**: Good for open-source

**Railway/Supabase**
- **PostgreSQL**: Managed database
- **Redis**: Managed cache
- **Simple pricing**: Predictable costs
- **Easy setup**: Database ready in minutes
- **Automatic backups**: Built-in disaster recovery
- **Staging environments**: Multiple environments

### Self-Hosting Option
Provide Docker Compose setup for complete self-hosting:
- Next.js in Docker container
- PostgreSQL container
- Redis container
- MeiliSearch container
- Nginx reverse proxy

### Alternatives Considered
- **AWS**: More complex, steeper learning curve
- **DigitalOcean**: Good but requires more setup
- **Heroku**: Expensive at scale
- **Self-hosted VPS**: Requires DevOps expertise

---

## Monitoring & Analytics: Sentry + PostHog

### Decision
Sentry for error tracking, PostHog for product analytics.

### Rationale

**Sentry**
- **Error tracking**: Catch and debug production errors
- **Source maps**: Debug minified code
- **Performance**: Track API latency
- **Releases**: Track which version has errors
- **Free tier**: Generous for small projects

**PostHog**
- **Open source**: Self-hostable
- **Event tracking**: User behavior analytics
- **Feature flags**: A/B testing support
- **Session replay**: Debug user issues
- **Free tier**: Good for startups

### Analytics Strategy
- Use PostHog for documentation analytics
- Build custom analytics dashboard
- Option to export data to customer's analytics

### Alternatives Considered
- **Google Analytics**: Privacy concerns, complex
- **Mixpanel**: Expensive at scale
- **Plausible**: Simple but limited features
- **Custom solution**: Time-consuming to build

---

## Testing Strategy

### Unit Tests: Vitest
- Fast, Vite-powered
- Compatible with Jest
- Built-in coverage

### E2E Tests: Playwright
- Cross-browser testing
- Network interception
- Screenshot testing
- Reliable and fast

### Integration Tests: Testing Library
- React Testing Library
- User-centric testing
- Accessible queries

---

## Summary of Key Decisions

| Category | Technology | Reason |
|----------|-----------|--------|
| Frontend | Next.js 14 | SSR, SEO, performance |
| Styling | TailwindCSS | Utility-first, customizable |
| Content | MDX | Extensible markdown |
| Database | PostgreSQL | Mature, relational |
| ORM | Prisma | Type-safe, great DX |
| Auth | NextAuth.js | Next.js native, flexible |
| Search | MeiliSearch | Fast, open-source |
| API Docs | Swagger UI | Industry standard |
| Jobs | BullMQ | Reliable, feature-rich |
| Storage | S3-compatible | Standard, scalable |
| Deploy | Vercel + Railway | Easy, performant |
| Monitoring | Sentry + PostHog | Error tracking + analytics |

---

## Future Considerations

### Scaling Beyond MVP
- **Multi-region**: Deploy closer to users
- **Read replicas**: Database scaling
- **Microservices**: Split monolith if needed
- **GraphQL**: Alternative API format
- **Websockets**: Real-time collaboration

### Alternative Stacks
- **Mobile apps**: React Native for mobile
- **Desktop apps**: Tauri for offline editing
- **CLI tools**: Node.js CLI for power users

This tech stack balances modern best practices with practical constraints, ensuring DocBolt is:
- Fast to develop
- Performant for users
- Scalable for growth
- Maintainable long-term
- Cost-effective to run
