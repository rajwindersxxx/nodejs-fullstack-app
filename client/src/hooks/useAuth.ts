import { useQuery } from "@tanstack/react-query";
import { getAuthDetails } from "../api/auth";
const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuthDetails,
    retry: false,
    staleTime: 0,
  });

  return { data, isLoading, isError };
};

export default useAuth;
