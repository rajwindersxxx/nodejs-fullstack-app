import { useQuery } from "@tanstack/react-query";
import { getAllJobListing } from "../api/jobs";
import { useUIContext } from "../context/UIContext";
import { useEffect } from "react";
interface props {
  searchQuery: string;
  offset?: number;
  limit?: number;
}
const useJob = ({ searchQuery, offset = 0, limit = 10 }: props) => {
  const { setTotalJobListing } = useUIContext();
  const {
    data: jobListing,
    isLoading: isLoadingListing,
    error: listingError,
  } = useQuery({
    queryKey: ["jobListing", searchQuery, offset],
    queryFn: () => getAllJobListing(limit, offset, "title", searchQuery),
  });
  useEffect(() => {
    setTotalJobListing(jobListing?.total || 0);
  }, [jobListing?.total, setTotalJobListing]);
  return { jobListing, isLoadingListing, listingError };
};

export default useJob;
