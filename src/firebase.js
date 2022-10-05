import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_VyuZQeY4wrfhN_K2OwYNLew9-cOxVtg",
    authDomain: "packx-e600f.firebaseapp.com",
    projectId: "packx-e600f",
    storageBucket: "packx-e600f.appspot.com",
    messagingSenderId: "733915356363",
    appId: "1:733915356363:web:1b61f505a3e59988014f4e",
    measurementId: "G-GWM7HCQNQY"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const registerWithEmailAndPassword = async (name, email, password, facilityName, gender, DOB, address, phoneNo ) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid),{
      id: user.uid,
      name,
      facility: facilityName,
      dob: DOB,
      gender: gender,
      address: address,
      phone: phoneNo,
      email,
      password, 
      avatar: "https://firebasestorage.googleapis.com/v0/b/packx-e600f.appspot.com/o/profileImage%2FphotoFrame.png?alt=media&token=4e8a2851-abbf-4e9e-9ce7-5fc861a95004",
      type: "facility"
    });
    return {code: 200, message: "Successfully created User!" }; 
  } catch (err) {
    console.error(err); 
    return {code: 400, message: err.message };
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};