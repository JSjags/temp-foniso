import axiosInstance from "@/services/api/axiosInstance";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type OptionProps<P, R> = UseMutationOptions<R, Error, P, unknown>;

const useCustomMutation = <P, R = unknown>(
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  options?: OptionProps<P, R>
) => {
  return useMutation({
    mutationKey: [url],
    mutationFn: (data: P): Promise<R> =>
      axiosInstance({
        url,
        method,
        data,
      }),
    ...options,
  });
};

export default useCustomMutation;
