
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Zap, Loader2 } from 'lucide-react';

export const VideoUploadCard = ({
  originalVideo,
  isProcessing,
  progress,
  onFileUpload,
  onProcess,
}) => {
  const fileInputRef = useRef(null);
  const originalVideoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Video</CardTitle>
        <CardDescription>
          Select a video to upscale
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            variant="outline"
          >
            <Upload size={16} className="mr-2" />
            Choose Video
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {originalVideo && (
            <div className="space-y-4">
              <video
                ref={originalVideoRef}
                src={originalVideo}
                controls
                className="w-full h-64 border rounded-lg"
              />
              <Button
                onClick={onProcess}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Upscaling... {Math.round(progress)}%
                  </>
                ) : (
                  <>
                    <Zap size={16} className="mr-2" />
                    Upscale Video
                  </>
                )}
              </Button>
              {isProcessing && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
