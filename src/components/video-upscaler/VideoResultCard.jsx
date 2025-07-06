
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export const VideoResultCard = ({ processedVideo, onDownload }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enhanced Video</CardTitle>
        <CardDescription>
          Your upscaled video result
        </CardDescription>
      </CardHeader>
      <CardContent>
        {processedVideo ? (
          <div className="space-y-4">
            <video
              src={processedVideo}
              controls
              className="w-full h-64 border rounded-lg"
            />
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                ✨ Video enhanced with AI upscaling
              </p>
            </div>
            <Button
              onClick={onDownload}
              className="w-full"
            >
              <Download size={16} className="mr-2" />
              Download Enhanced Video
            </Button>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Upload and process a video to see the enhanced result
          </div>
        )}
      </CardContent>
    </Card>
  );
};
