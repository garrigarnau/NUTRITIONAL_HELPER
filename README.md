# Nutritional Helper

Welcome to the Nutritional Helper project! This application allows users to upload a photo of a nutrition label and get detailed insights about the nutritional content and its real-world equivalents.

## Features

- Upload a photo of any nutrition label.
- Get detailed nutritional information in JSON format.
- Contextualize nutritional values with real-world equivalents.
- Calculate jogging time required to burn the calories based on user weight.
- Suggest equivalent foods based on the calorie count.

## Interface
<img width="461" alt="dashboard" src="https://github.com/user-attachments/assets/049d3ba4-4999-424b-b1d3-9e77111102e7" />
<img width="473" alt="dashboard1" src="https://github.com/user-attachments/assets/2b9e5285-979a-4108-bf8a-32fee54bcba3" />
<img width="454" alt="dashboard2" src="https://github.com/user-attachments/assets/ef12ca68-a653-4dd5-abed-ea0bd88ff881" />


## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Gemini API key from Google Generative AI.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/garrigarnau/nutritional_helper.git
   cd nutritional_helper
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Gemini API key:

   ```plaintext
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

### Usage

1. Enter your weight in kilograms.
2. Upload a photo of a nutrition label.
3. Get detailed insights about the nutritional content and its real-world equivalents.

## Project Structure

- `src/components`: Contains React components used in the application.
- `src/utils`: Contains utility functions, including the `analyzeImage` function that interacts with the Gemini API.
- `src/types`: Contains TypeScript type definitions.

## Contributing

We welcome contributions from the community! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear and descriptive messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact the project maintainer.

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/garrigarnau/nutritional_helper)
