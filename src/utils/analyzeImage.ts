import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAfbXBt9TT92i6bfhYyPtEpvhzf0JqD59k';

const prompt = `
Read the nutritional label in the provided image. Keep in mind that the calories may appear as: energetic value. Extract the nutritional information not for every  100g but for unit. 
and return the data in JSON format. Additionally, provide context for each value by:
1. Comparing sugars to scoops of sugar (1 scoop = 5g).
2. Comparing fat to tablespoons of butter (1 tablespoon = 11g).
3. Comparing sodium to teaspoons of salt (1 teaspoon = 2,300mg).
4. Calculating jogging time required to burn the calories (1 minute of jogging burns 10 kcal).
5. Suggest equivalent foods based on the calorie count. Use these food examples and their average calorie values:
   - Banana: 105 calories
   - Slice of pizza: 285 calories
   - Crepe: 112 calories
   - Chocolate bar: 250 calories
   - Hamburger: 354 calories

IMPORTANT: Your response must be ONLY a valid JSON object with no additional text or formatting. The response must exactly match this structure:
{
  "nutritional_info": {
    "calories": number,
    "total_fat": number,
    "saturated_fat": number,
    "sodium": number,
    "carbohydrates": number,
    "sugars": number,
    "protein": number
  },
  "context": {
    "sugar": string,
    "fat": string,
    "sodium": string,
    "calories_burned": string,
    "food_equivalent": string
  }
}`;

export async function analyzeImage(file: File) {
  try {
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload a valid image file');
    }

    // Convert File to base64
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to read image file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });

    // Initialize the API
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Create image part
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };

    // Generate content
    const result = await model.generateContent([prompt, imagePart]);
    if (!result.response) {
      throw new Error('No response from API');
    }

    const response = result.response;
    const text = response.text().trim();
    
    try {
      // Try to extract JSON if the response contains additional text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : text;
      
      const parsedData = JSON.parse(jsonString);
      
      // Validate response structure
      if (!parsedData.nutritional_info || !parsedData.context) {
        throw new Error('Invalid response structure');
      }

      // Validate all required fields are present
      const requiredNutritionalFields = ['calories', 'total_fat', 'saturated_fat', 'sodium', 'carbohydrates', 'sugars', 'protein'];
      const requiredContextFields = ['sugar', 'fat', 'sodium', 'calories_burned', 'food_equivalent'];

      const missingNutritionalFields = requiredNutritionalFields.filter(field => !(field in parsedData.nutritional_info));
      const missingContextFields = requiredContextFields.filter(field => !(field in parsedData.context));

      if (missingNutritionalFields.length > 0 || missingContextFields.length > 0) {
        throw new Error('Missing required fields in API response');
      }

      // Validate numeric values
      for (const field of requiredNutritionalFields) {
        if (typeof parsedData.nutritional_info[field] !== 'number') {
          throw new Error(`Invalid numeric value for ${field}`);
        }
      }
      
      return parsedData;
    } catch (parseError) {
      console.error('Parse error:', parseError);
      throw new Error('Failed to parse nutrition data. Please try another image.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred');
  }
}