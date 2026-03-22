import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemini-3-flash-preview";

export async function getGeminiResponse(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.parts[0].text }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "Eres un experto en agricultura salvadoreña. Responde de manera amable, sencilla y técnica sobre el cultivo de arroz, frijoles y maíz en El Salvador. Si te preguntan algo fuera de este tema, intenta redirigir la conversación sutilmente hacia la agricultura.",
      }
    });

    return response.text || "Lo siento, no pude procesar tu solicitud.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hubo un error al conectar con el asistente. Por favor, intenta de nuevo.";
  }
}
