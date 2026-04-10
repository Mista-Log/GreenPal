/**
 * NvidiaDiagnosisService.ts
 */

/**
 * Interface for the structured plant diagnosis response from Llama-3.2 Vision
 */
export interface PlantDiagnosis {
  disease_name: string;
  confidence_score: number;
  symptoms: string[];
  treatment_plan: {
    organic: string[];
    chemical: string[];
  };
  prevention_strategies: string[];
  localized_advice: string; // Tailored for Nigerian context
  severity: "low" | "medium" | "high";
}

class NvidiaDiagnosisService {
  private model = "meta/llama-3.2-90b-vision-instruct";

  /**
   * Diagnoses a plant disease from a base64 encoded image
   */
  async diagnosePlant(base64Image: string, language: string = "en"): Promise<PlantDiagnosis> {
    if (!process.env.NEXT_PUBLIC_NVIDIA_API_KEY) {
      throw new Error("NVIDIA API Key missing. Please check your environment variables.");
    }
    try {
      // Call the server action to resolve CORS errors
      const { diagnosePlantAction } = await import("@/app/actions/ai-actions");
      const diagnosis = await diagnosePlantAction(base64Image, language);
      return diagnosis as PlantDiagnosis;
    } catch (error) {
      console.error("NVIDIA Diagnosis Service Error:", error);
      throw error;
    }
  }
}

export const diagnosisService = new NvidiaDiagnosisService();
export default diagnosisService;
