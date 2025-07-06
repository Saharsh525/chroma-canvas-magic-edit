
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useVideoUpscaler } from '@/hooks/useVideoUpscaler';
import { VideoUploadCard } from '@/components/video-upscaler/VideoUploadCard';
import { VideoResultCard } from '@/components/video-upscaler/VideoResultCard';
import { VideoUpscalerFeatures } from '@/components/video-upscaler/VideoUpscalerFeatures';

export default function VideoUpscaler() {
  const navigate = useNavigate();
  const {
    originalVideo,
    processedVideo,
    isProcessing,
    progress,
    handleFileUpload,
    processVideo,
    handleDownload,
  } = useVideoUpscaler();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Tools
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Upscaler</h1>
        <p className="text-gray-600">Enhance video quality with AI upscaling</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VideoUploadCard
          originalVideo={originalVideo}
          isProcessing={isProcessing}
          progress={progress}
          onFileUpload={handleFileUpload}
          onProcess={processVideo}
        />

        <VideoResultCard
          processedVideo={processedVideo}
          onDownload={handleDownload}
        />
      </div>

      <VideoUpscalerFeatures />
    </div>
  );
}
