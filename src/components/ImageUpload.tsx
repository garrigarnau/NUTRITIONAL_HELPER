import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export function ImageUpload({ onImageSelect, isLoading }: ImageUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full max-w-md p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="flex flex-col items-center justify-center space-y-4 cursor-pointer"
      >
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          {isLoading ? (
            <p className="text-gray-600">Analyzing image...</p>
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-700">
                Drop your image here
              </p>
              <p className="text-sm text-gray-500">
                or click to select a nutrition label image
              </p>
            </>
          )}
        </div>
      </label>
    </div>
  );
}