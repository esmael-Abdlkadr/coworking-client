import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/Button";
import { useChangePassword } from "../../hooks/auth";
import { useState } from "react";
const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(6, "Password must be at least 6 characters"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Password must match"),
});
interface IPasswordManagerInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
function PasswordManager() {
  const { changePassword, isPending } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<IPasswordManagerInput> = (data) => {
    changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-4 relative">
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 border rounded"
              placeholder="Enter your current password"
            />
          )}
        />

        {errors.currentPassword && (
          <p className="text-sm text-red-500 mt-1">
            {" "}
            {errors.currentPassword.message}
          </p>
        )}
        <button
          className="px-1 py-1 bg-orange-500 text-white  rounded-xl text-center absolute top-11 right-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "hide" : "show"}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your new password"
            />
          )}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500 mt-1">
            {" "}
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              className="w-full px-4 py-2 border rounded"
              placeholder="Confirm your new password"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">
            {" "}
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button title={isPending ? "await a Moment" : "Change Password"} />
    </form>
  );
}

export default PasswordManager;
