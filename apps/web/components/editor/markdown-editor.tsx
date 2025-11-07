'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Bold,
  Italic,
  Code,
  Link,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Image,
} from 'lucide-react';
import { markdownToHtml } from '@/lib/markdown';

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const updatePreview = async () => {
      const html = await markdownToHtml(value);
      setPreview(html);
    };
    updatePreview();
  }, [value]);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <Card>
      <Tabs defaultValue="write" className="w-full">
        <div className="border-b px-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            {/* Toolbar */}
            <div className="flex items-center space-x-1 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('# ')}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('## ')}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('### ')}
                title="Heading 3"
              >
                <Heading3 className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('**', '**')}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('*', '*')}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('`', '`')}
                title="Inline Code"
              >
                <Code className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('[', '](url)')}
                title="Link"
              >
                <Link className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('![alt](', ')')}
                title="Image"
              >
                <Image className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('- ')}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('1. ')}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('> ')}
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="write" className="m-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Write your content in Markdown...'}
            className="min-h-[600px] border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 font-mono"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div
            className="prose dark:prose-invert max-w-none p-6 min-h-[600px]"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
