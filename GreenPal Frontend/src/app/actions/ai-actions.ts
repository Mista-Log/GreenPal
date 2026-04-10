"use server";

import OpenAI from "openai";

interface WeatherData {
  location: string;
  temp: number;
  condition: string;
  humidity: number;
  precipitation: number;
  soilTemp?: number;
  soilMoisture?: number;
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
  }>;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  image?: string;
}

/**
 * Mapping of language codes to full names for AI instructions
 */
const getLanguageName = (code: string) => {
  const map: Record<string, string> = {
    pcm: "Nigerian Pidgin",
    yo: "Yoruba",
    ha: "Hausa",
    ig: "Igbo",
  };
  return map[code] || "English";
};

/**
 * Static Fallback Advisories for when NVIDIA Cloud is unavailable
 */
const getFallbackAdvisory = (weather: WeatherData) => {
  return {
    summary: `The weather in ${weather.location} is currently ${weather.condition} with ${weather.humidity}% humidity.`,
    actions: [
      "Keep monitor your crops for any signs of heat stress.",
      "Ensure your irrigation system is working properly if the sun is too much.",
      "Check our farming tips section for more advice on your specific crops."
    ]
  };
};

/**
 * Server action to handle NVIDIA AI Advisory requests to bypass CORS
 */
export async function getNvidiaAIAdvisoryAction(weather: WeatherData, _langCode: string = "en") {
  // Use Server-side environment variable for server actions
  const apiKey = process.env.NVIDIA_API_KEY || process.env.NEXT_PUBLIC_NVIDIA_API_KEY;

  if (!apiKey) {
    console.error("NVIDIA API Key missing in Server Action. Falling back to static advisory.");
    return getFallbackAdvisory(weather);
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  const prompt = `
    Analyze this 7-day weather forecast for a Nigerian smallholder farmer in ${weather.location}:
    - Current: ${weather.temp}°C, ${weather.humidity}% Humidity
    - Rain Chance: ${weather.precipitation}%
    - Soil: ${weather.soilTemp}°C / ${weather.soilMoisture}% Moisture
    - Forecast: ${JSON.stringify(weather.forecast)}

    Task: Provide 1 brief impact summary and 3 specific, physical actions the farmer should take TODAY and THIS WEEK.
    Persona: Senior Agricultural Extension Officer in Nigeria.
    Tone: Practical, authoritative, and helpful.

    Output Format (JSON strictly):
    {
      "summary": "1-2 sentences on how this weather specifically affects crops like Maize, Cassava, and Vegetables right now.",
      "actions": ["Action 1 - what to do in the field", "Action 2 - fertilizer/pest advice", "Action 3 - irrigation/harvest prep"]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "meta/llama-3.1-70b-instruct",
      messages: [
        {
          role: "system",
          content: `You are a Senior Agricultural Officer in Nigeria. You are communicating EXCLUSIVELY in English. Your goal is to give a farmer technical help based on the weather. Do not give generic advice. Use specialized farming terms common in Nigeria.`
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.1,
      max_tokens: 512,
      top_p: 0.7,
    });

    const content = response.choices[0]?.message?.content || "{}";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : "{}";

    try {
      const parsed = JSON.parse(jsonStr);
      console.log("AI Advisory Parsed Successfully:", parsed.summary?.substring(0, 50));
      // Ensure we have the required fields, otherwise use fallback
      if (!parsed.summary || !parsed.actions || parsed.actions.length === 0) {
        throw new Error("Incomplete JSON response from AI");
      }
      return parsed;
    } catch (parseError) {
      console.error("Advisory JSON Parse Error:", parseError, "Raw content:", content);
      return getFallbackAdvisory(weather);
    }
  } catch (error) {
    console.error("Server Action Advisory Error:", error);
    return getFallbackAdvisory(weather);
  }
}

/**
 * Server action to handle NVIDIA Plant Diagnosis requests to bypass CORS
 */
export async function diagnosePlantAction(base64Image: string, _langCode: string = "en") {
  const apiKey = process.env.NVIDIA_API_KEY || process.env.NEXT_PUBLIC_NVIDIA_API_KEY;

  if (!apiKey) {
    throw new Error("NVIDIA API Key missing on server.");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  try {
    const response = await openai.chat.completions.create({
      model: "meta/llama-3.2-11b-vision-instruct",
      messages: [
        {
          role: "system",
          content: `You are a Senior Plant Pathologist in Nigeria. You are currently communicating ENTIRELY in English. All labels, descriptions, and advice in your JSON response MUST be written in English.`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this image of a plant and provide a detailed diagnosis.
              
              CRITICAL SAFETY RULE: If the image contains a human face, a person, or any non-plant object, you MUST return exactly this JSON:
              {
                "disease_name": "Wrong Object",
                "confidence_score": 1.0,
                "symptoms": ["The AI detected a non-plant object or a person instead of a leaf."],
                "treatment_plan": { "organic": [], "chemical": [] },
                "prevention_strategies": ["Please point the camera directly at a plant leaf for analysis."],
                "localized_advice": "I'm designed to help you with plants, but this looks like something else!",
                "severity": "low"
              }
              
              DO NOT attempt to diagnose a person as a plant disease. If a person is in the frame, trigger the 'Wrong Object' response immediately.

              Respond ONLY with a valid JSON object in the following format:
              {
                "disease_name": "Common name of the disease",
                "confidence_score": 0.95,
                "symptoms": ["List specific visual cues found in the image"],
                "treatment_plan": {
                  "organic": ["Step-by-step organic remedies using locally available materials in Nigeria"],
                  "chemical": ["Specific recommended fungicides or pesticides available in Nigerian markets"]
                },
                "prevention_strategies": ["Long-term cultural practices to avoid recurrence"],
                "localized_advice": "Brief expert advice tailored for a Nigerian farmer.",
                "severity": "low/medium/high"
              }
              
              IMPORTANT: Use English for ALL the text values in the JSON. Keep the advice practical and localized.`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
    });

    const content = response.choices[0]?.message?.content || "{}";

    // Improved JSON extraction: find the first '{' and last '}' to strip any AI conversational fluff
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : "{}";

    try {
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON Parse Error in Diagnose Action:", parseError, "Raw content:", content);
      // Return a structured error response that the UI can handle without crashing
      return {
        disease_name: "Diagnosis Interrupted",
        confidence_score: 0,
        symptoms: ["Technical error occurred during image analysis."],
        treatment_plan: { organic: [], chemical: [] },
        prevention_strategies: ["Please try taking a clearer photo of the affected area."],
        localized_advice: "The AI was unable to generate a structured report. This usually happens if the image is unclear or the service is busy.",
        severity: "low"
      };
    }
  } catch (error) {
    console.error("Server Action Diagnosis Error:", error);
    throw error;
  }
}

/**
 * Server action for a continuous AI Chat with a Senior Agricultural Officer persona
 */
export async function chatWithNvidiaAction(messages: ChatMessage[], langCode: string = "en") {
  const apiKey = process.env.NVIDIA_API_KEY || process.env.NEXT_PUBLIC_NVIDIA_API_KEY;
  const language = getLanguageName(langCode);

  if (!apiKey) {
    throw new Error("NVIDIA API Key missing on server.");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  // Transform messages to include image support
  const transformedMessages: any[] = messages.map((msg) => {
    if (msg.image) {
      // Message with image
      return {
        role: msg.role,
        content: [
          {
            type: "text",
            text: msg.content || "Please analyze this image."
          },
          {
            type: "image_url",
            image_url: {
              url: msg.image
            }
          }
        ]
      };
    }
    // Text-only message
    return {
      role: msg.role,
      content: msg.content
    };
  });

  // Determine if we need a vision model or if we can use a more capable text model
  const hasImage = messages.some((msg) => msg.image);
  const selectedModel = hasImage 
    ? "meta/llama-3.2-11b-vision-instruct" 
    : "meta/llama-3.1-70b-instruct";

  try {
    const response = await openai.chat.completions.create({
      model: selectedModel,
      messages: [
        {
          role: "system",
          content: `You are the Greenpal AI Assistant, a Senior Agricultural Officer in Nigeria.
          Your goal is to provide technical farming advice, troubleshooting, and operational guidance.
          
          PHONETIC & LINGUISTIC ACCURACY (YORUBA, HAUSA, IGBO):
          - You MUST respond in the EXACT language used by the user: ${language}.
          - For Yoruba (yo): Use correct tone marks (Ami ohùn) such as do (\`) and re (´) and bottom dots (.) for accuracy. Yoruba without diacritics is often misunderstood.
          - For Nigerian Pidgin (pcm): Use authentic phrasing (e.g., "How far", "Wetin", "Abeg").
          - If the user switches languages, you MUST switch with them.
          
          FEW-SHOT EXAMPLE (YORUBA):
          User: "Ki ni mo le se fun arun dudu lara koko mi?"
          Assistant: "Ẹ n lẹ́! Ohun tí o lè ṣe fún àrùn dudu (Black Pod Disease) lára kòkó rẹ nìyí:
          1. **Ìfọ̀mọ́ (Sanitation)**: Kárí gbogbo èso tó ti bàjẹ́ kúrò lórí igi.
          2. **Ìbomirin tó tọ́**: Má ṣe jẹ́ kí omi dúró púpọ̀ lábẹ́ igi.
          3. **Oògùn Fungicide**: Lo oògùn bíi 'Copper-based fungicide' lẹ́ẹ̀kan ní ọ̀sẹ̀ méjì ní àsìkò òjò."

          GENERAL GUIDELINES:
          1. Tone: Professional, practical, and highly localized for Nigerian farmers.
          2. Content: Use knowledge of Nigerian states, soil types, and specific crops (Maize, Cassava, Yam, Cocoa, Rice).
          3. Technical Routing: You are currently using the ${selectedModel} model.
          4. Safety: For dangerous chemicals, provide safe alternatives and safety protocols.
          5. Cultural Context: Use local farming terms familiar to Nigerian farmers.
          ${hasImage ? "6. Image Analysis: Analyze the provided image carefully and provide specific diagnosis based on visual cues." : ""}`
        },
        ...transformedMessages
      ],
      temperature: 0.1,
      max_tokens: 1024,
      top_p: 0.7,
    });

    return {
      role: "assistant",
      content: response.choices[0]?.message?.content || "I'm sorry, I couldn't process that request right now."
    };
  } catch (error) {
    console.error("Chat Action Error:", error);
    throw new Error("The Greenpal AI is currently busy. Please try again in a moment.");
  }
}
