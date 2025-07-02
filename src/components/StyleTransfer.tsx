
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useStyleTransfer } from '@/hooks/useStyleTransfer';
import { ImageUploadCard } from '@/components/style-transfer/ImageUploadCard';
import { ResultDisplay } from '@/components/style-transfer/ResultDisplay';
import { StyleControls } from '@/components/style-transfer/StyleControls';

export default function StyleTransfer() {
  const navigate = useNavigate();
  const {
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
  } = useStyleTransfer();

  const presetStyles = [
    { name: 'Van Gogh', description: 'Starry Night style' },
    { name: 'Picasso', description: 'Cubist style' },
    { name: 'Monet', description: 'Impressionist style' },
    { name: 'Abstract', description: 'Modern abstract' }
  ];

  const handlePresetSelect = (presetName: string) => {
    toast.info(`${presetName} style selected`);
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Artistic Style Transfer</h1>
        <p className="text-gray-600">Transform your images with artistic styles using neural networks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ImageUploadCard
          title="Content Image"
          description="The image you want to stylize"
          image={contentImage}
          onUpload={(file) => handleImageUpload(file, 'content')}
          type="content"
        />

        <ImageUploadCard
          title="Style Image"
          description="The artistic style to apply"
          image={styleImage}
          onUpload={(file) => handleImageUpload(file, 'style')}
          type="style"
          presetStyles={presetStyles}
          onPresetSelect={handlePresetSelect}
        />

        <ResultDisplay
          processedImage={processedImage}
          styleStrength={styleStrength}
          onDownload={downloadImage}
        />
      </div>

      <StyleControls
        styleStrength={styleStrength}
        onStyleStrengthChange={setStyleStrength}
        onReset={resetStyleStrength}
        onProcess={processImages}
        isProcessing={isProcessing}
        canProcess={!!(contentImage && styleImage)}
      />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
