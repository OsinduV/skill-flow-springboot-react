import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import axios from "../../utils/axios";
import OAuth from "./OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await axios.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const data = res.data;
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        dispatch(signInSuccess(data.user));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message || "Login failed"));
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 shadow-md rounded-xl overflow-hidden bg-white dark:bg-gray-800">
        {/* Left - Image */}
        <div className="hidden md:block">
          <img
            src="/images/login-skill-sharing.png" // ← Save the generated image in public/images/
            alt="Skill Sharing Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right - Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome Back!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Sign in to continue sharing and learning new skills on{" "}
            <strong>Skill Flow</strong>.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>



          <div className="flex gap-2 text-sm mt-5 text-gray-600 dark:text-gray-400">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>


          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {typeof errorMessage === "string"
                ? errorMessage
                : errorMessage.message || "An error occurred"}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
