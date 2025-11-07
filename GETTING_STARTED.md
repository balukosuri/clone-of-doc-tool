# Getting Started with DocBolt Development

This guide will help you set up your development environment and start building DocBolt.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ (recommend using `nvm` for version management)
- **pnpm** 8+ (faster than npm, better monorepo support)
- **Docker** and **Docker Compose** (for local database)
- **Git** (version control)
- **VS Code** (recommended editor) with extensions:
  - ESLint
  - Prettier
  - Prisma
  - Tailwind CSS IntelliSense

---

## Step 1: Initialize the Project

### Create Monorepo Structure with Turborepo

```bash
# Create project directory
mkdir docbolt
cd docbolt

# Initialize Turborepo
npx create-turbo@latest

# Follow prompts:
# - Package manager: pnpm
# - Example: basic (then we'll customize)
```

### Alternative: Manual Setup

```bash
# Initialize with Next.js
npx create-next-app@latest apps/web --typescript --tailwind --app --use-pnpm

# Initialize root package.json
pnpm init

# Install Turborepo
pnpm add turbo -w -D
```

---

## Step 2: Configure Workspace

### Create `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Create `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

### Update root `package.json`

```json
{
  "name": "docbolt",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean && rm -rf node_modules",
    "db:generate": "cd packages/database && pnpm db:generate",
    "db:migrate": "cd packages/database && pnpm db:migrate",
    "db:studio": "cd packages/database && pnpm db:studio"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.3.0"
  }
}
```

---

## Step 3: Set Up Next.js Application

### Navigate to web app

```bash
cd apps/web
```

### Install core dependencies

```bash
pnpm add next@latest react@latest react-dom@latest
pnpm add -D typescript @types/react @types/node

# Styling
pnpm add tailwindcss postcss autoprefixer
pnpm add class-variance-authority clsx tailwind-merge

# shadcn/ui
pnpm add @radix-ui/react-*  # Install as needed
pnpm add lucide-react  # Icons

# MDX
pnpm add @next/mdx @mdx-js/loader @mdx-js/react
pnpm add remark-gfm rehype-highlight rehype-slug rehype-autolink-headings
pnpm add gray-matter

# Forms & validation
pnpm add react-hook-form zod @hookform/resolvers

# Data fetching
pnpm add @tanstack/react-query axios

# State management
pnpm add zustand
```

### Configure `next.config.js`

```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-highlight'),
      require('rehype-slug'),
      require('rehype-autolink-headings'),
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    serverActions: true,
  },
}

module.exports = withMDX(nextConfig)
```

### Configure `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Add more colors from shadcn/ui
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## Step 4: Set Up Database Package

### Create database package

```bash
mkdir -p packages/database
cd packages/database
pnpm init
```

### Install Prisma

```bash
pnpm add @prisma/client
pnpm add -D prisma
```

### Initialize Prisma

```bash
npx prisma init
```

### Create `packages/database/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Start with basic models
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String
  role          Role      @default(VIEWER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Project {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum Role {
  ADMIN
  USER
  VIEWER
}
```

### Create database package scripts

Update `packages/database/package.json`:

```json
{
  "name": "@docbolt/database",
  "version": "0.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "tsx src/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0"
  },
  "devDependencies": {
    "prisma": "^5.7.0",
    "tsx": "^4.7.0"
  }
}
```

### Create `packages/database/src/index.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export * from '@prisma/client'
```

---

## Step 5: Set Up Docker for Local Development

### Create `docker-compose.yml` in root

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: docbolt-postgres
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: docbolt
      POSTGRES_PASSWORD: docbolt
      POSTGRES_DB: docbolt
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: docbolt-redis
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

  meilisearch:
    image: getmeili/meilisearch:latest
    container_name: docbolt-meilisearch
    ports:
      - '7700:7700'
    environment:
      MEILI_MASTER_KEY: masterKey
    volumes:
      - meilisearch_data:/meili_data

volumes:
  postgres_data:
  redis_data:
  meilisearch_data:
```

### Start services

```bash
docker-compose up -d
```

---

## Step 6: Environment Variables

### Create `.env` file in root

```bash
# Database
DATABASE_URL="postgresql://docbolt:docbolt@localhost:5432/docbolt"

# Redis
REDIS_URL="redis://localhost:6379"

# MeiliSearch
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_API_KEY="masterKey"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-this"

# App
NODE_ENV="development"
```

### Create `.env.example`

```bash
cp .env .env.example
# Remove sensitive values from .env.example
```

### Add to `.gitignore`

```
.env
.env.local
.env*.local
```

---

## Step 7: Initialize Database

```bash
# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate

# (Optional) Seed database
pnpm db:seed
```

---

## Step 8: Set Up Authentication

### Install NextAuth.js

```bash
cd apps/web
pnpm add next-auth@beta @auth/prisma-adapter
pnpm add bcrypt
pnpm add -D @types/bcrypt
```

### Create `app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@docbolt/database'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }
```

---

## Step 9: Create Basic App Structure

### Create route groups

```bash
cd apps/web
mkdir -p app/{(auth),(dashboard),(docs)}
```

### Create basic layouts

`app/(docs)/layout.tsx`:
```typescript
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r">
        {/* Sidebar navigation */}
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
```

---

## Step 10: Start Development

### Run the development server

```bash
# From root directory
pnpm dev
```

### Open your browser

Visit `http://localhost:3000`

---

## Useful Commands

```bash
# Development
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all apps
pnpm lint             # Lint all apps
pnpm type-check       # Type check all apps

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema without migration
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database

# Docker
docker-compose up -d           # Start services
docker-compose down            # Stop services
docker-compose logs -f         # View logs
docker-compose ps              # List services
```

---

## Next Steps

Now that your development environment is set up:

1. **Read the Implementation Plan**: Review `IMPLEMENTATION_PLAN.md` for detailed feature breakdown
2. **Set up shadcn/ui**: Run `npx shadcn-ui@latest init` and add components
3. **Build the MDX Editor**: Start with Phase 1 features
4. **Create Documentation Layout**: Build the reader experience
5. **Implement Authentication**: Complete login/register flows
6. **Add Testing**: Set up Vitest and Playwright

---

## Troubleshooting

### Database connection issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# Check logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d
pnpm db:migrate
```

### Prisma issues
```bash
# Clear cache and regenerate
rm -rf node_modules/.prisma
pnpm db:generate
```

### Port conflicts
```bash
# Check what's using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

---

## Development Tips

1. **Use TypeScript strictly**: Enable strict mode in `tsconfig.json`
2. **Commit often**: Small, focused commits are easier to review
3. **Write tests early**: Don't wait until the end
4. **Use Prisma Studio**: Great for debugging database issues
5. **Enable ESLint/Prettier**: Consistent code style matters
6. **Use React DevTools**: Debug component issues easily
7. **Check Vercel Analytics**: Monitor performance from day one

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [MDX Documentation](https://mdxjs.com)

Happy coding!
