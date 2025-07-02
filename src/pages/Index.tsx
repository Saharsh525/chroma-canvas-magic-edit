
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  Eraser, 
  Palette, 
  Zap, 
  Wand2, 
  Video,
  ArrowRight 
} from 'lucide-react';

const tools = [
  {
    title: 'Background Remover',
    description: 'Remove backgrounds from images with AI precision',
    icon: Scissors,
    path: '/background-remover',
    color: 'bg-blue-500'
  },
  {
    title: 'Object Removal',
    description: 'Erase unwanted objects from images and videos',
    icon: Eraser,
    path: '/object-removal',
    color: 'bg-red-500'
  },
  {
    title: 'Style Transfer',
    description: 'Apply artistic styles to your images',
    icon: Palette,
    path: '/style-transfer',
    color: 'bg-purple-500'
  },
  {
    title: 'Video Upscaler',
    description: 'Enhance video quality with AI upscaling',
    icon: Zap,
    path: '/video-upscaler',
    color: 'bg-green-500'
  },
  {
    title: 'Scene Transform',
    description: 'Transform scenes with text prompts',
    icon: Wand2,
    path: '/scene-transform',
    color: 'bg-orange-500'
  },
  {
    title: 'Scene Detection',
    description: 'Automatically detect and cut video scenes',
    icon: Video,
    path: '/scene-detection',
    color: 'bg-indigo-500'
  }
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Video & Image Editor
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional AI-powered tools for video and image editing. 
          Transform your content with cutting-edge artificial intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Card 
              key={tool.path} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(tool.path)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {tool.description}
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Get Started
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
