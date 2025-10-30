// Centralized environment variable access for Gemini API Key
// Supports multiple common variable names to reduce setup friction

export function getGeminiApiKey() {
  const {
    VITE_GEMINI_API_KEY,
    VITE_GOOGLE_API_KEY,
    VITE_API_KEY,
    VITE_GENAI_API_KEY,
  } = import.meta.env;

  const key =
    VITE_GEMINI_API_KEY ||
    VITE_GOOGLE_API_KEY ||
    VITE_GENAI_API_KEY ||
    VITE_API_KEY;

  return key && String(key).trim();
}


