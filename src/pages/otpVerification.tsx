import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useResendOTP, useVerifyOTP } from "../hooks/auth";
import useAuth from "../store/useAuth";

interface OTPForm {
  otp: string[];
  email: string;
}

function OTPPage() {
  const { user } = useAuth();

  const { verifyOTP } = useVerifyOTP();
  const { resendOTP } = useResendOTP();
  const [resendTimer, setResendTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const { handleSubmit, control, setValue, getValues } = useForm<OTPForm>({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
      email: user?.email || "",
    },
  });

  // Simulate OTP submission
  const onSubmit = async (data: OTPForm) => {
    const otpValue = data.otp.join(""); // Combine all boxes
    const email = user?.email || "";
    const formData = { email, otp: otpValue };
    await verifyOTP(formData);
  };

  // Handle Resend OTP
  const handleResend = async () => {
    setResendLoading(true);
    setResendDisabled(true);
    setResendTimer(30);

    const email = user?.email || "";
    try {
      await resendOTP({ email });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to resend OTP. Please try again.");
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } finally {
      setResendLoading(false);
    }
  };
  // Handle Input Change
  const handleInputChange = (
    value: string,
    index: number,
    setValue: (name: `otp.${number}`, value: string) => void,
    getValues: () => OTPForm["otp"]
  ) => {
    const otpValues = [...getValues()];
    otpValues[index] = value.slice(-1); // Only the last digit
    setValue(`otp.${index}`, otpValues[index]);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    } else if (otpValues.every((digit) => digit)) {
      handleSubmit(onSubmit)(); // Automatically submit when all boxes are filled
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (resendDisabled) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendDisabled]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Enter OTP
      </motion.h1>

      {/* Description */}
      <p className="text-lg mb-4 text-center max-w-sm">
        A 6-digit verification code was sent to your email. Please enter it
        below.
      </p>

      {/* OTP Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* OTP Input Boxes */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Controller
              key={index}
              name={`otp.${index}`}
              control={control}
              rules={{
                required: "This field is required",
                pattern: /^[0-9]{1}$/,
              }}
              render={({ field, fieldState }) => (
                <motion.input
                  {...field}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className={`w-12 h-12 text-center text-xl font-bold rounded-md bg-white text-black border-2 focus:outline-none ${
                    fieldState.invalid
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-green-500"
                  }`}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, setValue, () =>
                      getValues("otp")
                    )
                  }
                  whileHover={{ scale: 1.1 }}
                  animate={fieldState.invalid ? { x: [0, -5, 5, -5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                />
              )}
            />
          ))}
        </div>

        {/* Resend Button */}
        <div className="flex items-center justify-between w-full max-w-sm mt-4">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendDisabled || resendLoading}
            className={`px-4 py-2 bg-green-500 text-white rounded shadow-lg hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed`}
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>

          <span className="text-sm">
            {resendDisabled
              ? `Wait for ${resendTimer}s`
              : "Didn't receive the code?"}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700"
        >
          Verify OTP
        </button>
      </motion.form>
    </div>
  );
}

export default OTPPage;
