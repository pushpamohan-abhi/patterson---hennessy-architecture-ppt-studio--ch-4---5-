import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { sectionId, topicTitle, customPrompt } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on Vercel.",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are an expert computer architecture professor creating study material based on Patterson & Hennessy's
"Computer Organization and Design: The Hardware/Software Interface, ARM Edition".

Section: ${sectionId} (${topicTitle})

${customPrompt ? `User custom request: ${customPrompt}` : ""}

Provide a rigorous academic explanation with:

1. Core Concept Summary
2. Detailed Numerical or Code Example with step-by-step calculation/trace
3. Exam/Interview Practice Question with solution
4. Key Takeaways

Use clear headings and readable formatting.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return res.status(200).json({
      content: response.text || "",
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);

    return res.status(500).json({
      error: error?.message || "Failed to generate AI example",
    });
  }
}