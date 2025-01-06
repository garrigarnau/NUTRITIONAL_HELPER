import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { NutritionResults } from './components/NutritionResults';
import { AnalysisResult } from './types';
import { Utensils } from 'lucide-react';
import { analyzeImage } from './utils/analyzeImage';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const analysisResult = await analyzeImage(file);
      setResult(analysisResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze the image. Please try again.';
      setError(errorMessage);
      console.error('Error analyzing image:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Utensils className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nutrition Label Analyzer
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Upload a photo of any nutrition label and get detailed insights about
            the nutritional content and its real-world equivalents.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <ImageUpload onImageSelect={handleImageSelect} isLoading={isLoading} />
          
          {error && (
            <div className="text-red-600 bg-red-50 p-4 rounded-lg">
              {error}
            </div>
          )}
          
          {result && !isLoading && (
            <NutritionResults result={result} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;