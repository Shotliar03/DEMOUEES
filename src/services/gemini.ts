import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemini-3-flash-preview";

export async function getGeminiResponse(
  prompt: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  pdfData?: { data: string, mimeType: string }
) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  try {
    const parts: any[] = [{ text: prompt }];
    
    // If we have PDF data, add it as a part to the current message
    if (pdfData) {
      parts.unshift({
        inlineData: {
          data: pdfData.data,
          mimeType: pdfData.mimeType
        }
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.parts[0].text }] })),
        { role: 'user', parts: parts }
      ],
      config: {
        systemInstruction: "Eres un asistente virtual agrícola experto en El Salvador. Tu conocimiento se limita ESTRICTAMENTE a los manuales de: Tomate, Arroz, Pepino, Papa, Frijol y Cebolla. Debes seguir los lineamientos del 'Manual Complementario':\n1. LENGUAJE: Usa términos sencillos (ej. 'aplicar abono' en lugar de 'fertilización').\n2. TONO: Amigable, cercano y natural.\n3. ENFOQUE: Respuestas prácticas y aplicables.\n4. ALCANCE: Si te preguntan por otros cultivos, responde: 'Lo siento, no tengo información sobre ese cultivo.'\n5. CONTEXTO: Considera las épocas de El Salvador (Lluviosa: mayo-octubre, Seca: noviembre-abril).\n6. BREVEDAD: Máximo 50 palabras por respuesta.",
      }
    });

    return response.text || "Lo siento, no pude procesar tu solicitud.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hubo un error al conectar con el asistente. Por favor, intenta de nuevo.";
  }
}
