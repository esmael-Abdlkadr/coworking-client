import { useTrackedMutation } from "../utils/sentryUtil";
import {
  ChangePassword,
  forgotPassword,
  githubLogin,
  googleLogin,
  login,
  logout,
  requestNewOTP,
  resetPassowrd,
  signup,
  verfiyOTP,
} from "../API/services/authService";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
import { Role } from "../store/authStore";
import showToast from "../utils/toastHelper"; 
const useSignup = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading, setUser } = useAuth();
  const { mutateAsync, isError, isPending } = useTrackedMutation(signup, {
    mutationKey: ["signup"],
    onSuccess: (data) => {
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        setIsAuthenticated(true);
        setUser({
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          role: data.user.role as unknown as Role,
          permissions: data.user.permissions,
          active: data.user.active,
          emailVerified: data.user.emailVerified,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
        });
        setIsLoading(false);
        navigate("/verify-otp");
      }
    },
  });
  return { signup: mutateAsync, isError, signupPending: isPending };
};

const useLogin = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading, setUser } = useAuth();
  const { mutateAsync, isError, isPending } = useTrackedMutation(login, {
    mutationKey: ["login"],
    onSuccess: (data) => {
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        setIsAuthenticated(true);
        setUser({
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          role: data.user.role as unknown as Role,
          permissions: data.user.permissions,
          active: data.user.active,
          emailVerified: data.user.emailVerified,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
        });
        setIsLoading(false);
        navigate("/dashboard");
      }
    },
  });
  return { login: mutateAsync, isError, loginPending: isPending };
};

const useGoogleLoginHook = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading, setUser } = useAuth();
  
  const { mutateAsync, isError, isPending } = useTrackedMutation(
    ({ accessToken }: { accessToken: string }) => googleLogin({ accessToken }),
    {
      mutationKey: ["googleLogin"],
      onSuccess: (data) => {
        if (!data?.accessToken || !data?.user) {
          showToast("Invalid response from Google login", "error");
          return;
        }

        try {
          localStorage.setItem("accessToken", data.accessToken);
          setIsAuthenticated(true);
          setUser({
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            role: data.user.role as unknown as Role,
            permissions: data.user.permissions,
            active: data.user.active,
            emailVerified: data.user.emailVerified,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
          });
          
          // Store any additional user preferences
          if (data.user.preferences) {
            localStorage.setItem("userPreferences", JSON.stringify(data.user.preferences));
          }
          
          navigate("/");
        } catch (error) {
          console.error("Error processing Google login response:", error);
          showToast("Error setting up user session", "error");
          setIsAuthenticated(false);
          localStorage.removeItem("accessToken");
        } finally {
          setIsLoading(false);
        }
      },
      onError: (error: Error) => {
        setIsLoading(false);
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
        showToast(error.message || "Failed to login with Google", "error");
        navigate("/auth?mode=signin");
      }
    }
  );
  
  return { googleLogin: mutateAsync, isError, googleLoginPending: isPending };
};

const useGithubLoginHook = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading, setUser } = useAuth();
  
  const { mutateAsync, isError, isPending } = useTrackedMutation(
    ({ accessToken }: { accessToken: string }) => githubLogin({ accessToken }),
    {
      mutationKey: ["githubLogin"],
      onSuccess: (data) => {
        if (!data?.accessToken || !data?.user) {
          showToast("Invalid response from GitHub login", "error");
          return;
        }

        try {
          localStorage.setItem("accessToken", data.accessToken);
          setIsAuthenticated(true);
          setUser({
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            role: data.user.role as unknown as Role,
            permissions: data.user.permissions,
            active: data.user.active,
            emailVerified: data.user.emailVerified,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
          });
          
          // Store any additional user preferences
          if (data.user.preferences) {
            localStorage.setItem("userPreferences", JSON.stringify(data.user.preferences));
          }
          
          navigate("/");
        } catch (error) {
          console.error("Error processing GitHub login response:", error);
          showToast("Error setting up user session", "error");
          setIsAuthenticated(false);
          localStorage.removeItem("accessToken");
        } finally {
          setIsLoading(false);
        }
      },
      onError: (error: Error) => {
        setIsLoading(false);
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
        showToast(error.message || "Failed to login with GitHub", "error");
        navigate("/auth?mode=signin");
      }
    }
  );
  
  return { githubLogin: mutateAsync, isError, githubPending: isPending };
};

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, clearUser } = useAuth();
  const { mutateAsync, isError } = useTrackedMutation(logout, {
    mutationKey: ["logout"],
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      clearUser();

      navigate("/signin", { replace: true });
      // clear the history stack.
      window.history.replaceState(null, "", "/signin");
    },
  });
  return { logout: mutateAsync, isError };
};

const useForgotPassword = () => {
  const { mutateAsync, isError } = useTrackedMutation(forgotPassword, {
    mutationKey: ["forgotPassword"],
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return { forgotPassword: mutateAsync, isError };
};

const useResetPassword = () => {
  const navigate = useNavigate();

  const { mutateAsync, isError } = useTrackedMutation(
    ({ password, token }: { password: string; token: string }) =>
      resetPassowrd(password, token),
    {
      mutationKey: ["resetPassword"],
      onSuccess: (data) => {
        if (data) {
          navigate("/signin");
        }
        // Redirect to login after success
      },
    }
  );

  return { resetPassword: mutateAsync, isError };
};

const useVerifyOTP = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError } = useTrackedMutation(
    ({ email, otp }: { email: string; otp: string }) => verfiyOTP(email, otp),
    {
      mutationKey: ["verifyOTP"],
      onSuccess: (data) => {
        if (data) {
          navigate("/dashboard");
        }
      },
    }
  );
  return { verifyOTP: mutateAsync, isError };
};

const useResendOTP = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError } = useTrackedMutation(
    ({ email }: { email: string }) => requestNewOTP(email),
    {
      mutationKey: ["resendOTP"],
      onSuccess: (data) => {
        if (data) {
          navigate("/verify-otp");
        }
      },
    }
  );
  return { resendOTP: mutateAsync, isError };
};

const useChangePassword = () => {
  const { mutateAsync, isError, isPending } = useTrackedMutation(
    ChangePassword,
    {
      mutationKey: ["changePassword"],
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  return { changePassword: mutateAsync, isError, isPending };
};

export {
  useSignup,
  useLogin,
  useGoogleLoginHook,
  useGithubLoginHook,
  useForgotPassword,
  useResetPassword,
  useLogout,
  useVerifyOTP,
  useResendOTP,
  useChangePassword,
};
