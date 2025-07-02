
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import BackgroundRemover from '@/components/BackgroundRemover';
import ObjectRemoval from '@/components/ObjectRemoval';
import StyleTransfer from '@/components/StyleTransfer';
import VideoUpscaler from '@/components/VideoUpscaler';
import SceneTransform from '@/components/SceneTransform';
import SceneDetection from '@/components/SceneDetection';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/background-remover" element={<BackgroundRemover />} />
            <Route path="/object-removal" element={<ObjectRemoval />} />
            <Route path="/style-transfer" element={<StyleTransfer />} />
            <Route path="/video-upscaler" element={<VideoUpscaler />} />
            <Route path="/scene-transform" element={<SceneTransform />} />
            <Route path="/scene-detection" element={<SceneDetection />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
