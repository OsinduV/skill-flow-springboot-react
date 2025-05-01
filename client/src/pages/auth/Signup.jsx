import {
  Alert,
  Button,
  Label,
  Radio,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMail } from "react-icons/hi";
import axiosInstance from "../../utils/axios";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.gender ||
      !formData.email ||
      !formData.password
    ) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      dispatch(signInStart());
      setLoading(true);
      setErrorMessage(null);
      const res = await axiosInstance.post("/auth/signup", formData);
      const data = res.data;

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        dispatch(signInSuccess(data.user));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message || "Sign up failed"));
        setLoading(false);
        setErrorMessage(data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message || "Sign up failed"));
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 shadow-md rounded-xl overflow-hidden bg-white dark:bg-gray-800">
        {/* Left - Image */}
        <div className="hidden md:block">
          <img
            src="/images/login-skill-sharing.png"
            alt="Skill Sharing Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right - Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Start your journey on <strong>Skill Flow</strong> — where you learn and share skills with the world.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label value="First Name" />
                <TextInput
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <Label value="Last Name" />
                <TextInput
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label value="Gender" />
              <div className="flex gap-10 mt-1">
                <div className="flex items-center gap-2">
                  <Radio
                    name="gender"
                    value="male"
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <Label value="Male" />
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    name="gender"
                    value="female"
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <Label value="Female" />
                </div>
              </div>
            </div>

            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                rightIcon={HiMail}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
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
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5 text-gray-600 dark:text-gray-400">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
