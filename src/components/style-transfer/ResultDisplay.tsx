
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Palette } from 'lucide-react';

interface ResultDisplayProps {
  processedImage: string | null;
  styleStrength: number;
  onDownload: () => void;
}

export const ResultDisplay = ({
  processedImage,
  styleStrength,
  onDownload,
}: ResultDisplayProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stylized Result</CardTitle>
        <CardDescription>Your image with artistic style applied</CardDescription>
      </CardHeader>
      <CardContent>
        {processedImage ? (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <img
                src={processedImage}
                alt="Stylized"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-purple-800">
                ✨ Neural style transfer applied with {Math.round(styleStrength * 100)}% intensity
              </p>
            </div>
            <Button onClick={onDownload} className="w-full">
              <Download size={16} className="mr-2" />
              Download Styled Image
            </Button>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Palette className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Upload both images to see the styled result</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
