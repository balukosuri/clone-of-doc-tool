'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

interface Version {
  id: string;
  name: string;
  slug: string;
  isDefault: boolean;
}

export function VersionSelector({
  versions,
  currentVersion,
  projectSlug,
}: {
  versions: Version[];
  currentVersion: Version;
  projectSlug: string;
}) {
  const router = useRouter();

  if (versions.length <= 1) return null;

  return (
    <Select
      value={currentVersion.slug}
      onValueChange={(value) => {
        // For now, just refresh the page
        // In a real app, you'd navigate to the version-specific URL
        router.refresh();
      }}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {versions.map((version) => (
          <SelectItem key={version.id} value={version.slug}>
            {version.name}
            {version.isDefault && ' (latest)'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
