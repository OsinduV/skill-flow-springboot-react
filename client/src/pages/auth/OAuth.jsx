import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    //     try {
    //         const resultsFromGoogle = await signInWithPopup(auth, provider)
    //         const res = await fetch('/api/auth/google', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 name: resultsFromGoogle.user.displayName,
    //                 email: resultsFromGoogle.user.email,
    //                 googlePhotoUrl: resultsFromGoogle.user.photoURL,
    //             }),
    //             })
    //         const data = await res.json()
    //         if (res.ok){
    //             dispatch(signInSuccess(data))
    //             navigate('/')
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
        console.log(resultsFromGoogle);
      // Send user info to backend using Axios
      const res = await axios.post("/auth/google", {
        firstName: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        profilePicture: resultsFromGoogle.user.photoURL,
      });

      if (res.status === 200) {
          localStorage.setItem("authToken", res.data.token); // Save token for future requests
        dispatch(signInSuccess(res.data.user));
        navigate("/");
      } else {
        console.error("Failed to sign in with Google:", res);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      className="w-full bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800"
      outline
    >
      <AiFillGoogleCircle className="w-5 h-5 mr-2" />
        Continue with Google
    </Button>
  );
}
