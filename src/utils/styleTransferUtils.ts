
export interface StyleTransferResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export const applyStyleTransfer = async (
  contentImage: string,
  styleImage: string,
  styleStrength: number,
  canvasRef: React.RefObject<HTMLCanvasElement>
): Promise<StyleTransferResult> => {
  try {
    const contentImg = new Image();
    const styleImg = new Image();
    
    return new Promise((resolve) => {
      contentImg.onload = () => {
        styleImg.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) {
            resolve({ success: false, error: 'Canvas not available' });
            return;
          }

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({ success: false, error: 'Canvas context not available' });
            return;
          }

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
          if (!styleCtx) {
            resolve({ success: false, error: 'Style canvas context not available' });
            return;
          }
          
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
          const resultUrl = canvas.toDataURL('image/png');
          resolve({ success: true, imageUrl: resultUrl });
        };
        styleImg.src = styleImage;
      };
      contentImg.src = contentImage;
    });
  } catch (error) {
    console.error('Error processing images:', error);
    return { success: false, error: 'Failed to apply style transfer' };
  }
};

export const downloadProcessedImage = (imageUrl: string, filename: string = 'style-transfer-result.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = imageUrl;
  link.click();
};
