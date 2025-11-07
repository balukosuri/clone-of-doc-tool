import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Code2,
  Search,
  Palette,
  GitBranch,
  BarChart3,
  Lock,
  Zap
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">DocBolt</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-sm hover:text-primary">
              Features
            </Link>
            <Link href="/docs" className="text-sm hover:text-primary">
              Documentation
            </Link>
            <Link href="/pricing" className="text-sm hover:text-primary">
              Pricing
            </Link>
            <Link href="/dashboard/projects">
              <Button size="sm">Go to Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Build Better{' '}
          <span className="text-primary">Documentation</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The modern documentation platform for API-first companies.
          Create, manage, and publish beautiful docs with ease.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link href="/dashboard/projects">
            <Button size="lg" className="text-lg px-8">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/projects">
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to ship great docs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Markdown Editor"
            description="Write in Markdown with live preview and WYSIWYG support"
          />
          <FeatureCard
            icon={<Code2 className="h-8 w-8" />}
            title="API Explorer"
            description="Auto-generate API docs from OpenAPI specs with try-it console"
          />
          <FeatureCard
            icon={<Palette className="h-8 w-8" />}
            title="Custom Themes"
            description="Match your brand with custom logos, colors, and styling"
          />
          <FeatureCard
            icon={<Search className="h-8 w-8" />}
            title="Fast Search"
            description="Lightning-fast full-text search across all documentation"
          />
          <FeatureCard
            icon={<GitBranch className="h-8 w-8" />}
            title="Git Integration"
            description="Sync with GitHub/GitLab for docs-as-code workflow"
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Analytics"
            description="Track page views, searches, and user feedback"
          />
          <FeatureCard
            icon={<Lock className="h-8 w-8" />}
            title="Private Docs"
            description="SSO and RBAC for internal/partner documentation"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Fast & Scalable"
            description="Built on Next.js for optimal performance"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-primary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sign up now and ship better docs today.
          </p>
          <Link href="/dashboard/projects">
            <Button size="lg" className="text-lg px-8">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/docs/guides" className="text-sm text-muted-foreground hover:text-foreground">Guides</Link></li>
                <li><Link href="/docs/api" className="text-sm text-muted-foreground hover:text-foreground">API Reference</Link></li>
                <li><Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
                <li><Link href="/security" className="text-sm text-muted-foreground hover:text-foreground">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 DocBolt. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
