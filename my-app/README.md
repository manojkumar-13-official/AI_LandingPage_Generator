# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Gemini API Setup

1. Create a `.env` or `.env.local` file in `my-app/` with one of:
```
VITE_GEMINI_API_KEY=your_google_generative_ai_key
# or
VITE_GOOGLE_API_KEY=your_google_generative_ai_key
# or
VITE_GENAI_API_KEY=your_google_generative_ai_key
# or
VITE_API_KEY=your_google_generative_ai_key
```

2. Restart the dev server after adding the env file.

3. The app uses the official SDK `@google/generative-ai` with model `gemini-1.5-flash`.

4. The UI is in `src/pages/Home.jsx`. Enter your product idea/category and click "Generate Landing Page".

Notes:
- Never hardcode API keys in source; use Vite env variables prefixed with `VITE_`.
- If the response includes Markdown code fences, the app strips them before rendering.
