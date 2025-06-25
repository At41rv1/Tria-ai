// Environment configuration for deployment
export const config = {
  // Database Configuration
  database: {
    // Replace with your actual Neon database URL
    url: import.meta.env.VITE_DATABASE_URL || 'postgresql://neondb_owner:npg_qHSkAB7l9utN@ep-misty-flower-a8tlacd0-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
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
  api: {
    // Add your API endpoints here
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
    // Add any API keys that are safe to expose (publishable keys only)
    openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY || '', // Only if using client-side AI
  },

  // App Configuration
  app: {
    name: 'Triple Chat',
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development',
    isDevelopment: import.meta.env.DEV || false,
    isProduction: import.meta.env.PROD || false,
  }
};

export default config;
