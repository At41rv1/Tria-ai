export const config = {
  // Database Configuration
  database: {
    // Replace with your actual Neon database URL
    url: import.meta.env.VITE_DATABASE_URL || 'postgresql://neondb_owner:npg_qHSkAB7l9utN@ep-fragrant-truth-a87ffjpc-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
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
