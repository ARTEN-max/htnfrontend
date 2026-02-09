/**
 * Desktop Window component
 * Creates a window-like container similar to desktop OS windows
 */

import { ReactNode } from 'react';

interface DesktopWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
}

export function DesktopWindow({
  title,
  children,
  className = '',
  showControls = true,
}: DesktopWindowProps) {
  return (
    <div className={`desktop-window ${className}`}>
      {title && (
        <div className="desktop-window-header">
          <div className="flex items-center space-x-2">
            {showControls && (
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            )}
            <h3 className="text-sm font-medium text-white ml-2">{title}</h3>
          </div>
        </div>
      )}
      <div className="p-6 text-white">{children}</div>
    </div>
  );
}
