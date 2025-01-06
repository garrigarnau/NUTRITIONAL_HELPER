import React from 'react';
import { AnalysisResult } from '../types';
import { Info, Flame, Cookie, Scale, Clock, Utensils } from 'lucide-react';

interface NutritionResultsProps {
  result: AnalysisResult;
}

export function NutritionResults({ result }: NutritionResultsProps) {
  const { nutritional_info, context } = result;

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Main Nutrition Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Scale className="w-6 h-6" />
            Nutritional Information
          </h3>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Calories - Featured */}
          <div className="col-span-2 md:col-span-3 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 font-medium">Calories</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {nutritional_info.calories}
              </span>
            </div>
          </div>
          
          {/* Other Nutrients */}
          <NutrientBox label="Total Fat" value={nutritional_info.total_fat} unit="g" />
          <NutrientBox label="Saturated Fat" value={nutritional_info.saturated_fat} unit="g" />
          <NutrientBox label="Sodium" value={nutritional_info.sodium} unit="mg" />
          <NutrientBox label="Carbohydrates" value={nutritional_info.carbohydrates} unit="g" />
          <NutrientBox label="Sugars" value={nutritional_info.sugars} unit="g" />
          <NutrientBox label="Protein" value={nutritional_info.protein} unit="g" />
        </div>
      </div>

      {/* Context Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Cookie className="w-6 h-6" />
            Nutritional Context
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <ContextBox icon={Cookie} text={context.sugar} />
          <ContextBox icon={Utensils} text={context.fat} />
          <ContextBox icon={Info} text={context.sodium} />
          <ContextBox icon={Clock} text={context.calories_burned} />
          <ContextBox icon={Scale} text={context.food_equivalent} />
        </div>
      </div>
    </div>
  );
}

function NutrientBox({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-lg font-semibold text-gray-900">
        {value}{unit}
      </div>
    </div>
  );
}

function ContextBox({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
      <Icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <p className="text-gray-700">{text}</p>
    </div>
  );
}