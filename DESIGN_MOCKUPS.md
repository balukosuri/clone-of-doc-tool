# DocBolt UI/UX Design Mockups

This document provides visual mockups of how the DocBolt platform will look and feel.

---

## 1. Public Documentation Site (Reader View)

### Light Theme - Desktop View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  [DocBolt Logo]  Home  Docs  API Reference  Blog      🔍 Search  v2.0 ▼ │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                   │
│  ┌──────────────┬───────────────────────────────────────────┬─────────────┐   │
│  │              │                                             │             │   │
│  │  📚 GUIDES   │  # Getting Started with DocBolt           │  ON THIS    │   │
│  │  ▼           │                                             │  PAGE       │   │
│  │  ▸ Overview  │  Welcome to DocBolt! This guide will help │  ──────────  │   │
│  │  ▾ Getting   │  you get up and running in minutes.       │             │   │
│  │    Started   │                                             │  • Quick     │   │
│  │    • Intro   │  ## Quick Installation                     │    Install  │   │
│  │    • Install │                                             │  • Setup    │   │
│  │    • Config  │  You can install DocBolt using npm:        │  • First    │   │
│  │  ▸ Tutorials │                                             │    Project  │   │
│  │  ▸ Advanced  │  ```bash                                   │  • Next     │   │
│  │              │  npm install -g docbolt                    │    Steps    │   │
│  │  🔌 API REF  │  docbolt init my-docs                      │             │   │
│  │  ▸ Auth      │  cd my-docs                                │  ──────────  │   │
│  │  ▸ Projects  │  docbolt dev                               │             │   │
│  │  ▸ Pages     │  ```                                       │  🔗 LINKS   │   │
│  │  ▸ Versions  │                                             │             │   │
│  │              │  ℹ️ Note: Requires Node.js 18+             │  • GitHub   │   │
│  │  📦 SDKs     │                                             │  • Discord  │   │
│  │  ▸ JavaScript│  ## Setting Up Your First Project         │  • Twitter  │   │
│  │  ▸ Python    │                                             │             │   │
│  │  ▸ Go        │  Create a new project in 3 simple steps:  │             │   │
│  │  ▸ Ruby      │                                             │             │   │
│  │              │  1. **Initialize** - Run the init command  │             │   │
│  │  📰 UPDATES  │  2. **Configure** - Edit docbolt.config.js │             │   │
│  │  ▸ Changelog │  3. **Launch** - Start your docs site      │             │   │
│  │  ▸ Roadmap   │                                             │             │   │
│  │              │  [Try Interactive Demo →]                  │             │   │
│  │              │                                             │             │   │
│  │              │  ## Next Steps                             │             │   │
│  │              │                                             │             │   │
│  │              │  Once installed, check out:                │             │   │
│  │              │                                             │             │   │
│  │              │  • [Configuration Guide](./config) →       │             │   │
│  │              │  • [Your First Page](./first-page) →       │             │   │
│  │              │  • [Custom Themes](./themes) →             │             │   │
│  │              │                                             │             │   │
│  │              │  ──────────────────────────────────────     │             │   │
│  │              │  Was this page helpful?  👍 Yes  👎 No     │             │   │
│  │              │                                             │             │   │
│  │              │  Last updated: Nov 7, 2025 by @john        │             │   │
│  └──────────────┴───────────────────────────────────────────┴─────────────┘   │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  © 2025 DocBolt • Privacy • Terms • Status                               │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Dark Theme - Desktop View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ████████████████████████████████████████████████████████████████████████████████│
│ █                                                                              █ │
│ █ ┌────────────────────────────────────────────────────────────────────────┐ █ │
│ █ │ [🌙 Logo] Home Docs API Blog        🔍 Search  v2.0 ▼  🌓  [Login]   │ █ │
│ █ └────────────────────────────────────────────────────────────────────────┘ █ │
│ █                                                                              █ │
│ █ ┌────────┬─────────────────────────────────────────────┬───────────┐      █ │
│ █ │        │                                               │           │      █ │
│ █ │ 📚 API │ # Authentication                             │ ON PAGE   │      █ │
│ █ │ ▾      │                                               │ ───────   │      █ │
│ █ │ Auth ✓ │ All API requests require authentication      │ • Overview│      █ │
│ █ │ Users  │ using API keys or OAuth 2.0.                 │ • API Keys│      █ │
│ █ │ Teams  │                                               │ • OAuth   │      █ │
│ █ │        │ ## API Key Authentication                    │ • Examples│      █ │
│ █ │        │                                               │           │      █ │
│ █ │        │ Include your API key in the header:          │           │      █ │
│ █ │        │                                               │           │      █ │
│ █ │        │ ```bash                                      │           │      █ │
│ █ │        │ curl -H "Authorization: Bearer YOUR_KEY" \   │           │      █ │
│ █ │        │   https://api.example.com/v1/users           │           │      █ │
│ █ │        │ ```                                          │           │      █ │
│ █ │        │                                               │           │      █ │
│ █ │        │ ⚠️ Warning: Never expose keys in client code │           │      █ │
│ █ │        │                                               │           │      █ │
│ █ │        │ ## Code Examples                             │           │      █ │
│ █ │        │                                               │           │      █ │
│ █ │        │ [JavaScript] [Python] [cURL] [Go]            │           │      █ │
│ █ │        │ ┌─────────────────────────────────────────┐ │           │      █ │
│ █ │        │ │ const client = new DocBolt({            │ │           │      █ │
│ █ │        │ │   apiKey: process.env.DOCBOLT_API_KEY   │ │           │      █ │
│ █ │        │ │ });                                      │ │           │      █ │
│ █ │        │ │                                          │ │           │      █ │
│ █ │        │ │ const users = await client.users.list();│ │           │      █ │
│ █ │        │ └─────────────────────────────────────────┘ │           │      █ │
│ █ └────────┴─────────────────────────────────────────────┴───────────┘      █ │
│ █                                                                              █ │
│ ████████████████████████████████████████████████████████████████████████████████│
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile View (Responsive)

```
┌──────────────────────┐
│ ☰  [Logo]  🔍  v2.0 ▼│
├──────────────────────┤
│                      │
│ # Getting Started    │
│                      │
│ Welcome to DocBolt!  │
│ This guide will help │
│ you get started.     │
│                      │
│ ## Quick Install     │
│                      │
│ ```bash              │
│ npm install -g       │
│   docbolt            │
│ ```                  │
│                      │
│ ℹ️ Requires Node 18+ │
│                      │
│ [Try Demo →]         │
│                      │
│ ─────────────────    │
│ 👍 Yes  👎 No        │
│                      │
└──────────────────────┘
```

---

## 2. Admin Dashboard (Content Management)

### Dashboard Home

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt] Dashboard                           🔍 Search    🔔    [Avatar ▼]     │
│                                                                                   │
│  ┌────────────────┬────────────────────────────────────────────────────────┐   │
│  │                │                                                          │   │
│  │  🏠 Dashboard  │  Welcome back, John! 👋                                 │   │
│  │                │                                                          │   │
│  │  📄 Projects   │  ┌────────────┬────────────┬────────────┬────────────┐ │   │
│  │                │  │            │            │            │            │ │   │
│  │  📝 Pages      │  │   📊 14.6k │   ⭐ 98%  │   👤 158   │   🔍 2.4k │ │   │
│  │                │  │  Page Views│  Avg Score │  New Users │  Searches │ │   │
│  │  🎨 Appearance │  │  ↑ 12%     │  ↑ 2%     │  ↑ 24%    │  ↓ 8%     │ │   │
│  │                │  │            │            │            │            │ │   │
│  │  📚 Versions   │  └────────────┴────────────┴────────────┴────────────┘ │   │
│  │                │                                                          │   │
│  │  🔗 Integrat.  │  📈 PAGE VIEWS (Last 7 days)                            │   │
│  │                │  ┌────────────────────────────────────────────────┐    │   │
│  │  👥 Team       │  │ 3k │                          ████              │    │   │
│  │                │  │ 2k │              ████  ████  ████  ████        │    │   │
│  │  ⚙️  Settings  │  │ 1k │  ████  ████  ████  ████  ████  ████  ████  │    │   │
│  │                │  │    └─────┬─────┬─────┬─────┬─────┬─────┬─────┘    │   │
│  │  ──────────    │  │         Mon   Tue   Wed   Thu   Fri   Sat   Sun   │    │
│  │                │  └────────────────────────────────────────────────┘    │   │
│  │  📊 Analytics  │                                                          │   │
│  │  💬 Feedback   │  🔥 TOP PAGES THIS WEEK                                │   │
│  │  🔔 Activity   │  ┌────────────────────────────────────────────────┐    │   │
│  │                │  │ 1. Getting Started Guide       1,248 views  ⭐100% │ │   │
│  │  ──────────    │  │ 2. API Authentication           892 views  ⭐ 96% │ │   │
│  │                │  │ 3. Quick Start Tutorial         734 views  ⭐ 94% │ │   │
│  │  📖 Docs       │  │ 4. Configuration Reference      521 views  ⭐ 89% │ │   │
│  │  💡 Help       │  │ 5. Deployment Guide             445 views  ⭐ 92% │ │   │
│  │                │  └────────────────────────────────────────────────┘    │   │
│  │                │                                                          │   │
│  │                │  🔍 TOP SEARCHES                    📝 RECENT ACTIVITY  │   │
│  │                │  ┌─────────────────────────┐  ┌─────────────────────┐ │   │
│  │                │  │ 1. authentication        │  │ Sarah edited        │ │   │
│  │                │  │ 2. api key               │  │ "API Reference"     │ │   │
│  │                │  │ 3. deployment            │  │ 2 mins ago          │ │   │
│  │                │  │ 4. webhooks              │  │                     │ │   │
│  │                │  │ 5. rate limits           │  │ Mike published      │ │   │
│  │                │  └─────────────────────────┘  │ v2.1 docs           │ │   │
│  │                │                                │ 15 mins ago         │ │   │
│  │                │                                │                     │ │   │
│  │                │                                │ Jane created page   │ │   │
│  │                │                                │ "Webhooks Guide"    │ │   │
│  │                │                                │ 1 hour ago          │ │   │
│  │                │                                └─────────────────────┘ │   │
│  └────────────────┴────────────────────────────────────────────────────────┘   │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Markdown Editor (Split View)

### Editor Interface with Live Preview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt] Editor                     [💾 Save] [👁️ Preview] [⚙️]   [Avatar ▼] │
│                                                                                   │
│  ← Back to Pages                      📄 getting-started.mdx                     │
│                                                                                   │
│  ┌────────────────┬─────────────────────────────┬────────────────────────────┐ │
│  │                │                               │                            │ │
│  │  📁 Files      │  MARKDOWN SOURCE              │  LIVE PREVIEW              │ │
│  │  ──────        │  ─────────────────            │  ─────────────             │ │
│  │  ▾ 📁 guides   │                               │                            │ │
│  │    • intro.mdx │  ---                          │  # Getting Started         │ │
│  │    • getting-  │  title: "Getting Started"     │                            │ │
│  │      started ✓ │  description: "Quick start"   │  Welcome to DocBolt!      │ │
│  │    • config    │  sidebar_position: 1          │                            │ │
│  │  ▾ 📁 api      │  ---                          │  ## Quick Installation     │ │
│  │    • auth      │                               │                            │ │
│  │    • users     │  # Getting Started            │  You can install using:   │ │
│  │  ▸ 📁 sdk      │                               │                            │ │
│  │  • changelog   │  Welcome to **DocBolt**!      │  npm install -g docbolt   │ │
│  │                │                               │                            │ │
│  │  ──────        │  ## Quick Installation        │  ℹ️ Note: Requires        │ │
│  │                │                               │  Node.js 18+               │ │
│  │  [+ New Page]  │  You can install using:       │                            │ │
│  │  [+ New Fold.] │                               │  ## Setting Up            │ │
│  │                │  ```bash                      │                            │ │
│  │  ──────        │  npm install -g docbolt       │  Create a project:        │ │
│  │                │  ```                          │                            │ │
│  │  PAGE SETTINGS │                               │  1. Initialize            │ │
│  │                │  :::note                      │  2. Configure             │ │
│  │  Status:       │  Requires Node.js 18+         │  3. Launch                │ │
│  │  ● Published   │  :::                          │                            │ │
│  │                │                               │  [Try Demo →]             │ │
│  │  Version:      │  ## Setting Up Your Project   │                            │ │
│  │  ▾ v2.0        │                               │                            │ │
│  │                │  Create a project in 3 steps: │                            │ │
│  │  Modified:     │                               │                            │ │
│  │  2 mins ago    │  1. **Initialize** - Run init │                            │ │
│  │                │  2. **Configure** - Edit file │                            │ │
│  │  Author:       │  3. **Launch** - Start server │                            │ │
│  │  John Doe      │                               │                            │ │
│  │                │  [Try Interactive Demo →]     │                            │ │
│  │                │                               │                            │ │
│  │                │                               │                            │ │
│  └────────────────┴─────────────────────────────┴────────────────────────────┘ │
│                                                                                   │
│  Ln 18, Col 24    Markdown     ✓ Saved 2 mins ago                  100%         │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Editor Toolbar & Shortcuts

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  [B] [I] [U] [S] | [H1] [H2] [H3] | [Link] [Image] [Code] | [Table]   │
│   Bold Italic Underline Strike | Headers | Insert Elements              │
│                                                                           │
│  [List] [Quote] [Divider] | [Callout] [Tabs] [Accordion] | [Preview]   │
│                                                                           │
│  ─────────────────────────────────────────────────────────────────────   │
│                                                                           │
│  💡 Quick Actions (Type "/" for menu):                                   │
│     /heading    - Insert heading                                         │
│     /code       - Insert code block                                      │
│     /image      - Upload image                                           │
│     /table      - Insert table                                           │
│     /callout    - Insert callout box                                     │
│     /link       - Insert link to another page                            │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. API Reference Explorer (Interactive)

### OpenAPI Generated Reference

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt]  API Reference                    🔍 Search endpoints     v2.0 ▼      │
│                                                                                   │
│  ┌─────────────────┬────────────────────────────────────────────────────────┐  │
│  │                 │                                                          │  │
│  │  AUTHENTICATION │  POST /api/v1/auth/login                                │  │
│  │  • Login        │  ═══════════════════════════════════════                │  │
│  │  • Refresh      │                                                          │  │
│  │  • Logout       │  Authenticate a user and receive access token.          │  │
│  │                 │                                                          │  │
│  │  USERS          │  [Body] [Headers] [Response]                            │  │
│  │  • List users   │                                                          │  │
│  │  • Get user     │  REQUEST BODY                                           │  │
│  │  • Create user  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  • Update user  │  │ {                                                │  │  │
│  │  • Delete user  │  │   "email": "user@example.com",                   │  │  │
│  │                 │  │   "password": "••••••••"                         │  │  │
│  │  PROJECTS       │  │ }                                                │  │  │
│  │  • List         │  └──────────────────────────────────────────────────┘  │  │
│  │  • Get project  │                                                          │  │
│  │  • Create       │  PARAMETERS                                             │  │
│  │  • Update       │  ─────────────────────────────────────                 │  │
│  │  • Delete       │  • email    string  required  User's email             │  │
│  │                 │  • password string  required  User's password          │  │
│  │  WEBHOOKS       │                                                          │  │
│  │  • List         │  ┌────────────────────────────────────────────────┐    │  │
│  │  • Create       │  │  🧪 TRY IT OUT                                  │    │  │
│  │  • Test         │  │  ─────────────                                  │    │  │
│  │                 │  │                                                  │    │  │
│  │  ANALYTICS      │  │  Email:     [user@example.com             ]    │    │  │
│  │  • Get metrics  │  │                                                  │    │  │
│  │  • Get events   │  │  Password:  [••••••••••••••••             ]    │    │  │
│  │                 │  │                                                  │    │  │
│  │                 │  │  [⚡ Send Request]                              │    │  │
│  │                 │  │                                                  │    │  │
│  │                 │  │  Response: (200 OK) ✓                           │    │  │
│  │                 │  │  ┌────────────────────────────────────────────┐│    │  │
│  │                 │  │  │{                                            ││    │  │
│  │                 │  │  │  "token": "eyJhbGciOiJIUzI1...",           ││    │  │
│  │                 │  │  │  "user": {                                  ││    │  │
│  │                 │  │  │    "id": "usr_123",                        ││    │  │
│  │                 │  │  │    "email": "user@example.com"             ││    │  │
│  │                 │  │  │  },                                         ││    │  │
│  │                 │  │  │  "expires_in": 3600                        ││    │  │
│  │                 │  │  │}                                            ││    │  │
│  │                 │  │  └────────────────────────────────────────────┘│    │  │
│  │                 │  │                                                  │    │  │
│  │                 │  └────────────────────────────────────────────────┘    │  │
│  │                 │                                                          │  │
│  │                 │  CODE EXAMPLES                                          │  │
│  │                 │  [cURL] [JavaScript] [Python] [Go]                     │  │
│  │                 │  ┌──────────────────────────────────────────────────┐  │  │
│  │                 │  │ curl -X POST https://api.example.com/v1/auth/... │  │  │
│  │                 │  │   -H "Content-Type: application/json" \          │  │  │
│  │                 │  │   -d '{"email":"user@example.com","password":"'  │  │  │
│  │                 │  └──────────────────────────────────────────────────┘  │  │
│  │                 │                                                          │  │
│  └─────────────────┴────────────────────────────────────────────────────────┘  │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Project Settings & Theming

### Appearance Settings

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt] Settings                                              [Avatar ▼]      │
│                                                                                   │
│  ┌─────────────────┬─────────────────────────────────────────────────────────┐ │
│  │                 │                                                           │ │
│  │  ⚙️  General    │  🎨 APPEARANCE                                           │ │
│  │                 │                                                           │ │
│  │  🎨 Appearance  │  Logo & Branding                                         │ │
│  │                 │  ────────────────                                        │ │
│  │  👥 Team        │  ┌──────────────┐                                       │ │
│  │                 │  │  [Logo]      │  [Upload New Logo]  [Remove]         │ │
│  │  🔐 Auth & SSO  │  │   DocBolt    │                                       │ │
│  │                 │  │              │  Recommended: 200x50px, PNG/SVG       │ │
│  │  🔗 Integrat.   │  └──────────────┘                                       │ │
│  │                 │                                                           │ │
│  │  📚 Versions    │  Theme Colors                                            │ │
│  │                 │  ─────────────                                           │ │
│  │  🔍 Search      │  Primary:   [#3B82F6  🎨]   ■ Preview                  │ │
│  │                 │  Secondary: [#10B981  🎨]   ■ Preview                  │ │
│  │  📊 Analytics   │  Accent:    [#F59E0B  🎨]   ■ Preview                  │ │
│  │                 │  Background:[#FFFFFF  🎨]   ■ Preview                  │ │
│  │  🪝 Webhooks    │  Text:      [#1F2937  🎨]   ■ Preview                  │ │
│  │                 │                                                           │ │
│  │  🗑️  Danger     │  [ ] Auto-generate theme from logo                      │ │
│  │                 │                                                           │ │
│  │                 │  Display Options                                         │ │
│  │                 │  ────────────────                                        │ │
│  │                 │  [✓] Enable dark mode toggle                            │ │
│  │                 │  [✓] Show version selector                              │ │
│  │                 │  [✓] Display search bar in header                       │ │
│  │                 │  [✓] Show table of contents on pages                    │ │
│  │                 │  [ ] Sticky header navigation                            │ │
│  │                 │                                                           │ │
│  │                 │  Custom CSS                                              │ │
│  │                 │  ──────────                                              │ │
│  │                 │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │ /* Add custom styles here */                      │  │ │
│  │                 │  │ .docs-content h1 {                                 │  │ │
│  │                 │  │   font-size: 2.5rem;                              │  │ │
│  │                 │  │   font-weight: 700;                               │  │ │
│  │                 │  │ }                                                  │  │ │
│  │                 │  │                                                    │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  │                 │  LIVE PREVIEW                                            │ │
│  │                 │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │ [DocBolt] Home Docs API  🔍        🌓  v2.0 ▼   │  │ │
│  │                 │  │ ─────────────────────────────────────────────────  │  │ │
│  │                 │  │                                                    │  │ │
│  │                 │  │ # Example Page Title                              │  │ │
│  │                 │  │                                                    │  │ │
│  │                 │  │ This is how your docs will look with these       │  │ │
│  │                 │  │ theme settings applied.                           │  │ │
│  │                 │  │                                                    │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  │                 │  [Save Changes]  [Reset to Defaults]                    │ │
│  │                 │                                                           │ │
│  └─────────────────┴─────────────────────────────────────────────────────────┘ │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Landing Page Builder

### Custom Landing Page Editor

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt] Landing Page Editor                [💾 Save] [👁️ Preview] [Publish]  │
│                                                                                   │
│  ┌─────────────────┬─────────────────────────────────────────────────────────┐ │
│  │                 │                                                           │ │
│  │  📦 COMPONENTS  │  CANVAS                                                  │ │
│  │                 │                                                           │ │
│  │  Drag & Drop:   │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │                                                     │  │ │
│  │  [Hero]         │  │  🖼️  HERO SECTION                                  │  │ │
│  │  [Features]     │  │                                                     │  │ │
│  │  [CTA Button]   │  │  # Build Better Docs                               │  │ │
│  │  [Code Block]   │  │  The modern documentation platform for API-first  │  │ │
│  │  [Image]        │  │  companies                                         │  │ │
│  │  [Video]        │  │                                                     │  │ │
│  │  [Testimonial]  │  │  [Get Started Free →]  [View Demo]                │  │ │
│  │  [FAQ]          │  │                                                     │  │ │
│  │  [Pricing]      │  │  Background: [Gradient] 🎨                        │  │ │
│  │  [Contact]      │  └───────────────────────────────────────────────────┘  │ │
│  │  [Divider]      │                                                           │ │
│  │  [Spacer]       │  ┌───────────────────────────────────────────────────┐  │ │
│  │  [Custom HTML]  │  │  ⭐⭐⭐ FEATURES GRID                             │  │ │
│  │                 │  │                                                     │  │ │
│  │  ──────────     │  │  📝 Markdown      🎨 Themes       🔍 Search        │  │ │
│  │                 │  │  Write in MD      Custom look     Fast & accurate │  │ │
│  │  SETTINGS       │  │                                                     │  │ │
│  │                 │  │  🔌 APIs          📊 Analytics    🔒 Private       │  │ │
│  │  Page Title:    │  │  Auto-generated   Track usage     Secure docs     │  │ │
│  │  [Home]         │  │                                                     │  │ │
│  │                 │  │  Layout: [Grid - 3 columns] 🎨                    │  │ │
│  │  Slug:          │  └───────────────────────────────────────────────────┘  │ │
│  │  [/]            │                                                           │ │
│  │                 │  ┌───────────────────────────────────────────────────┐  │ │
│  │  SEO:           │  │  📋 CODE EXAMPLE                                   │  │ │
│  │  [Edit Meta]    │  │                                                     │  │ │
│  │                 │  │  ```bash                                           │  │ │
│  │  Layout:        │  │  npm install docbolt                               │  │ │
│  │  ○ Full Width   │  │  docbolt init                                      │  │ │
│  │  ● Contained    │  │  docbolt dev                                       │  │ │
│  │                 │  │  ```                                               │  │ │
│  │  Header/Footer: │  │                                                     │  │ │
│  │  [✓] Show       │  │  Style: [Terminal] 🎨                             │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  │                 │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │  🎯 CALL-TO-ACTION                                 │  │ │
│  │                 │  │                                                     │  │ │
│  │                 │  │  Ready to get started?                             │  │ │
│  │                 │  │  Sign up now and ship better docs today.          │  │ │
│  │                 │  │                                                     │  │ │
│  │                 │  │  [Start Free Trial →]                             │  │ │
│  │                 │  │                                                     │  │ │
│  │                 │  │  Alignment: [Center] Background: [Primary] 🎨    │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  │                 │  [+ Add Section]                                         │ │
│  │                 │                                                           │ │
│  └─────────────────┴─────────────────────────────────────────────────────────┘ │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Changelog Page

### Public Changelog View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt]  Home  Docs  API  Changelog                    🔍 Search    v2.0 ▼   │
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                             │  │
│  │  # Changelog                                                [🔔 Subscribe] │  │
│  │                                                             [📰 RSS Feed]  │  │
│  │  All the latest updates, improvements, and fixes.                          │  │
│  │                                                                             │  │
│  │  Filter:  [All] [Added] [Changed] [Fixed] [Deprecated]                    │  │
│  │                                                                             │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │
│  │                                                                             │  │
│  │  📅 November 7, 2025                                             v2.1.0    │  │
│  │                                                                             │  │
│  │  ✨ Added                                                                   │  │
│  │  • Dark mode support with automatic theme detection                        │  │
│  │  • New API endpoint for bulk user operations                               │  │
│  │  • Export documentation as PDF                                             │  │
│  │                                                                             │  │
│  │  🔧 Changed                                                                 │  │
│  │  • Improved search performance by 3x                                       │  │
│  │  • Updated editor with better syntax highlighting                          │  │
│  │  • Redesigned mobile navigation for better UX                              │  │
│  │                                                                             │  │
│  │  🐛 Fixed                                                                   │  │
│  │  • Code blocks now properly scroll on mobile                               │  │
│  │  • Fixed issue with image uploads > 5MB                                    │  │
│  │  • Resolved authentication timeout issues                                  │  │
│  │                                                                             │  │
│  │  [Read Full Release Notes →]                                               │  │
│  │                                                                             │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │
│  │                                                                             │  │
│  │  📅 October 28, 2025                                             v2.0.5    │  │
│  │                                                                             │  │
│  │  🔧 Changed                                                                 │  │
│  │  • Enhanced API rate limiting with better error messages                   │  │
│  │  • Updated dependencies for security patches                               │  │
│  │                                                                             │  │
│  │  🐛 Fixed                                                                   │  │
│  │  • Fixed webhook payload validation                                        │  │
│  │  • Corrected timezone display in analytics                                 │  │
│  │                                                                             │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │
│  │                                                                             │  │
│  │  📅 October 15, 2025                                             v2.0.0 🎉 │  │
│  │                                                                             │  │
│  │  ✨ Added                                                                   │  │
│  │  • 🚀 Major version release!                                               │  │
│  │  • OpenAPI 3.1 support with interactive explorer                           │  │
│  │  • Multi-version documentation                                             │  │
│  │  • Git-based workflow with GitHub/GitLab sync                              │  │
│  │  • Advanced analytics dashboard                                            │  │
│  │  • SSO integration (OAuth, SAML)                                           │  │
│  │  • Custom domain support                                                   │  │
│  │                                                                             │  │
│  │  ⚠️ Breaking Changes                                                       │  │
│  │  • API v1 endpoints deprecated (use v2)                                    │  │
│  │  • New authentication flow required                                        │  │
│  │                                                                             │  │
│  │  [Migration Guide →]                                                       │  │
│  │                                                                             │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │
│  │                                                                             │  │
│  │  [Load More...]                                                             │  │
│  │                                                                             │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Analytics Dashboard

### Detailed Analytics View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt] Analytics                                           [Avatar ▼]        │
│                                                                                   │
│  Date Range: [Last 30 days ▼]  Compare: [Previous period]  Export: [CSV] [PDF] │
│                                                                                   │
│  ┌─────────────────┬─────────────────────────────────────────────────────────┐ │
│  │                 │                                                           │ │
│  │  📊 Overview    │  KEY METRICS                                             │ │
│  │                 │  ┌─────────────┬─────────────┬─────────────┬──────────┐ │ │
│  │  📈 Traffic     │  │   📄 42.3k  │   👤 8,234  │   ⭐ 96.2% │  🔍 9.4k │ │ │
│  │                 │  │  Page Views │  Users      │  Avg Score │  Searches │ │ │
│  │  🔍 Search      │  │  ↑ 18.2%    │  ↑ 24.1%   │  ↑ 1.8%    │  ↑ 15.3% │ │ │
│  │                 │  └─────────────┴─────────────┴─────────────┴──────────┘ │ │
│  │  💬 Feedback    │                                                           │ │
│  │                 │  📈 PAGE VIEWS TREND                                     │ │
│  │  👥 Users       │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │10k│                                      ████       │  │ │
│  │  🌍 Geography   │  │ 8k│                          ████  ████  ████  ████ │  │ │
│  │                 │  │ 6k│              ████  ████  ████  ████  ████  ████ │  │ │
│  │  📱 Devices     │  │ 4k│  ████  ████  ████  ████  ████  ████  ████  ████ │  │ │
│  │                 │  │ 2k│  ████  ████  ████  ████  ████  ████  ████  ████ │  │ │
│  │  ⏱️  Performance│  │   └────┬────┬────┬────┬────┬────┬────┬────┬────┘  │  │ │
│  │                 │  │      Week1  2    3    4    5    6    7    8        │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  │                 │  🔥 TOP PERFORMING PAGES                                 │ │
│  │                 │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │ Page                        Views   Score   Trend  │  │ │
│  │                 │  │ ─────────────────────────────────────────────────  │  │ │
│  │                 │  │ 1. Getting Started          4,892   98%    ↗↗↗   │  │ │
│  │                 │  │ 2. API Authentication       3,421   95%    ↗↗     │  │ │
│  │                 │  │ 3. Quick Start Tutorial     2,788   97%    ↗      │  │ │
│  │                 │  │ 4. Configuration Guide      2,156   92%    →      │  │ │
│  │                 │  │ 5. Deployment Options       1,944   89%    ↗      │  │ │
│  │                 │  │ 6. Webhooks Reference       1,732   94%    ↗↗     │  │ │
│  │                 │  │ 7. SDK Installation         1,621   91%    →      │  │ │
│  │                 │  │ 8. Troubleshooting         1,458   87%    ↘      │  │ │
│  │                 │  │ 9. API Rate Limits          1,234   93%    ↗      │  │ │
│  │                 │  │ 10. Security Best Practices 1,092   96%    ↗↗     │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  │                 │  ⚠️ PAGES NEEDING ATTENTION                              │ │
│  │                 │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │ • Error Handling Guide      892 views  👎 67%     │  │ │
│  │                 │  │ • Advanced Configuration    634 views  👎 72%     │  │ │
│  │                 │  │ • Legacy API Reference      445 views  👎 58%     │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  │                 │  🔍 TOP SEARCH QUERIES (Last 30 days)                   │ │
│  │                 │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │ Query              Count  Click Rate  Avg Position │  │ │
│  │                 │  │ ───────────────────────────────────────────────────│  │ │
│  │                 │  │ authentication      1,234    89%        1.2       │  │ │
│  │                 │  │ api key              892    92%        1.1       │  │ │
│  │                 │  │ webhooks             734    85%        1.4       │  │ │
│  │                 │  │ rate limiting        621    78%        2.1       │  │ │
│  │                 │  │ oauth                567    91%        1.3       │  │ │
│  │                 │  │ deployment           489    82%        1.8       │  │ │
│  │                 │  │ pagination           445    76%        2.3       │  │ │
│  │                 │  │ ssl certificate       89    12%        8.4 ⚠️    │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  │                 │  💬 RECENT FEEDBACK                                      │ │
│  │                 │  ┌───────────────────────────────────────────────────┐  │ │
│  │                 │  │ 👎 "The webhook setup instructions are unclear"   │  │ │
│  │                 │  │    Page: Webhooks Guide • 5 mins ago              │  │ │
│  │                 │  │                                                    │  │ │
│  │                 │  │ 👍 "Super helpful, worked perfectly!"             │  │ │
│  │                 │  │    Page: Getting Started • 12 mins ago            │  │ │
│  │                 │  │                                                    │  │ │
│  │                 │  │ 👎 "Missing information about error codes"        │  │ │
│  │                 │  │    Page: API Reference • 28 mins ago              │  │ │
│  │                 │  │                                                    │  │ │
│  │                 │  │ [View All Feedback →]                             │  │ │
│  │                 │  └───────────────────────────────────────────────────┘  │ │
│  │                 │                                                           │ │
│  └─────────────────┴─────────────────────────────────────────────────────────┘ │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Team Management

### Team & Permissions View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt] Team                                  [+ Invite Member]  [Avatar ▼]   │
│                                                                                   │
│  ┌─────────────────┬─────────────────────────────────────────────────────────┐ │
│  │                 │                                                           │ │
│  │  ⚙️  General    │  TEAM MEMBERS (8)                                        │ │
│  │                 │                                                           │ │
│  │  🎨 Appearance  │  ┌─────────────────────────────────────────────────────┐│ │
│  │                 │  │ 👤  John Doe                         john@example.com││ │
│  │  👥 Team        │  │     Owner                                   [Remove] ││ │
│  │                 │  │     Last active: 2 mins ago                          ││ │
│  │  🔐 Auth & SSO  │  └─────────────────────────────────────────────────────┘│ │
│  │                 │                                                           │ │
│  │  🔗 Integrat.   │  ┌─────────────────────────────────────────────────────┐│ │
│  │                 │  │ 👤  Sarah Smith                     sarah@example.com││ │
│  │  📚 Versions    │  │     Editor                      [Change Role ▼] [•••]│ │
│  │                 │  │     Last active: 15 mins ago                         ││ │
│  │  🔍 Search      │  └─────────────────────────────────────────────────────┘│ │
│  │                 │                                                           │ │
│  │  📊 Analytics   │  ┌─────────────────────────────────────────────────────┐│ │
│  │                 │  │ 👤  Mike Johnson                    mike@example.com ││ │
│  │  🪝 Webhooks    │  │     Editor                      [Change Role ▼] [•••]│ │
│  │                 │  │     Last active: 1 hour ago                          ││ │
│  │  🗑️  Danger     │  └─────────────────────────────────────────────────────┘│ │
│  │                 │                                                           │ │
│  │                 │  ┌─────────────────────────────────────────────────────┐│ │
│  │                 │  │ 👤  Jane Wilson                     jane@example.com ││ │
│  │                 │  │     Viewer                      [Change Role ▼] [•••]│ │
│  │                 │  │     Last active: 2 days ago                          ││ │
│  │                 │  └─────────────────────────────────────────────────────┘│ │
│  │                 │                                                           │ │
│  │                 │  ┌─────────────────────────────────────────────────────┐│ │
│  │                 │  │ 📧  tom@example.com                                  ││ │
│  │                 │  │     Invited • Pending acceptance         [Resend] [×]││ │
│  │                 │  │     Sent: 3 days ago                                 ││ │
│  │                 │  └─────────────────────────────────────────────────────┘│ │
│  │                 │                                                           │ │
│  │                 │  ROLE PERMISSIONS                                        │ │
│  │                 │  ┌─────────────────────────────────────────────────────┐│ │
│  │                 │  │ Permission          Owner   Editor   Viewer          ││ │
│  │                 │  │ ──────────────────────────────────────────────────  ││ │
│  │                 │  │ View docs             ✓       ✓        ✓           ││ │
│  │                 │  │ Edit content          ✓       ✓        ✗           ││ │
│  │                 │  │ Publish changes       ✓       ✓        ✗           ││ │
│  │                 │  │ Manage versions       ✓       ✗        ✗           ││ │
│  │                 │  │ Manage team           ✓       ✗        ✗           ││ │
│  │                 │  │ Change settings       ✓       ✗        ✗           ││ │
│  │                 │  │ View analytics        ✓       ✓        ✗           ││ │
│  │                 │  │ Manage billing        ✓       ✗        ✗           ││ │
│  │                 │  │ Delete project        ✓       ✗        ✗           ││ │
│  │                 │  └─────────────────────────────────────────────────────┘│ │
│  │                 │                                                           │ │
│  │                 │  [Create Custom Role]                                    │ │
│  │                 │                                                           │ │
│  └─────────────────┴─────────────────────────────────────────────────────────┘ │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Version Selector & Management

### Public Version Selector (Dropdown)

```
┌──────────────────────────────────┐
│  Documentation Version           │
│  ──────────────────────────────  │
│                                   │
│  ✓ v2.0 (Latest)                 │
│    v1.5                           │
│    v1.0                           │
│    v0.9 (Beta)                    │
│                                   │
│  ─────────────────────────────   │
│                                   │
│  📖 All Versions                  │
│  📝 Changelog                     │
│                                   │
└──────────────────────────────────┘
```

### Admin Version Management

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                   │
│  [DocBolt] Versions                          [+ Create New Version]  [Avatar ▼] │
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                             │  │
│  │  PUBLISHED VERSIONS                                                        │  │
│  │                                                                             │  │
│  │  ┌────────────────────────────────────────────────────────────────────┐   │  │
│  │  │  v2.0                                        ✓ Latest  ⭐ Default   │   │  │
│  │  │  ──────────────────────────────────────────────────────────────     │   │  │
│  │  │  Created: Nov 1, 2025 • 234 pages • Git branch: v2.0-docs         │   │  │
│  │  │                                                                     │   │  │
│  │  │  [Edit] [Make Hidden] [Set as Default] [•••]                       │   │  │
│  │  └────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                             │  │
│  │  ┌────────────────────────────────────────────────────────────────────┐   │  │
│  │  │  v1.5                                        🌐 Public              │   │  │
│  │  │  ──────────────────────────────────────────────────────────────     │   │  │
│  │  │  Created: Sep 15, 2025 • 189 pages • Git branch: v1.5-docs        │   │  │
│  │  │                                                                     │   │  │
│  │  │  [Edit] [Make Hidden] [Deprecate] [•••]                            │   │  │
│  │  └────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                             │  │
│  │  ┌────────────────────────────────────────────────────────────────────┐   │  │
│  │  │  v1.0                                        🌐 Public              │   │  │
│  │  │  ──────────────────────────────────────────────────────────────     │   │  │
│  │  │  Created: Jun 10, 2025 • 156 pages • Git branch: v1.0-docs        │   │  │
│  │  │                                                                     │   │  │
│  │  │  [Edit] [Make Hidden] [Archive] [•••]                              │   │  │
│  │  └────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                             │  │
│  │  DRAFT VERSIONS                                                            │  │
│  │                                                                             │  │
│  │  ┌────────────────────────────────────────────────────────────────────┐   │  │
│  │  │  v2.1 (Draft)                                🔒 Private            │   │  │
│  │  │  ──────────────────────────────────────────────────────────────     │   │  │
│  │  │  Created: Nov 7, 2025 • 45 pages • Git branch: v2.1-docs          │   │  │
│  │  │                                                                     │   │  │
│  │  │  [Edit] [Publish] [Delete] [•••]                                   │   │  │
│  │  └────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                             │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Design System

### Color Palette (Light Theme)

```
Primary:     #3B82F6 (Blue)     ■■■■■
Secondary:   #10B981 (Green)    ■■■■■
Accent:      #F59E0B (Amber)    ■■■■■
Background:  #FFFFFF (White)    ■■■■■
Surface:     #F9FAFB (Gray 50)  ■■■■■
Text:        #1F2937 (Gray 800) ■■■■■
Border:      #E5E7EB (Gray 200) ■■■■■
```

### Color Palette (Dark Theme)

```
Primary:     #60A5FA (Blue)     ████████
Secondary:   #34D399 (Green)    ████████
Accent:      #FBBF24 (Amber)    ████████
Background:  #111827 (Gray 900) ████████
Surface:     #1F2937 (Gray 800) ████████
Text:        #F9FAFB (Gray 50)  ████████
Border:      #374151 (Gray 700) ████████
```

### Typography

```
Headings:    Inter, sans-serif
Body:        Inter, sans-serif
Code:        JetBrains Mono, Fira Code, monospace

H1:          2.25rem (36px) • 700 weight
H2:          1.875rem (30px) • 700 weight
H3:          1.5rem (24px) • 600 weight
H4:          1.25rem (20px) • 600 weight
Body:        1rem (16px) • 400 weight
Small:       0.875rem (14px) • 400 weight
```

### Spacing & Layout

```
Container Max Width:  1280px
Sidebar Width:        280px
TOC Width:            240px
Content Max Width:    780px
Spacing Scale:        4px base (4, 8, 12, 16, 24, 32, 48, 64px)
```

### Component Examples

#### Button Variants

```
┌─────────────────────────────────────────────┐
│                                              │
│  [  Primary Button  ]  (Solid, Primary)    │
│                                              │
│  [  Secondary Button  ]  (Outline)          │
│                                              │
│  [  Text Button  ]  (Ghost)                 │
│                                              │
│  [  Danger Button  ]  (Solid, Red)          │
│                                              │
└─────────────────────────────────────────────┘
```

#### Form Elements

```
┌─────────────────────────────────────────────┐
│                                              │
│  Label                                       │
│  [Input field              ]                │
│                                              │
│  Label with help text                        │
│  [Input field              ] ?               │
│  ℹ️ Helper text here                         │
│                                              │
│  Dropdown                                    │
│  [Select option...         ▼]               │
│                                              │
│  Checkbox                                    │
│  ☑ Option 1                                  │
│  ☐ Option 2                                  │
│                                              │
│  Radio buttons                               │
│  ⦿ Option 1                                  │
│  ○ Option 2                                  │
│                                              │
└─────────────────────────────────────────────┘
```

#### Alerts & Callouts

```
┌─────────────────────────────────────────────┐
│                                              │
│  ℹ️ INFO                                     │
│  This is an informational message            │
│                                              │
│  ✅ SUCCESS                                  │
│  Operation completed successfully            │
│                                              │
│  ⚠️ WARNING                                  │
│  Please review before continuing             │
│                                              │
│  ❌ ERROR                                    │
│  Something went wrong                        │
│                                              │
│  💡 TIP                                      │
│  Pro tip: Try this approach                  │
│                                              │
└─────────────────────────────────────────────┘
```

---

## Responsive Breakpoints

```
Mobile:    < 640px   (Stack sidebar, full-width content)
Tablet:    640-1024px (Collapsible sidebar, adjusted spacing)
Desktop:   > 1024px  (Full three-column layout)
Wide:      > 1536px  (Max width container, increased spacing)
```

---

## User Flows

### 1. New User Onboarding
```
Sign Up → Email Verification → Create Project → Import/Write First Doc → Customize Theme → Publish
```

### 2. Content Creation
```
Login → Select Project → New Page → Write Markdown → Preview → Publish → View Live
```

### 3. API Documentation
```
Upload OpenAPI Spec → Auto-generate Reference → Customize → Add Try-It Keys → Publish
```

### 4. Git Workflow
```
Connect Repo → Configure Branch → Auto-sync On → Push to Git → Auto-rebuild → Live Update
```

---

This completes the comprehensive UI/UX mockups for DocBolt! Every major screen and component has been visualized to guide the implementation. 🎨
