import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { getDefaultUser } from '@/lib/default-user';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getDefaultUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <DashboardNav />
          <UserNav user={user} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
