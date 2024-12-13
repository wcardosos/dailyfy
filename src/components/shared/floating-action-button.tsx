import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export function FloatingActionButton({
  onClick,
}: Readonly<FloatingActionButtonProps>) {
  return (
    <div className="fixed bottom-6 right-6">
      <Button
        variant="default"
        className="rounded-full p-4 h-auto"
        onClick={onClick}
      >
        <Plus />
      </Button>
    </div>
  );
}
