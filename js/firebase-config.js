import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

const firebaseConfig = {
	apiKey: "AIzaSyBgkL9z-paAn5tuqHqYjxZ3oh0ZN5Isjd8",
	authDomain: "igpldb.firebaseapp.com",
	projectId: "igpldb",
	storageBucket: "igpldb.appspot.com",
	messagingSenderId: "626237887904",
	appId: "1:626237887904:web:892f158a6136f4658a40c5",
	measurementId: "G-EFREWC8EDV",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, firestore, storage };
