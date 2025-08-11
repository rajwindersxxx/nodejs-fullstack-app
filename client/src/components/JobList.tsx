import { useModal } from "../context/ModalContext";
import { useUIContext } from "../context/UIContext";
import useJob from "../hooks/useJob";
import ApplyJobForm from "./forms/ApplyJobForm";
import ErrorMessage from "./ui/ErrorMessage";
import JobCard from "./ui/JobCard";
import { PrimaryButton } from "./ui/PrimaryButton";
import Spinner from "./ui/Spinner";

interface props {
  offset: number;
}
const JobList = ({ offset }: props) => {
  const { openModal } = useModal();
  const { search } = useUIContext();

  const { jobListing, isLoadingListing, listingError } = useJob({
    searchQuery: search,
    offset,
  });
  if (isLoadingListing) return <Spinner />;
  if (listingError) return <ErrorMessage>{listingError.message}</ErrorMessage>;

  return (
    <>
      {jobListing?.data?.map((item) => (
        <JobCard key={item.id} item={item}>
          <PrimaryButton
            onClick={() => openModal(<ApplyJobForm data={item} />, "applyJob")}
          >
            Apply now
          </PrimaryButton>
        </JobCard>
      ))}
    </>
  );
};

export default JobList;
