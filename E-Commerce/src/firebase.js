import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA62AU3Uyo-KGi8YBu9Y1-Qjm-GHljAXKg",
    authDomain: "ecommerce-d9897.firebaseapp.com",
    projectId: "ecommerce-d9897",
    storageBucket: "ecommerce-d9897.appspot.com",
    messagingSenderId: "393675276960",
    appId: "1:393675276960:web:ac9168d654d6e95ff9ffc5",
    measurementId: "G-W5E0FR7G27"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
