
import React from 'react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  shortcutKey: string;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  title, 
  description, 
  icon, 
  shortcutKey,
  className
}) => {
  return (
    <div className={cn(
      "border border-freefire-purple/20 rounded-lg p-4 ff-tools-card-gradient hover:border-freefire-purple/50 transition-all cursor-pointer",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-medium">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        <div className="bg-freefire-background/60 rounded px-2 py-1 text-white text-sm">
          {shortcutKey}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
