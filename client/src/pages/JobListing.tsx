import { useQuery } from "@tanstack/react-query";
import JobCard from "../components/ui/JobCard";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { getAllJobListing } from "../api/jobs";
import { useModal } from "../context/ModalContext";
import ApplyJobForm from "../components/forms/ApplyJobForm";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const JobListing = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useQuery({
    queryKey: ["jobListing"],
    queryFn:() => getAllJobListing(),
  });
  if (isLoading) return <Spinner />;
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <h2 className="p-4 text-center text-3xl">Recent Job Listing </h2>
      {data?.data.length === 0 && (
        <ErrorMessage>No Job listing Yet.</ErrorMessage>
      )}
      {data?.data?.map((item) => (
        <JobCard key={item.id} item={item}>
          <PrimaryButton
            onClick={() => openModal(<ApplyJobForm data={item} />, "applyJob")}
          >
            Apply now
          </PrimaryButton>
        </JobCard>
      ))}
    </div>
  );
};

export default JobListing;
