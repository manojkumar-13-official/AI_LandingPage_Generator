// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { getGeminiApiKey } from "../lib/env";
// const Home = () => {
//   const [idea, setIdea] = useState("");
//   const [category, setCategory] = useState("AI SaaS");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [copy, setCopy] = useState(false);
//   const copyCode = () => {
//     setCopy(true);
//     navigator.clipboard.writeText(result);
//   };

//   const handleGenerate = async () => {
//     setLoading(true);
//     setResult("")

//     try {
//       const apiKey = getGeminiApiKey();
//       if (!apiKey) {
//         throw new Error("Missing VITE_GEMINI_API_KEY. Add it to your .env.local and restart dev server.");
//       }

//       const genAI = new GoogleGenerativeAI(apiKey);
//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         systemInstruction:
//           "You are a meticulous front-end generator. Produce clean, accessible, production-ready HTML that uses Tailwind CSS utility classes only. Never include markdown fences or explanations. The output will be directly embedded into a page via innerHTML, so it must be self-contained valid HTML5 with no scripts.",
//         generationConfig: {
//           temperature: 0.5,
//           topP: 0.9,
//           maxOutputTokens: 4096,
//         },
//       });

//       const userPrompt = `Create a mini-site for a ${category} product named "${idea}".

// Requirements:
// - Landing page: bold hero heading with the product name, concise subheading, 3 feature cards (icon, title, short description), a primary animated CTA button.
// - Features page: in-depth features section, comparison grid or interactive-style cards, tasteful hover/transition effects.
// - Contact page: simple contact form (name, email, message), strong CTA to connect, social links.

// Styling & UX:
// - Use Tailwind CSS utilities only; no custom CSS tags or <style> blocks.
// - Consistent, modern theme with strong color contrast and accessible text.
// - Smooth transitions (hover/focus/active) without heavy animation.
// - Responsive for mobile, tablet, desktop.
// - Use web-friendly images from Unsplash, Lorem Picsum, or placeholder.com via direct URLs.

// Output constraints:
// - Return ONLY valid HTML5 for all pages in a single response.
// - Do NOT wrap content in markdown or code fences.
// - Avoid <script> tags and any JavaScript. HTML and Tailwind classes only.
// - Prefer semantic HTML tags and proper aria attributes where useful.`;

//       const resultResponse = await model.generateContent(userPrompt);
//       const text = resultResponse.response.text();

//       const sanitized = sanitizeModelOutput(text);
//       setResult(sanitized);
//     } catch (err) {
//       console.error(err);
//       setResult(`<div class="text-red-600">Failed to generate content: ${String(err.message || err)}</div>`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   function sanitizeModelOutput(text) {
//     if (!text) return "";
//     // Strip common markdown code fences the model might return
//     const fencePattern = /^```(?:html)?\n([\s\S]*?)\n```$/i;
//     const match = text.match(fencePattern);
//     if (match) {
//       return match[1].trim();
//     }
//     return text.trim();
//   }

//   return (
//     <div>
//       <div className="min-h-screen bg-amber-50 px-4 py-10 font-serif">
//         <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//           <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">
//             AI Landing Page Generator
//           </h1>
//           <input
//             type="text"
//             value={idea}
//             onChange={(e) => setIdea(e.target.value)}
//             className="w-full border border-gray-400 p-2 rounded-lg mb-4"
//             placeholder="Enter your product idea (eg: Shopping,Food...)"
//           />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full p-3 border border-gray-400 rounded-lg mb-4 "
//           >
//             <option value="AI SaaS">AI SaaS</option>
//             <option value="Productivity Tool">Productivity Tool</option>
//             <option value="StartUp">StartUp</option>
//           </select>

//           <button
//             onClick={handleGenerate}
//             className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-lg cursor-pointer"
//           >
//             {loading ? "Generating ...." : "Generate Landing Page"}
//           </button>

//           {result && (
//             <div className="mt-10">
//               <h2 className="text-xl font-bold mb-3">Live Review</h2>
//               <div
//                 className="border mb-2 rounded-lg p-5"
//                 dangerouslySetInnerHTML={{ __html: result }}
//               />

//               <div className="mt-6">
//                 <h2 className="text-lg font-semibold mb-2">HTML Code: </h2>
//                 <button
//                   onClick={copyCode}
//                   className=" bg-gray-500 hover:bg-gray-600 text-white font-bold px-5 py-3 rounded-lg cursor-pointer"
//                 >
//                   {copy ? "Code Copied" : "Copy Code"}
//                 </button>
//                 <pre className="mt-6 bg-gray-700 p-3 text-white rounded-xl overflow-x-auto">
//                   {result}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import axios from "axios";

// TODO: Replace with your OpenRouter API key.

// TODO: Replace with your site's URL or name.
const YOUR_SITE_URL = "http://localhost:5173";

const Home = () => {
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("AI SaaS");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);

  const copyCode = () => {
    setCopy(true);
    navigator.clipboard.writeText(result);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    setCopy(false);

    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "YOUR_API_KEY_HERE") {
      setResult(
        '<div class="text-red-600">Error: Missing OpenRouter API key. Please replace "YOUR_API_KEY_HERE" in Home.jsx with your actual key.</div>'
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Create a mini-site for a ${category} product named "${idea}".

Requirements:
- Landing page: bold hero heading with the product name, concise subheading, 3 feature cards (icon, title, short description), a primary animated CTA button.
- Features page: in-depth features section, comparison grid or interactive-style cards, tasteful hover/transition effects.
- Contact page: simple contact form (name, email, message), strong CTA to connect, social links.

Styling & UX:
- Use Tailwind CSS utilities only; no custom CSS tags or <style> blocks.
- Consistent, modern theme with strong color contrast and accessible text.
- Smooth transitions (hover/focus/active) without heavy animation.
- Responsive for mobile, tablet, desktop.
- Use web-friendly images from Unsplash, Lorem Picsum, or placeholder.com via direct URLs.

Output constraints:
- Return ONLY valid HTML5 for all pages in a single response.
- Do NOT wrap content in markdown or code fences.
- Avoid <script> tags and any JavaScript. HTML and Tailwind classes only.
- Prefer semantic HTML tags and proper aria attributes where useful.

            Use  plain HTML and Tailwind CSS. Return only valid HTML.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": YOUR_SITE_URL,
          },
        }
      );

      setResult(response.data.choices[0].message.content);
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage =
        error.response?.status === 401
          ? "Authentication failed. Please check if your OpenRouter API key is correct and active."
          : `An error occurred: ${error.message}. Check the console for more details.`;
      setResult(`<div class="text-red-600">${errorMessage}</div>`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-amber-50 px-4 py-10 font-serif">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">
            AI Landing Page Generator
          </h1>
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-lg mb-4"
            placeholder="Enter your product idea (eg: Shopping,Food...)"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-lg mb-4 "
          >
            <option value="AI SaaS">AI SaaS</option>
            <option value="Productivity Tool">Productivity Tool</option>
            <option value="StartUp">StartUp</option>
          </select>

          <button
            onClick={handleGenerate}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-lg cursor-pointer"
          >
            {loading ? "Generating ...." : "Generate Landing Page"}
          </button>

          {result && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-3">Live Review</h2>
              <div
                className="border mb-2 rounded-lg p-5"
                dangerouslySetInnerHTML={{ __html: result }}
              />

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">HTML Code: </h2>
                <button
                  onClick={copyCode}
                  className=" bg-gray-500 hover:bg-gray-600 text-white font-bold px-5 py-3 rounded-lg cursor-pointer"
                >
                  {copy ? "Code Copied" : "Copy Code"}
                </button>
                <pre className="mt-6 bg-gray-700 p-3 text-white rounded-xl overflow-x-auto">
                  {result}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
