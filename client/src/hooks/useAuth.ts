import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    // Don't throw on 401 - it's a normal unauthenticated state
    throwOnError: (error) => {
      return !/401/.test(error.message);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
  };
}
