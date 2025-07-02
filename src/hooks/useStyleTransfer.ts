
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { applyStyleTransfer, downloadProcessedImage } from '@/utils/styleTransferUtils';

export const useStyleTransfer = () => {
  const [contentImage, setContentImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [styleStrength, setStyleStrength] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (
    file: File | undefined,
    type: 'content' | 'style'
  ) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'content') {
          setContentImage(result);
        } else {
          setStyleImage(result);
        }
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const processImages = async () => {
    if (!contentImage || !styleImage) {
      toast.error('Please upload both content and style images');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await applyStyleTransfer(
        contentImage,
        styleImage,
        styleStrength,
        canvasRef
      );

      if (result.success && result.imageUrl) {
        setProcessedImage(result.imageUrl);
        toast.success('Artistic style applied successfully!');
      } else {
        toast.error(result.error || 'Failed to apply style transfer');
      }
    } catch (error) {
      console.error('Error processing images:', error);
      toast.error('Failed to apply style transfer');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      downloadProcessedImage(processedImage);
      toast.success('Styled image downloaded successfully!');
    }
  };

  const resetStyleStrength = () => {
    setStyleStrength(0.7);
  };

  return {
    contentImage,
    styleImage,
    processedImage,
    isProcessing,
    styleStrength,
    canvasRef,
    handleImageUpload,
    processImages,
    downloadImage,
    setStyleStrength,
    resetStyleStrength,
  };
};
