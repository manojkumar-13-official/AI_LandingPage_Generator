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
const OPENROUTER_API_KEY = "<YOUR_API_KEY_HERE>";
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
    setTimeout(() => setCopy(false), 2000);
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
              content: `Create a stunning, production-ready multi-page website for a ${category} product named "${idea}".

NAVBAR REQUIREMENTS:
- Create a fixed/sticky professional navbar with:
  * Logo/brand name on the left (styled in bold)
  * Navigation links: Home, Features, Pricing, Contact (with hover effects)
  * Right-aligned primary CTA button (e.g., "Get Started", "Sign Up")
  * Mobile-responsive hamburger menu (use Tailwind mobile classes)
  * Semi-transparent background with subtle backdrop blur effect
  * Smooth shadow transition on scroll
  * Proper padding: px-4 sm:px-6 lg:px-8, py-3 sm:py-4

LANDING PAGE STRUCTURE (Below Navbar - Add margin-top: mt-20):
1. HERO SECTION:
   - Full-width hero with gradient background (e.g., blue to purple)
   - Large, bold product name heading (text-3xl sm:text-4xl lg:text-5xl)
   - Compelling subheading describing the product value
   - High-quality background image (use free sources: unsplash.com, pexels.com, pixabay.com)
   - Two CTA buttons: Primary (e.g., "Start Free Trial") and Secondary (e.g., "Learn More")
   - Animated arrow or scroll indicator
   - Padding: px-4 sm:px-6 lg:px-8, py-12 sm:py-16 lg:py-24
   - Centered content container max-w-7xl

2. FEATURES SECTION:
   - 4-6 feature cards in a grid (1 column mobile, 2 sm:, 3 lg:)
   - Each card with:
     * Icon/emoji at top
     * Bold feature title
     * Clear description
     * Hover effect with shadow lift and color accent
   - Use gradient accents for visual interest
   - Section padding: px-4 sm:px-6 lg:px-8, py-16 sm:py-20 lg:py-24
   - Gap between cards: gap-6 sm:gap-8
   - Container max-w-7xl mx-auto

3. HOW IT WORKS SECTION:
   - Step-by-step visual process (3-4 steps)
   - Use numbered cards or timeline style
   - Include icons and concise descriptions
   - Alternating layout (text-image-text) for visual rhythm
   - Padding: px-4 sm:px-6 lg:px-8, py-16 sm:py-20 lg:py-24
   - Stack vertically on mobile (flex flex-col), horizontal on lg:

4. TESTIMONIALS/SOCIAL PROOF:
   - 3 testimonial cards in grid (1 mobile, 2 sm:, 3 lg:)
   - Each card with:
     * Client quote
     * Client name and role
     * Star rating (5 stars)
     * Avatar placeholder image
   - Padding: px-4 sm:px-6 lg:px-8, py-16 sm:py-20 lg:py-24
   - Card padding: p-6 sm:p-8
   - Gap: gap-6 sm:gap-8

5. PRICING SECTION:
   - 3 pricing tiers (Starter, Professional, Enterprise)
   - Clear pricing display with currency
   - Feature list per tier (use checkmarks ✓ and crosses ✗)
   - Highlighted "Most Popular" tier with accent color
   - CTA button per tier
   - Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
   - Card padding: p-6 sm:p-8 lg:p-10
   - Section padding: px-4 sm:px-6 lg:px-8, py-16 sm:py-20 lg:py-24

6. STATS/METRICS SECTION:
   - 4 stat cards in grid (2 columns mobile, 4 lg:)
   - Large numbers with descriptive text
   - Subtle background patterns or colors
   - Padding: px-4 sm:px-6 lg:px-8, py-16 sm:py-20 lg:py-24
   - Card padding: p-6 sm:p-8
   - Gap: gap-6 sm:gap-8

FOOTER:
- Company info and tagline
- Quick links sections (Product, Company, Resources) - flex-col on mobile, flex-row on lg:
- Social media icons (Twitter, LinkedIn, GitHub, etc.)
- Newsletter signup form
- Copyright notice
- Dark background with contrasting text
- Padding: px-4 sm:px-6 lg:px-8, py-12 sm:py-16
- Container max-w-7xl mx-auto

DESIGN REQUIREMENTS:
- Use modern, premium color palette (avoid neon):
  * Primary: Blue, Purple, or Teal gradients
  * Secondary: Complementary accent colors
  * Neutral: Gray-700 to Gray-900 for text, Gray-50 for backgrounds
- Typography:
  * Headlines: Bold, text-2xl sm:text-3xl lg:text-4xl, strong contrast
  * Subheadings: text-lg sm:text-xl lg:text-2xl
  * Body: Clean sans-serif feeling, 16px minimum, text-base sm:text-lg
  * Excellent readability with proper line-height (1.6+)
- Spacing: Generous and responsive padding/margins:
  * Sections: py-12 sm:py-16 md:py-20 lg:py-24
  * Padding: px-4 sm:px-6 md:px-8 lg:px-8
  * Margins between elements: mb-4 sm:mb-6 lg:mb-8
  * Gap in grids: gap-4 sm:gap-6 lg:gap-8
- Images:
  * Use direct URLs from:
    - https://images.unsplash.com/
    - https://images.pexels.com/
    - https://source.unsplash.com/ (random images by query)
    - https://picsum.photos/ (with size: picsum.photos/600/400)
  * Responsive image sizes: w-full, max-w-full
  * object-cover for consistent aspect ratios
  * Always include alt text
- Animations & Interactions:
  * Smooth hover transitions (300ms duration)
  * Shadow elevation on hover (shadow-md → shadow-lg)
  * Color transitions on buttons
  * Scale transforms (scale-105) on cards/buttons on hover
  * NO heavy animations, keep it professional
- Responsive Design (CRITICAL):
  * Mobile-first approach - start with mobile, enhance upward
  * Use Tailwind responsive classes: sm:, md:, lg:, xl:
  * Stack sections vertically on mobile
  * Navbar hamburger on mobile (max-w-md), full nav on lg:
  * Touch-friendly buttons (min 48px height on mobile)
  * Images scale responsively: width 100% on mobile, constrained on desktop
  * Text sizes scale: text-sm/base on mobile, text-lg/xl on lg:
  * Container widths: full on mobile (px-4), max-w-7xl on lg:
  * Grid columns: 1 on mobile, 2-3 on tablet, 3+ on desktop

SPECIFIC IMAGE RECOMMENDATIONS BY CATEGORY:
${
  category === "AI SaaS"
    ? "- Hero: Modern tech/AI related image (search terms: 'artificial intelligence', 'technology workspace', 'neural network') - Use: https://images.unsplash.com/photo-1677442d019cecf8d0a3b0a0be...-resized"
    : category === "Productivity Tool"
    ? "- Hero: Productivity/workspace image (search terms: 'productivity', 'workspace', 'remote work')"
    : "- Hero: Startup/innovation image (search terms: 'startup', 'growth', 'innovation')"
}
- Features: Use various relevant images for each feature section
- Testimonials: Professional headshots or avatars from ui-avatars.com or via initials
- How it works: Workflow/process images that tell a story
- All images must be responsive: img { width: 100%; height: auto; object-fit: cover; }

CODE REQUIREMENTS:
- Return ONLY valid HTML5 (no markdown, no code fences)
- Use ONLY Tailwind CSS utility classes (no custom <style> blocks)
- NO JavaScript, NO <script> tags (pure HTML)
- Semantic HTML5 tags (header, nav, main, section, footer, article)
- Proper ARIA attributes for accessibility
- All CSS via Tailwind classes only
- Self-contained HTML that can be embedded via innerHTML
- Ensure Tailwind CDN is NOT needed (pure classes)
- Include aria-label for interactive elements
- Proper heading hierarchy (h1, h2, h3, etc.)

OUTPUT FORMAT:
Return ONLY the HTML code. No explanations, no markdown, no fences. Just pure HTML ready to embed.`,
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
    <div className="w-full min-h-screen">
      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        
        {/* Card Container */}
        <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12">
          
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">
              AI Landing Page Generator
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
              Create stunning, production-ready landing pages in seconds with AI
            </p>
          </div>

          {/* Input Fields Container */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-8 md:mb-10">
            
            {/* Product Name Input */}
            <div className="w-full">
              <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-2 sm:mb-2.5 md:mb-3">
                Product Name
              </label>
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full border-2 border-gray-300 focus:border-purple-500 focus:outline-none p-2.5 sm:p-3 md:p-3.5 rounded-lg transition text-sm sm:text-base"
                placeholder="e.g., DataViz Pro, CloudSync, AutoWriter..."
              />
            </div>

            {/* Category Select */}
            <div className="w-full">
              <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-2 sm:mb-2.5 md:mb-3">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 sm:p-3 md:p-3.5 border-2 border-gray-300 focus:border-purple-500 focus:outline-none rounded-lg transition text-sm sm:text-base"
              >
                <option value="AI SaaS">AI SaaS</option>
                <option value="Productivity Tool">Productivity Tool</option>
                <option value="StartUp">StartUp</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold sm:font-bold py-2.5 sm:py-3 md:py-3.5 rounded-lg cursor-pointer transition transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Generating your landing page...</span>
                </span>
              ) : (
                <span>✨ Generate Landing Page</span>
              )}
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 mt-8 sm:mt-10 md:mt-12 lg:mt-14 pt-6 sm:pt-8 md:pt-10 border-t-2 border-gray-200">
              
              {/* Live Preview Section */}
              <div className="w-full">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-5">
                  🎨 Live Preview
                </h2>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-md">
                  <div
                    className="w-full overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: result }}
                  />
                </div>
              </div>

              {/* HTML Code Section */}
              <div className="w-full">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-5">
                  💻 HTML Code
                </h2>
                
                {/* Copy Button */}
                <button
                  onClick={copyCode}
                  className={`${
                    copy
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-700 hover:bg-gray-800"
                  } text-white font-semibold sm:font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg cursor-pointer transition shadow-md text-sm sm:text-base w-full sm:w-auto`}
                >
                  {copy ? "✓ Code Copied to Clipboard" : "📋 Copy Code"}
                </button>
                
                {/* Code Block */}
                <div className="mt-3 sm:mt-4 md:mt-5 bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700">
                  <pre className="p-4 sm:p-5 md:p-6 lg:p-8 text-white text-xs sm:text-sm md:text-base font-mono leading-relaxed overflow-x-auto max-h-96 sm:max-h-[28rem] md:max-h-[32rem] overflow-y-auto">
                    <code>{result}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;