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
import axiosInstance from "../utils/axios";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
// import OAuth from '../components/OAuth';

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
    e.preventDefault(); //prevent refreshing page
    if (!formData.lastName || !formData.firstName || !formData.gender || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      dispatch(signInStart());
      setLoading(true);
      setErrorMessage(null);
      const res = await axiosInstance.post("/auth/signup", formData);
      const data = res.data;
      
            if (data.token) {
              localStorage.setItem('authToken', data.token);
              dispatch(signInSuccess(data.user));
              console.log("data", data);
              navigate("/");
            } else {
              // If no token, dispatch failure with the message
              dispatch(signInFailure(data.message || "Login failed"));
              setLoading(false);
              setErrorMessage(data.message);
            }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message || "Login failed"));
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };
  console.log("formData", formData);
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white">
              Skill Flow
            </span>
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
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
              <Label value="Gender " />
              <div className="flex gap-10">
                <div className="flex items-center gap-2">
                  <Radio
                    name="gender"
                    value="male"
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <Label value="Male " />
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    name="gender"
                    value="female"
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <Label value="Female " />
                </div>
              </div>
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                rightIcon={HiMail}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
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
            {/* <OAuth /> */}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
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
