
import { useState } from 'react';
import { toast } from 'sonner';
import { processVideoUpscaling, downloadVideo, validateVideoFile } from '@/utils/videoProcessing';

export const useVideoUpscaler = () => {
  const [originalVideo, setOriginalVideo] = useState(null);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (file) => {
    if (validateVideoFile(file)) {
      const url = URL.createObjectURL(file);
      setOriginalVideo(url);
      setProcessedVideo(null);
      setProgress(0);
      return true;
    } else {
      toast.error('Please select a valid video file');
      return false;
    }
  };

  const processVideo = async () => {
    if (!originalVideo) return;

    setIsProcessing(true);
    setProgress(0);
    
    try {
      const result = await processVideoUpscaling(originalVideo, setProgress);
      setProcessedVideo(result);
      setIsProcessing(false);
      toast.success('Video upscaled successfully!');
    } catch (error) {
      console.error('Error processing video:', error);
      toast.error('Failed to process video');
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadVideo(processedVideo)) {
      toast.success('Video download started!');
    }
  };

  return {
    originalVideo,
    processedVideo,
    isProcessing,
    progress,
    handleFileUpload,
    processVideo,
    handleDownload,
  };
};
