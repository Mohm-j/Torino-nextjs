import {
  getUserProfile,
  getUserTours,
  getUserTransactions,
  updateUserProfile,
} from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
    },
  });
};

export const useUserTours = () =>
  useQuery({
    queryKey: ["userTours"],
    queryFn: getUserTours,
  });

export const useUserTransactions = () =>
  useQuery({
    queryKey: ["userTransactions"],
    queryFn: getUserTransactions,
  });
