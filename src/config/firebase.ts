
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAUwbCbsT2yvFvjUc0-eeJ2qCMibJKs0OY",
  authDomain: "a7-tria.firebaseapp.com",
  projectId: "a7-tria",
  storageBucket: "a7-tria.appspot.com",
  messagingSenderId: "69423808863",
  appId: "1:69423808863:web:your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
