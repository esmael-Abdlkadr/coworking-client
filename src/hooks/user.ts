import { useMutation } from "@tanstack/react-query";
import useAuth from "../store/useAuth";
import { User } from "../store/authStore";
import { updateMe } from "../API/services/userService";

const useUpdateMe = () => {
  const { setUser } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateMe,
    onSuccess: (data) => {
      setUser(data as User);
    },
  });
  return { updateMe: mutateAsync, isPending };
};
export { useUpdateMe };
