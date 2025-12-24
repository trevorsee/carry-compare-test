'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { forwardRef } from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'flex items-center gap-2 cursor-pointer select-none',
          className
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            id={id}
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <div className="h-4 w-4 rounded border border-gray-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 transition-colors">
            {checked && (
              <Check className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
            )}
          </div>
        </div>
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
