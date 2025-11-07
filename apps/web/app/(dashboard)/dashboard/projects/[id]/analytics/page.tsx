import { db } from '@workspace/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Eye, Search, Users, TrendingUp } from 'lucide-react';

export const revalidate = 0; // Disable caching for real-time data

export default async function AnalyticsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await db.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  // Get analytics for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const analytics = await db.analytics.findMany({
    where: {
      projectId: params.id,
      timestamp: {
        gte: thirtyDaysAgo,
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
  });

  // Calculate metrics
  const pageViews = analytics.filter((a) => a.event === 'page_view').length;
  const searches = analytics.filter((a) => a.event === 'search').length;
  const uniqueVisitors = new Set(analytics.map((a) => a.visitorId)).size;

  // Get feedback
  const feedback = await db.feedback.findMany({
    where: {
      projectId: params.id,
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  const positiveFeedback = feedback.filter((f) => f.type === 'HELPFUL').length;
  const negativeFeedback = feedback.filter((f) => f.type === 'NOT_HELPFUL').length;
  const satisfactionRate =
    feedback.length > 0
      ? Math.round((positiveFeedback / feedback.length) * 100)
      : 0;

  // Top pages
  const pageViewCounts: Record<string, number> = {};
  analytics.filter((a) => a.event === 'page_view').forEach((a) => {
    const pageId = a.pageId || 'unknown';
    pageViewCounts[pageId] = (pageViewCounts[pageId] || 0) + 1;
  });

  const topPageIds = Object.entries(pageViewCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([pageId]) => pageId);

  const topPages = await db.page.findMany({
    where: {
      id: {
        in: topPageIds,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Insights and metrics for {project.name} (Last 30 days)
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total page views
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Distinct visitors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Searches</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{searches.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total searches performed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{satisfactionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {positiveFeedback} helpful, {negativeFeedback} not helpful
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most viewed pages in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {topPages.length === 0 ? (
            <p className="text-muted-foreground text-sm">No page views yet</p>
          ) : (
            <div className="space-y-4">
              {topPages.map((page) => {
                const views = pageViewCounts[page.id] || 0;
                const percentage = pageViews > 0 ? Math.round((views / pageViews) * 100) : 0;

                return (
                  <div key={page.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-muted-foreground">/{page.slug}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{views.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest user feedback on your documentation</CardDescription>
        </CardHeader>
        <CardContent>
          {feedback.length === 0 ? (
            <p className="text-muted-foreground text-sm">No feedback yet</p>
          ) : (
            <div className="space-y-4">
              {feedback.slice(0, 10).map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className="mt-1">
                    {item.type === 'HELPFUL' ? (
                      <div className="text-green-500">👍</div>
                    ) : (
                      <div className="text-red-500">👎</div>
                    )}
                  </div>
                  <div className="flex-1">
                    {item.comment && (
                      <p className="text-sm mb-1">{item.comment}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
