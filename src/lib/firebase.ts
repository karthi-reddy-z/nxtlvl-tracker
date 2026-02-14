import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, terminate, clearIndexedDbPersistence, setLogLevel } from "firebase/firestore";

const firebaseConfig = {
    projectId: "nxtlvl-tracker",
    appId: "1:563905055996:web:18906f8e956ba2ca27db79",
    storageBucket: "nxtlvl-tracker.firebasestorage.app",
    apiKey: "AIzaSyD8La4960uiUKJ_DEUMdDzTp4KTRqJKQkU",
    authDomain: "nxtlvl-tracker.firebaseapp.com",
    messagingSenderId: "563905055996",
    measurementId: "G-Q02NNFQEW4"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Enable debug logging to diagnose connection issues
setLogLevel('debug');

// Comprehensive connectivity settings
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export const resetFirestore = async () => {
    try {
        await terminate(db);
        await clearIndexedDbPersistence(db);
    } catch (e) {
        console.error("Reset failed", e);
    }
    window.location.reload();
};

export { auth, db };
