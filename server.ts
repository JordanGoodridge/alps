import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client if API key is present
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("GoogleGenAI initialized successfully with server-side key.");
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not configured in environment variables.");
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Gemini Alpine Guide chat assistant
app.post("/api/assistant/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message content is required." });
  }

  if (!ai) {
    return res.status(503).json({
      text: "The AI Alpine Advisor is currently warming up by the fireplace (GEMINI_API_KEY is missing or unconfigured). Please set GEMINI_API_KEY in the Secrets panel."
    });
  }

  try {
    const systemPrompt = `You are the ultimate elite alpine guide and luxury travel advisor for the "Les 3 Vallées 2027 Bluebird Gold Expedition" (our private 12-person ski group). 
Your tone is authoritative, elegant, and filled with deep, firsthand insider knowledge of the 3 Vallées ski area (the world's largest, spanning Méribel, Courchevel, Val Thorens, Les Menuires, Saint-Martin-de-Belleville, and Orelle).
You are extremely knowledgeable about:
- **Our Residence**: Chalet Kalliste in Les Allues (6-minute walk to Olympe 3 gondola, features a wood fireplace, outdoor hot tub, full kitchen, for 12 guests).
- **Slope Stats**: 600km of runs, 156 lifts, peaks of 3230m, 7 interconnected resorts.
- **Off-Slope Spots**: La Folie Douce, Olympic Ice Rink, Night Sledging.
- **Dining Heritage**: Michelin-starred La Table de l’Ours, secluded Le Clos Bernard (accessible by ski or sleigh), historical Chez Kiki (legendary wood-fired steaks).
- **Logistics**: SWISS airlines from JFK to Geneva (GVA), Lufthansa/Air France/Icelandair/BA from Seattle, and private airport shuttles.
- **Packing & Gear**: Premium ski rentals, high-altitude alpine gear, proper layering strategy.

Respond concisely, clearly, and structure your responses with elegant Markdown. Suggest professional tips and maintain a premium, friendly yet elite character in your advice.`;

    // Process conversation
    // Format contents parameter for @google/genai generateContent
    // Supports single prompt or simple conversational context.
    const contents: any[] = [];
    
    // Add past exchange history if present to give context
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        contents.push({
          role: turn.sender === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      });
    }
    
    // Append current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with AI model." });
  }
});

// -------------------------------------------------------------
// Static Asset Serving & Vite Integration
// -------------------------------------------------------------

async function startServer() {
  // Serve the assets directory statically so both dev and prod can findUploaded assets easily
  app.use("/assets", express.static(path.join(process.cwd(), "assets")));

  if (process.env.NODE_ENV !== "production") {
    // Development Mode with Vite Middleware
    console.log("Starting server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode serving compiled dist assets
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer();
