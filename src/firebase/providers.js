import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { fireBaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(fireBaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      //user info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    // ...
    return{
        ok:false,
        errorMessage
    }
  }
};


export const registerUserWithEmailPassword = async({email,password,displayName})=>{
  try {
   const resp = await createUserWithEmailAndPassword(fireBaseAuth, email, password)
   const {uid, photoURL} = resp.user
   
   await updateProfile(fireBaseAuth.currentUser,{displayName})

   return{
    ok:true,
    uid,photoURL,email,displayName
   }
  } catch (error) {
    return{
      ok:false,
      errorMessage:error.message
    }
  }
}