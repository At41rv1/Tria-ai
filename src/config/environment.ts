
// Environment configuration for deployment
export const config = {
  // Database Configuration
  database: {
    // Replace with your actual Neon database URL
    url: import.meta.env.VITE_DATABASE_URL || '',
  },
  
  // Firebase Configuration (if using Firebase)
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  },

  // API Configuration
  // Groq AI Configuration
  groq: {
    apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
    baseUrl: import.meta.env.VITE_GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
    model: import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant',
  },

  // App Configuration
  app: {
    name: 'Tria Chat',
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development',
    isDevelopment: import.meta.env.DEV || false,
    isProduction: import.meta.env.PROD || false,
  }
};

export default config;
