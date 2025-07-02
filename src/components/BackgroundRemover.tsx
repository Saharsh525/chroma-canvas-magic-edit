
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, Loader2, ArrowLeft, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const imageUrl = URL.createObjectURL(file);
        setOriginalImage(imageUrl);
        setProcessedImage(null);
        setProgress(0);
      } catch (error) {
        toast.error('Failed to load image');
      }
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const processImage = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Load the image
      const imageFile = await fetch(originalImage).then(r => r.blob());
      const imageElement = await loadImage(imageFile);
      
      // Process with AI background removal
      const resultBlob = await removeBackground(imageElement, setProgress);
      
      // Create URL for the processed image
      const processedUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(processedUrl);
      
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.download = 'background-removed.png';
    link.href = processedImage;
    link.click();
    toast.success('Image downloaded successfully!');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Background Remover</h1>
        <p className="text-gray-600">Remove backgrounds from your images with AI precision</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="w-5 h-5" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Select an image to remove its background using AI
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
                Choose Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {originalImage && (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-64 object-contain bg-gray-50"
                    />
                  </div>
                  <Button
                    onClick={processImage}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Scissors size={16} className="mr-2" />
                        Remove Background
                      </>
                    )}
                  </Button>
                  
                  {isProcessing && (
                    <div className="space-y-2">
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-600 text-center">
                        {progress < 30 ? 'Loading AI model...' :
                         progress < 50 ? 'Preparing image...' :
                         progress < 80 ? 'Analyzing image...' :
                         'Applying background removal...'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              Your image with background removed (transparent PNG)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {processedImage ? (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden bg-gray-50 bg-opacity-50" 
                     style={{backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3c/svg%3e")'}}>
                  <img
                    src={processedImage}
                    alt="Background Removed"
                    className="w-full h-64 object-contain"
                  />
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✨ Background successfully removed! The image now has a transparent background.
                  </p>
                </div>
                <Button
                  onClick={downloadImage}
                  className="w-full"
                >
                  <Download size={16} className="mr-2" />
                  Download PNG with Transparency
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Scissors className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Upload and process an image to see the result</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">✨ AI Background Removal Features:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Advanced AI segmentation for precise background detection</li>
          <li>• Maintains fine details like hair and fur edges</li>
          <li>• Outputs transparent PNG files ready for use</li>
          <li>• Works with portraits, objects, and complex scenes</li>
          <li>• Optimized for both desktop and mobile browsers</li>
        </ul>
      </div>
    </div>
  );
}
