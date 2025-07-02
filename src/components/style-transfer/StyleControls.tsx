
import { Button } from '@/components/ui/button';
import { Loader2, Shuffle } from 'lucide-react';

interface StyleControlsProps {
  styleStrength: number;
  onStyleStrengthChange: (value: number) => void;
  onReset: () => void;
  onProcess: () => void;
  isProcessing: boolean;
  canProcess: boolean;
}

export const StyleControls = ({
  styleStrength,
  onStyleStrengthChange,
  onReset,
  onProcess,
  isProcessing,
  canProcess,
}: StyleControlsProps) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          Style Strength: {Math.round(styleStrength * 100)}%
        </label>
        <Button onClick={onReset} variant="outline" size="sm">
          Reset
        </Button>
      </div>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        value={styleStrength}
        onChange={(e) => onStyleStrengthChange(parseFloat(e.target.value))}
        className="w-full"
      />
      
      <div className="text-center">
        <Button
          onClick={onProcess}
          disabled={isProcessing || !canProcess}
          size="lg"
          className="px-8"
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Applying Artistic Style...
            </>
          ) : (
            <>
              <Shuffle size={16} className="mr-2" />
              Apply Style Transfer
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
