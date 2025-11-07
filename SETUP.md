# DocBolt Setup Guide

Get DocBolt running on your local machine in minutes.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Docker**: For running PostgreSQL, Redis, and MeiliSearch

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all dependencies for the monorepo (root, web app, and database package).

### 2. Start Docker Services

```bash
npm run docker:up
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- MeiliSearch on port 7700

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

The default `.env.example` has all the correct values for local development. You can use it as-is.

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

This creates all the database tables from the Prisma schema.

### 5. Start Development Server

```bash
npm run dev
```

The app will be running at: **http://localhost:3000**

## What You'll See

### Homepage
Visit http://localhost:3000 to see the marketing homepage with:
- Hero section
- Features grid
- Call-to-action sections
- Navigation (Sign In / Sign Up)

### Current Status

✅ **Working:**
- Project structure (Turborepo monorepo)
- Database schema (20+ models with Prisma)
- Docker services configuration
- Next.js 14 app with App Router
- TailwindCSS styling
- TypeScript configuration
- Beautiful homepage UI

🚧 **To Be Built:**
- Authentication system (see BUILD_GUIDE.md Week 1-2)
- Admin dashboard (see BUILD_GUIDE.md Week 3-4)
- Markdown editor (see BUILD_GUIDE.md Week 5-6)
- Documentation reader (see BUILD_GUIDE.md Week 7-8)
- All Phase 2 & 3 features

## Next Steps

### Option 1: Build Everything Yourself

Follow the **BUILD_GUIDE.md** which provides:
- Week-by-week implementation plan
- Code examples for every feature
- File-by-file guide
- API implementation examples
- Testing strategies

### Option 2: Install UI Components

The app uses shadcn/ui components. Install them:

```bash
cd apps/web

# Initialize shadcn/ui
npx shadcn-ui@latest init

# Install commonly needed components
npx shadcn-ui@latest add button input card dialog dropdown-menu
npx shadcn-ui@latest add form label select separator switch
npx shadcn-ui@latest add tabs textarea toast tooltip
```

### Option 3: Start with Authentication

Create the authentication system first (most critical):

1. **Install NextAuth.js** (already in package.json)
2. **Create `apps/web/lib/auth.ts`** - See BUILD_GUIDE.md for full code
3. **Create auth pages:**
   - `apps/web/app/(auth)/signin/page.tsx`
   - `apps/web/app/(auth)/signup/page.tsx`
4. **Create auth API route:**
   - `apps/web/app/api/auth/[...nextauth]/route.ts`

## Project Structure

```
docbolt/
├── apps/
│   └── web/                    # Next.js application
│       ├── app/                # App Router pages
│       │   ├── layout.tsx      # Root layout ✅
│       │   ├── page.tsx        # Homepage ✅
│       │   └── globals.css     # Global styles ✅
│       ├── components/         # React components
│       │   ├── ui/             # UI components ✅
│       │   ├── theme-provider.tsx ✅
│       │   └── ...            # Add more components
│       ├── lib/                # Utilities
│       │   └── utils.ts        # Helper functions ✅
│       ├── package.json        # Dependencies ✅
│       ├── next.config.js      # Next.js config ✅
│       ├── tailwind.config.ts  # Tailwind config ✅
│       └── tsconfig.json       # TypeScript config ✅
│
├── packages/
│   └── database/               # Prisma package
│       ├── prisma/
│       │   └── schema.prisma   # Database schema ✅
│       ├── index.ts            # Prisma client ✅
│       ├── package.json        # Dependencies ✅
│       └── tsconfig.json       # TypeScript config ✅
│
├── docker-compose.yml          # Services ✅
├── package.json                # Root package.json ✅
├── turbo.json                  # Turbo config ✅
├── .env.example                # Environment template ✅
├── .gitignore                  # Git ignore ✅
├── README.md                   # Project README ✅
├── IMPLEMENTATION_PLAN.md      # Full roadmap ✅
├── BUILD_GUIDE.md              # Build instructions ✅
├── DESIGN_MOCKUPS.md           # UI mockups ✅
└── SETUP.md                    # This file ✅
```

## Development Workflow

### Making Changes

1. Edit files in `apps/web/`
2. Hot reload will update the browser automatically
3. Check http://localhost:3000 to see changes

### Database Changes

If you modify `packages/database/prisma/schema.prisma`:

```bash
# Generate new Prisma Client
npm run db:generate

# Push changes to database
npm run db:push
```

### Adding New Pages

1. Create a new file in `apps/web/app/`
2. Example: `apps/web/app/about/page.tsx`
3. Export a default component
4. It's automatically available at `/about`

### Adding New Components

1. Create files in `apps/web/components/`
2. Import them in your pages
3. Use TypeScript for props

## Common Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server

# Database
npm run db:generate        # Generate Prisma Client
npm run db:push            # Push schema to DB
npm run db:migrate         # Create migration
npm run db:studio          # Open Prisma Studio (DB GUI)

# Docker
npm run docker:up          # Start services
npm run docker:down        # Stop services

# Utilities
npm run lint               # Lint code
npm run format             # Format code with Prettier
npm run clean              # Clean build artifacts
```

## Troubleshooting

### Port Already in Use

If port 3000 is taken:
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or run on different port
PORT=3001 npm run dev
```

### Docker Services Not Starting

```bash
# Check Docker is running
docker ps

# Restart services
npm run docker:down
npm run docker:up

# View logs
docker-compose logs -f
```

### Database Connection Error

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check connection string in .env
cat .env | grep DATABASE_URL

# Regenerate Prisma Client
npm run db:generate
```

### Type Errors

```bash
# Regenerate Prisma Client
npm run db:generate

# Restart TypeScript server in VS Code
# Press Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf apps/web/.next

# Clear all caches and reinstall
npm run clean
rm -rf node_modules
npm install
npm run db:generate
npm run dev
```

## VS Code Setup (Recommended)

### Recommended Extensions

- **Prisma** - Syntax highlighting for Prisma schema
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **ESLint** - Linting
- **Prettier** - Code formatting

### Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Database Schema Overview

The Prisma schema includes:

- **User & Auth**: Users, Accounts, Sessions
- **Projects**: Projects, ProjectMembers
- **Content**: Pages, Versions, Assets
- **API Docs**: ApiSpec (OpenAPI support)
- **Features**: Changelogs, LandingPages
- **Integrations**: Git, Webhooks, Analytics
- **Engagement**: Feedback, Analytics, Activity logs

See `packages/database/prisma/schema.prisma` for full schema.

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Railway

1. Create new project
2. Add PostgreSQL, Redis services
3. Deploy web app
4. Set environment variables

### Docker

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## Need Help?

1. Check **BUILD_GUIDE.md** for implementation details
2. Review **IMPLEMENTATION_PLAN.md** for architecture
3. See **DESIGN_MOCKUPS.md** for UI reference
4. Check GitHub Issues for common problems

## Success! 🎉

You now have:

✅ A running Next.js application
✅ Database with comprehensive schema
✅ Docker services (PostgreSQL, Redis, MeiliSearch)
✅ Beautiful homepage with Tailwind CSS
✅ Complete documentation for building all features

**Next:** Follow BUILD_GUIDE.md to implement all features phase by phase!
