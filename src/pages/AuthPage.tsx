import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGithubLoginHook,
  useLogin,
  useSignup,
} from "../hooks/auth";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import React from "react";
import { loginSchema, signupSchema } from "../schema/formSchema";
import { IFormInput } from "../types/clientType";
import showToast from "../utils/toastHelper";
import CustomeInput from "../components/ui/CustomeInput";

function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialIsSignIn = searchParams.get("mode") === "signin";
  const [isSignIn, setIsSignIn] = useState(initialIsSignIn);
  const [showPassword, setShowPassword] = useState(false);
  // Initialize rememberMe from localStorage
  const [rememberMe, setRememberMe] = useState(() => {
    const remembered = localStorage.getItem("rememberedUser");
    return remembered !== null;
  });

  const currentSchema = isSignIn ? loginSchema : signupSchema;
  const { login, loginPending } = useLogin();
  const { signup, signupPending } = useSignup();
  const { githubLogin, githubPending } = useGithubLoginHook();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(currentSchema),
  });

  // GitHub OAuth Handler
  const handleGithubLogin = async () => {
    try {
      const githubAuthUrl = `${import.meta.env.VITE_BASE_API_URL}/auth/github`;
      // Store the current URL in session storage to redirect back after OAuth
      sessionStorage.setItem('oauth_redirect', window.location.href);
    
      //popup window for GitHub OAuth
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        githubAuthUrl,
        'github-oauth',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Add message listener for the OAuth callback
      window.addEventListener('message', async (event) => {
        // Verify origin
        if (event.origin !== window.location.origin) return;
        
        if (event.data?.type === 'github-oauth-success' && event.data?.accessToken) {
          try {
            await githubLogin({ accessToken: event.data.accessToken });
            popup?.close();
          } catch (error) {
            console.error('GitHub login error:', error);
            showToast(
              error instanceof Error ? error.message : 'Failed to login with GitHub',
              'error'
            );
          }
        } else if (event.data?.type === 'github-oauth-error') {
          console.error('GitHub OAuth error:', event.data.error);
          showToast(event.data.error || 'Failed to connect with GitHub', 'error');
        }
      });

    } catch (error) {
      console.error("GitHub OAuth error:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to connect with GitHub",
        'error'
      );
    }
  };

  // Handle Remember Me toggle
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    if (!isChecked) {
      // Clear remembered data when unchecking
      localStorage.removeItem("rememberedUser");
    }
  };

  // Load remembered email on mount and mode change
  useEffect(() => {
    setIsSignIn(searchParams.get("mode") === "signin");

    if (initialIsSignIn) {
      const remembered = localStorage.getItem("rememberedUser");
      if (remembered) {
        const { email } = JSON.parse(remembered);
        // Set email in form
        setValue("email", email);
      }
    }
  }, [searchParams, initialIsSignIn, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (isSignIn) {
        await login(data as unknown as Record<string, unknown>);
        // Update localStorage based on remember me state
        if (rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ email: data.email })
          );
        }
      } else {
        await signup(data as unknown as Record<string, unknown>);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const toggleAuthMode = () => {
    const newMode = isSignIn ? "signup" : "signin";
    navigate(`/auth?mode=${newMode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {isSignIn ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-gray-500">
              {isSignIn
                ? "Enter your credentials to access your account"
                : "Join us and start sharing your thoughts"}
            </p>
          </div>

          {/* Social Login Buttons */}
          {/* <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg transition duration-200 ${
                githubPending ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
              onClick={handleGithubLogin}
              disabled={githubPending}
            >
              {githubPending ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
              ) : (
                <FaGithub className="text-gray-900" />
              )}
              <span className="text-sm font-medium">
                {githubPending ? 'Connecting...' : 'GitHub'}
              </span>
            </button>
          </div> */}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isSignIn && (
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <CustomeInput
                      label="firstName"
                      error={errors?.firstName?.message}
                      placeholder="First Name"
                      field={field}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <CustomeInput
                      label="lastName"
                      error={errors?.lastName?.message}
                      placeholder="Last Name"
                      field={field}
                    />
                  )}
                />
              </div>
            )}

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomeInput
                  label="Email"
                  error={errors.email?.message}
                  placeholder="you@example.com"
                  field={field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomeInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  error={errors.password?.message}
                  placeholder="••••••••"
                  field={field}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  }
                />
              )}
            />

            {/* Remember Me and Forgot Password */}
            {isSignIn && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginPending || signupPending}
              className={`
                w-full py-3 px-4 rounded-lg text-white font-medium
                ${
                  loginPending || signupPending
                    ? "bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }
                transition duration-200 transform hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {loginPending || signupPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : isSignIn ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <p className="text-center text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleAuthMode}
              className="text-blue-600 hover:text-blue-700 hover:underline font-medium focus:outline-none"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
