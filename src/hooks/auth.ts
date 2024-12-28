import { useMutation } from "@tanstack/react-query";
import {
  ChangePassword,
  forgotPassword,
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

const useSignup = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading, setUser } = useAuth();
  const { mutateAsync, isError } = useMutation({
    mutationFn: signup,
    mutationKey: ["signup"],
    onError: (error) => {
      console.log(error);
    },
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
  return { signup: mutateAsync, isError };
};

const useLogin = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading, setUser } = useAuth();
  const { mutateAsync, isError } = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onError: (error) => {
      console.log(error);
    },
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
  return { login: mutateAsync, isError };
};

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, clearUser } = useAuth();
  const { mutateAsync, isError } = useMutation({
    mutationFn: logout,
    mutationKey: ["logout"],
    onError: (error) => {
      console.log(error);
    },
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
  const { mutateAsync, isError } = useMutation({
    mutationFn: forgotPassword,
    mutationKey: ["forgotPassword"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return { forgotPassword: mutateAsync, isError };
};
const useResetPassword = () => {
  const navigate = useNavigate();

  const { mutateAsync, isError } = useMutation({
    mutationFn: ({ password, token }: { password: string; token: string }) =>
      resetPassowrd(password, token),
    mutationKey: ["resetPassword"],
    onError: (error: any) => {
      console.error("Error resetting password:", error);
    },
    onSuccess: (data) => {
      if (data) {
        navigate("/signin");
      }
      // Redirect to login after success
    },
  });

  return { resetPassword: mutateAsync, isError };
};

const useVerifyOTP = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError } = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verfiyOTP(email, otp),
    mutationKey: ["verifyOTP"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      if (data) {
        navigate("/dashboard");
      }
    },
  });
  return { verifyOTP: mutateAsync, isError };
};

const useResendOTP = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError } = useMutation({
    mutationFn: ({ email }: { email: string }) => requestNewOTP(email),
    mutationKey: ["resendOTP"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      if (data) {
        navigate("/verify-otp");
      }
    },
  });
  return { resendOTP: mutateAsync, isError };
};
const useChangePassword = () => {
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: ChangePassword,
    mutationKey: ["changePassword"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return { changePassword: mutateAsync, isError, isPending };
};

export {
  useSignup,
  useLogin,
  useForgotPassword,
  useResetPassword,
  useLogout,
  useVerifyOTP,
  useResendOTP,
  useChangePassword,
};
