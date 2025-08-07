import { useQuery } from "@tanstack/react-query";
import JobCard from "../components/JobCard";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { getAllJobListing } from "../api/jobs";
import { useModal } from "../context/ModalContext";
import ApplyJobForm from "../components/ApplyJobForm";

const JobListing = () => {
  const { openModal } = useModal();
  const { data } = useQuery({
    queryKey: ["jobListing"],
    queryFn: getAllJobListing,
  });
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <h2 className="p-4 text-center text-3xl">Recently Added </h2>
      {data?.data?.map((item) => (
        <JobCard key={item.id} item={item}>
          <PrimaryButton
            onClick={() =>
              openModal(<ApplyJobForm data={item} />, "applyJob")
            }
          >
            Apply now
          </PrimaryButton>
        </JobCard>
      ))}
    </div>
  );
};

export default JobListing;
