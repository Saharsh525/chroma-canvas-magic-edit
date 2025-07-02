
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Palette } from 'lucide-react';

interface ImageUploadCardProps {
  title: string;
  description: string;
  image: string | null;
  onUpload: (file: File | undefined) => void;
  type: 'content' | 'style';
  presetStyles?: Array<{ name: string; description: string }>;
  onPresetSelect?: (preset: string) => void;
}

export const ImageUploadCard = ({
  title,
  description,
  image,
  onUpload,
  type,
  presetStyles,
  onPresetSelect,
}: ImageUploadCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(event.target.files?.[0]);
  };

  const Icon = type === 'content' ? Upload : Palette;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={() => inputRef.current?.click()}
            className="w-full"
            variant="outline"
          >
            <Icon size={16} className="mr-2" />
            Upload {type === 'content' ? 'Content' : 'Style'}
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          
          {image ? (
            <div className="border rounded-lg overflow-hidden">
              <img
                src={image}
                alt={type === 'content' ? 'Content' : 'Style'}
                className="w-full h-48 object-cover"
              />
            </div>
          ) : presetStyles && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Or choose a preset style:</p>
              <div className="grid grid-cols-2 gap-2">
                {presetStyles.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-auto p-2 flex flex-col"
                    onClick={() => onPresetSelect?.(preset.name)}
                  >
                    <div className="w-full h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded mb-1"></div>
                    <span className="text-xs">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
