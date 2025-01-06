export interface NutritionalInfo {
  calories: number;
  total_fat: number;
  saturated_fat: number;
  sodium: number;
  carbohydrates: number;
  sugars: number;
  protein: number;
}

export interface Context {
  sugar: string;
  fat: string;
  sodium: string;
  calories_burned: string;
  food_equivalent: string;
}

export interface AnalysisResult {
  nutritional_info: NutritionalInfo;
  context: Context;
}