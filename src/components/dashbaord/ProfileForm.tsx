import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/Button";
import useAuth from "../../store/useAuth";
import { useUpdateMe } from "../../hooks/user";
import Spinner from "../Spinner";

interface ProfileForm extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
}
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
});

function ProfileSettings() {
  const { user } = useAuth();
  const { updateMe, isPending } = useUpdateMe();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
  });

  const onSubmit = (data: ProfileForm) => {
    updateMe(data, {
      onSuccess: () => {
        reset();
      },
    });
  };
  if (isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-4 py-3 border rounded"
                placeholder="Enter your first name"
              />
            )}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-4 py-3 border rounded"
                placeholder="Enter your last name"
              />
            )}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="w-full px-6 py-3 border rounded"
                placeholder="Enter your email"
              />
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button title="Save Changes" />
      </form>
    </div>
  );
}

export default ProfileSettings;
