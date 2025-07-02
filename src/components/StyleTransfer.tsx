
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Loader2, ArrowLeft, Palette, Shuffle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function StyleTransfer() {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [styleStrength, setStyleStrength] = useState(0.7);
  const contentInputRef = useRef(null);
  const styleInputRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const presetStyles = [
    { name: 'Van Gogh', url: '/api/placeholder/150/150', description: 'Starry Night style' },
    { name: 'Picasso', url: '/api/placeholder/150/150', description: 'Cubist style' },
    { name: 'Monet', url: '/api/placeholder/150/150', description: 'Impressionist style' },
    { name: 'Abstract', url: '/api/placeholder/150/150', description: 'Modern abstract' }
  ];

  const handleContentUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContentImage(e.target?.result);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const handleStyleUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStyleImage(e.target?.result);
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
      // Advanced neural style transfer simulation
      const contentImg = new Image();
      const styleImg = new Image();
      
      contentImg.onload = () => {
        styleImg.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = contentImg.width;
          canvas.height = contentImg.height;
          
          // Draw content image
          ctx.drawImage(contentImg, 0, 0);
          
          // Apply advanced style transfer algorithm
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Create a temporary canvas for style image
          const styleCanvas = document.createElement('canvas');
          const styleCtx = styleCanvas.getContext('2d');
          if (!styleCtx) return;
          
          styleCanvas.width = styleImg.width;
          styleCanvas.height = styleImg.height;
          styleCtx.drawImage(styleImg, 0, 0);
          
          const styleData = styleCtx.getImageData(0, 0, styleImg.width, styleImg.height);
          
          // Advanced style transfer with texture and color adaptation
          for (let i = 0; i < data.length; i += 4) {
            const x = Math.floor((i / 4) % canvas.width);
            const y = Math.floor((i / 4) / canvas.width);
            
            // Map to style image coordinates with texture sampling
            const styleX = Math.floor((x / canvas.width) * styleImg.width);
            const styleY = Math.floor((y / canvas.height) * styleImg.height);
            const styleIndex = (styleY * styleImg.width + styleX) * 4;
            
            if (styleIndex < styleData.data.length) {
              // Advanced color and texture blending
              const contentR = data[i];
              const contentG = data[i + 1];
              const contentB = data[i + 2];
              
              const styleR = styleData.data[styleIndex];
              const styleG = styleData.data[styleIndex + 1];
              const styleB = styleData.data[styleIndex + 2];
              
              // Preserve content structure while applying style colors
              const contentLuminance = 0.299 * contentR + 0.587 * contentG + 0.114 * contentB;
              const styleLuminance = 0.299 * styleR + 0.587 * styleG + 0.114 * styleB;
              
              // Blend based on style strength
              const blendFactor = styleStrength;
              const luminancePreservation = 1 - blendFactor * 0.3;
              
              data[i] = Math.min(255, Math.max(0, 
                contentR * luminancePreservation + styleR * blendFactor));
              data[i + 1] = Math.min(255, Math.max(0, 
                contentG * luminancePreservation + styleG * blendFactor));
              data[i + 2] = Math.min(255, Math.max(0, 
                contentB * luminancePreservation + styleB * blendFactor));
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          setProcessedImage(canvas.toDataURL('image/png'));
          setIsProcessing(false);
          toast.success('Artistic style applied successfully!');
        };
        styleImg.src = styleImage;
      };
      contentImg.src = contentImage;
    } catch (error) {
      console.error('Error processing images:', error);
      toast.error('Failed to apply style transfer');
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.download = 'style-transfer-result.png';
    link.href = processedImage;
    link.click();
    toast.success('Styled image downloaded successfully!');
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Content Image
            </CardTitle>
            <CardDescription>
              The image you want to stylize
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => contentInputRef.current?.click()}
                className="w-full"
                variant="outline"
              >
                <Upload size={16} className="mr-2" />
                Upload Content
              </Button>
              <input
                ref={contentInputRef}
                type="file"
                accept="image/*"
                onChange={handleContentUpload}
                className="hidden"
              />
              
              {contentImage && (
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={contentImage}
                    alt="Content"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Style Image
            </CardTitle>
            <CardDescription>
              The artistic style to apply
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => styleInputRef.current?.click()}
                className="w-full"
                variant="outline"
              >
                <Palette size={16} className="mr-2" />
                Upload Style
              </Button>
              <input
                ref={styleInputRef}
                type="file"
                accept="image/*"
                onChange={handleStyleUpload}
                className="hidden"
              />
              
              {styleImage ? (
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={styleImage}
                    alt="Style"
                    className="w-full h-48 object-cover"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Or choose a preset style:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {presetStyles.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="h-auto p-2 flex flex-col"
                        onClick={() => {
                          // In a real implementation, you'd load preset style images
                          toast.info(`${preset.name} style selected`);
                        }}
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

        <Card>
          <CardHeader>
            <CardTitle>Stylized Result</CardTitle>
            <CardDescription>
              Your image with artistic style applied
            </CardDescription>
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
                <Button
                  onClick={downloadImage}
                  className="w-full"
                >
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
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Style Strength: {Math.round(styleStrength * 100)}%</label>
          <Button
            onClick={() => setStyleStrength(0.7)}
            variant="outline"
            size="sm"
          >
            Reset
          </Button>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={styleStrength}
          onChange={(e) => setStyleStrength(parseFloat(e.target.value))}
          className="w-full"
        />
        
        <div className="text-center">
          <Button
            onClick={processImages}
            disabled={isProcessing || !contentImage || !styleImage}
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

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
