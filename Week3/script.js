import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import http from "http";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const server = http.createServer(async (req, res) => {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try{
      let { goal } = JSON.parse(body);
      goal+= " Provide a task list with priorities(high/mid/low) and expected time(XX hours/minutes) required to complete each task."
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: goal, //prompt
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              projects: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    task_name: { type: "STRING" },
                    priority: { type: "STRING" },
                    estimated_time: { type: "STRING" }
                  }
                }
              }
            }
          }
        }
      });
      const data = JSON.parse(response.text);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type","application/json");
      res.end(JSON.stringify(data.projects));
    }
    catch(error){
      console.error("AI Generation Error:", error.message);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 503; 
      res.end(JSON.stringify({ error: "The AI is currently busy. Please try again later." }));
    }
  });
  
});

server.listen(3000, () => {
  console.log("Server running on port 3K...");
});
