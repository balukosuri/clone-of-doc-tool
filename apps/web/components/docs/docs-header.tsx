'use client';

import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VersionSelector } from './version-selector';

interface Version {
  id: string;
  name: string;
  slug: string;
  isDefault: boolean;
}

interface Project {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
}

export function DocsHeader({
  project,
  versions,
  defaultVersion,
}: {
  project: Project;
  versions: Version[];
  defaultVersion: Version;
}) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href={`/${project.slug}`} className="flex items-center space-x-2">
              {project.logo ? (
                <img src={project.logo} alt={project.name} className="h-8 w-auto" />
              ) : (
                <BookOpen className="h-6 w-6 text-primary" />
              )}
              <span className="text-xl font-bold">{project.name}</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href={`/${project.slug}`}
                className="text-sm font-medium hover:text-primary"
              >
                Documentation
              </Link>
              <Link
                href={`/${project.slug}/changelog`}
                className="text-sm font-medium hover:text-primary"
              >
                Changelog
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>

            <VersionSelector
              versions={versions}
              currentVersion={defaultVersion}
              projectSlug={project.slug}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
