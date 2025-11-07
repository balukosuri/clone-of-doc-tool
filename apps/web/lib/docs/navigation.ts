import { db } from '@docbolt/database';

export interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  order: number;
  children: NavigationItem[];
}

export async function buildNavigation(
  projectId: string,
  versionId: string
): Promise<NavigationItem[]> {
  const pages = await db.page.findMany({
    where: {
      projectId,
      versionId,
      status: 'PUBLISHED',
      isHidden: false,
    },
    orderBy: [
      { order: 'asc' },
      { title: 'asc' },
    ],
  });

  // Build tree structure
  return buildTree(pages, null);
}

function buildTree(pages: any[], parentId: string | null): NavigationItem[] {
  return pages
    .filter((page) => page.parentId === parentId)
    .map((page) => ({
      id: page.id,
      title: page.title,
      slug: page.slug,
      order: page.order,
      children: buildTree(pages, page.id),
    }));
}

export async function getPageBySlug(
  projectSlug: string,
  pageSlug: string,
  versionSlug?: string
) {
  const project = await db.project.findUnique({
    where: { slug: projectSlug },
    include: {
      versions: {
        where: {
          isPublished: true,
          ...(versionSlug && { slug: versionSlug }),
        },
      },
    },
  });

  if (!project) return null;

  const version = versionSlug
    ? project.versions.find((v) => v.slug === versionSlug)
    : project.versions.find((v) => v.isDefault) || project.versions[0];

  if (!version) return null;

  const page = await db.page.findFirst({
    where: {
      projectId: project.id,
      versionId: version.id,
      slug: pageSlug,
      status: 'PUBLISHED',
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      version: true,
    },
  });

  return page;
}
