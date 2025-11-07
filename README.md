# DocBolt

A modern, open-source alternative to ReadMe.io for building beautiful, interactive documentation sites.

## Features

### Core Features (MVP)
- Custom-themed documentation with light/dark mode
- Markdown/MDX authoring with live preview
- Auto-generated navigation and table of contents
- Multi-version documentation support
- Role-based access control
- Responsive, mobile-optimized design

### Enhanced Features
- OpenAPI/Swagger interactive API explorer
- Git-based workflow (GitHub/GitLab sync)
- Full-text search across all documentation
- Landing page builder
- Changelog management
- Advanced theming and customization

### Enterprise Features
- SSO integration (SAML, OAuth2/OIDC)
- Analytics dashboard with insights
- Content APIs and webhooks
- Feedback widgets and user engagement
- Third-party integrations (Slack, Discord, etc.)
- Multi-region deployment

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend**: Node.js, Prisma ORM
- **Database**: PostgreSQL
- **Search**: MeiliSearch or Algolia
- **Auth**: NextAuth.js
- **Deployment**: Vercel, Railway, Supabase

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/docbolt.git
cd docbolt

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your documentation site.

## Project Structure

```
docbolt/
├── apps/
│   └── web/              # Next.js application
├── packages/
│   ├── database/         # Prisma schema and migrations
│   ├── ui/              # Shared UI components
│   └── config/          # Shared configuration
├── docs/                # Project documentation
└── docker/              # Docker configuration
```

## Documentation

- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - Detailed development roadmap
- [Architecture](./docs/architecture.md) - System architecture overview
- [API Documentation](./docs/api.md) - API reference
- [Deployment Guide](./docs/deployment.md) - Deployment instructions

## Development Phases

### Phase 1: MVP (8 weeks)
Core documentation platform with authoring and rendering capabilities.

### Phase 2: Enhanced Features (8 weeks)
API explorer, Git integration, search, and landing pages.

### Phase 3: Enterprise Features (8 weeks)
SSO, analytics, webhooks, and advanced integrations.

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed breakdown.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details.

## Support

- Documentation: [docs.docbolt.io](https://docs.docbolt.io)
- Issues: [GitHub Issues](https://github.com/yourusername/docbolt/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/docbolt/discussions)

## Roadmap

See our [public roadmap](https://github.com/yourusername/docbolt/projects/1) for upcoming features and improvements.
