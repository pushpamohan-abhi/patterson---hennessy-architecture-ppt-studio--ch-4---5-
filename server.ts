import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API route for generating AI slide additions or custom textbook examples using Gemini
app.post("/api/generate-example", async (req, res) => {
  try {
    const { sectionId, topicTitle, customPrompt } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: "Gemini API key is not configured in environment secrets.",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an expert computer architecture professor co-authoring study materials based on Patterson & Hennessy's "Computer Organization and Design".

Section: ${sectionId} (${topicTitle})

${customPrompt ? `User custom request: ${customPrompt}` : ""}

Provide a rigorous academic explanation with:

1. Core Concept Summary
2. Detailed Numerical or Code Example with step-by-step calculation/trace
3. Exam/Interview Practice Question with solution
4. Key Takeaways

Format your response cleanly in JSON or structured text with clear headings.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ content: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);

    res.status(500).json({
      error: error.message || "Failed to generate AI example",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    // Serve the production frontend
    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("/{*splat}", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
