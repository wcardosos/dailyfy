import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Category, Report } from '@/types';
import { ReportDescriptionType } from '@/types/report-description-type';
import { REPORT_CATEGORIES } from '@/utils/constants';
import { Label } from '@radix-ui/react-label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useEffect, useRef, useState } from 'react';

interface ReportDialogProps {
  onClose: () => void;
  onAction: (report: Omit<Report, 'id'> | Report) => void;
  action: 'add' | 'edit';
  report?: Report;
}

export function ReportDialog({
  onClose,
  onAction,
  action,
  report,
}: Readonly<ReportDialogProps>) {
  const [title, setTitle] = useState<string>(report?.title ?? '');
  const [description, setDescription] = useState<string>(
    report?.description ?? '',
  );
  const [category, setCategory] = useState<Category>(
    report?.category ?? 'done',
  );
  const [descriptionType, setDescriptionType] =
    useState<ReportDescriptionType>('plain-text');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAction({ title, description, category, descriptionType });

    if (action === 'add') {
      setTitle('');
      setDescription('');
      setCategory('done');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (textareaRef.current) {
        const textarea = textareaRef.current;
        const cursorPosition = textarea.selectionStart;
        const beforeCursorText = description.slice(0, cursorPosition);
        const afterCursorText = description.slice(cursorPosition);

        setDescription(`${beforeCursorText}\n• ${afterCursorText}`);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
        }, 0);
      }
    }
  };

  useEffect(() => {
    if (action === 'add') {
      if (descriptionType === 'topics' && !description.startsWith('•')) {
        setDescription((prev) => '• ' + prev);
      }
    } else if (action === 'edit') {
      if (
        descriptionType === 'topics' &&
        report!.descriptionType !== 'topics'
      ) {
        setDescription((prev) => '• ' + prev);
      }
    }
  }, [descriptionType]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === 'add' ? 'Add New Report' : 'Edit Report'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <Tabs
            value={descriptionType}
            onValueChange={(value: string) =>
              setDescriptionType(value as ReportDescriptionType)
            }
          >
            <TabsList>
              <TabsTrigger value="plain-text">Plain Text</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>
            <TabsContent value="plain-text">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </TabsContent>
            <TabsContent value="topics">
              <Label htmlFor="description-topics">Description</Label>
              <Textarea
                id="description-topics"
                ref={textareaRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </TabsContent>
          </Tabs>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(value: Category) => setCategory(value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_CATEGORIES.map((categoryInfo) => (
                  <SelectItem
                    key={categoryInfo.value}
                    value={categoryInfo.value}
                  >
                    {categoryInfo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">
            {action === 'add' ? 'Add' : 'Edit'} Report
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
