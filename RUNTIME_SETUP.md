# DocBolt - Complete Runtime Setup & Build Instructions

## 🚨 IMPORTANT: Complete This Setup Before Running

This document contains ALL the steps needed to get DocBolt fully working on your local machine.

## Phase 1: Initial Setup (5 minutes)

### 1. Install Dependencies

```bash
cd /home/user/clone-of-doc-tool
npm install
```

This will install ~200MB of dependencies. Wait for it to complete.

### 2. Copy Environment File

```bash
cp .env.example .env
```

The `.env` file is already configured for local development - no changes needed.

### 3. Start Docker Services

```bash
npm run docker:up
```

This starts PostgreSQL, Redis, and MeiliSearch. Wait for healthy status:

```bash
# Check services are running
docker ps
```

You should see 3 containers running.

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates all tables)
npm run db:push
```

This creates 20+ tables in PostgreSQL.

## Phase 2: Build Missing Components (15 minutes)

Some UI components from shadcn/ui need to be added. Run these commands:

```bash
cd apps/web

# Install shadcn/ui components
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

When prompted:
- Style: **Default**
- Base color: **Slate** (or your preference)
- CSS variables: **Yes**

## Phase 3: Fix NextAuth Configuration (2 minutes)

The NextAuth package needs a type definition. Create this file:

```bash
# Create types directory
mkdir -p apps/web/types

# Create next-auth.d.ts
cat > apps/web/types/next-auth.d.ts << 'EOF'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
EOF
```

## Phase 4: Install Missing Dependencies (1 minute)

```bash
cd /home/user/clone-of-doc-tool

# Install @auth/prisma-adapter
npm install @auth/prisma-adapter

# Install missing Next.js types
cd apps/web
npm install --save-dev @types/next-auth
```

## Phase 5: Start Development Server (1 minute)

```bash
cd /home/user/clone-of-doc-tool
npm run dev
```

The app will be available at: **http://localhost:3000**

## What You Can Do Now

### ✅ Working Features:

1. **Homepage** (http://localhost:3000)
   - Beautiful landing page
   - Features grid
   - Navigation
   - Dark mode toggle

2. **Authentication** (http://localhost:3000/auth/signin)
   - Sign up with email/password
   - Sign in with email/password
   - OAuth (Google/GitHub) - needs API keys in .env
   - Password validation
   - Error handling

3. **Dashboard** (http://localhost:3000/dashboard/projects)
   - Protected routes (requires sign in)
   - User navigation
   - User dropdown menu with avatar
   - Sign out functionality

### 🚧 Still To Build:

Follow BUILD_GUIDE.md to implement:
- Project CRUD operations
- Markdown editor
- Documentation reader
- All Phase 2 & 3 features

## Testing the App

### 1. Create an Account

```bash
# Visit http://localhost:3000/auth/signup
# Fill in:
#   Name: Test User
#   Email: test@example.com
#   Password: password123
# Click "Create Account"
```

### 2. Sign In

```bash
# Visit http://localhost:3000/auth/signin
# Use the credentials you just created
# Click "Sign In"
```

### 3. Access Dashboard

After signing in, you'll be redirected to `/dashboard/projects`.

Currently you'll see the dashboard layout with navigation, but no projects yet (that's the next feature to build).

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on different port
PORT=3001 npm run dev
```

### Database Connection Error

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# If not running, restart Docker services
npm run docker:down
npm run docker:up

# Wait 10 seconds for services to start, then:
npm run db:push
```

### Prisma Client Not Found

```bash
# Regenerate Prisma Client
npm run db:generate
```

### Module Not Found Errors

```bash
# Clear and reinstall
rm -rf node_modules apps/web/node_modules packages/database/node_modules
npm install
npm run db:generate
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf apps/web/.next

# Restart dev server
npm run dev
```

## Database Management

### View Database

```bash
# Open Prisma Studio (visual DB editor)
npm run db:studio
```

Opens at http://localhost:5555

### Reset Database

```bash
# WARNING: This deletes all data
npm run db:push --force-reset
```

### Run Migrations

```bash
# For production, use migrations instead of push
npm run db:migrate
```

## OAuth Setup (Optional)

To enable Google/GitHub sign in:

### Google OAuth

1. Go to: https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to .env:

```bash
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### GitHub OAuth

1. Go to: https://github.com/settings/developers
2. Create new OAuth App
3. Add callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to .env:

```bash
GITHUB_CLIENT_ID="your-client-id"
GITHUB_CLIENT_SECRET="your-client-secret"
```

Restart the dev server after adding OAuth credentials.

## Next Steps

You now have:
- ✅ Working authentication system
- ✅ Database with full schema
- ✅ Docker services running
- ✅ Dashboard layout
- ✅ User navigation

**Next:** Implement Project Management (see BUILD_GUIDE.md Week 3-4)

This involves:
1. Creating the projects list page
2. Adding "Create Project" dialog
3. Implementing project API routes
4. Building project cards
5. Adding project settings

All code examples are in BUILD_GUIDE.md!

## Success! 🎉

If you can:
- ✅ Visit the homepage
- ✅ Sign up for an account
- ✅ Sign in
- ✅ See the dashboard with your name

**You're ready to continue building!**

Need help? Check:
- BUILD_GUIDE.md for implementation examples
- PROJECT_STATUS.md for what's done vs pending
- SETUP.md for general info

Happy coding! 💪
