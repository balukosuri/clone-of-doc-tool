'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

export function FeedbackWidget({
  projectId,
  pageId,
}: {
  projectId: string;
  pageId: string;
}) {
  const [feedback, setFeedback] = useState<'HELPFUL' | 'NOT_HELPFUL' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const handleFeedback = async (type: 'HELPFUL' | 'NOT_HELPFUL') => {
    setFeedback(type);
    setShowComment(true);

    // Submit immediately if no comment
    if (!showComment) {
      await submitFeedback(type, '');
    }
  };

  const submitFeedback = async (type: 'HELPFUL' | 'NOT_HELPFUL', commentText: string) => {
    try {
      await fetch(`/api/projects/${projectId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          type,
          comment: commentText || null,
          userAgent: navigator.userAgent,
        }),
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleCommentSubmit = () => {
    if (feedback) {
      submitFeedback(feedback, comment);
    }
  };

  if (submitted) {
    return (
      <Card className="mt-8">
        <CardContent className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for your feedback! 🎉
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Was this page helpful?
        </CardTitle>
        <CardDescription>
          Let us know how we can improve our documentation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={feedback === 'HELPFUL' ? 'default' : 'outline'}
            onClick={() => handleFeedback('HELPFUL')}
            disabled={submitted}
            className="flex-1"
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Yes, helpful
          </Button>
          <Button
            variant={feedback === 'NOT_HELPFUL' ? 'default' : 'outline'}
            onClick={() => handleFeedback('NOT_HELPFUL')}
            disabled={submitted}
            className="flex-1"
          >
            <ThumbsDown className="mr-2 h-4 w-4" />
            No, not helpful
          </Button>
        </div>

        {showComment && !submitted && (
          <div className="space-y-2">
            <Textarea
              placeholder="Tell us more... (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button onClick={handleCommentSubmit} size="sm">
              Submit Feedback
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
