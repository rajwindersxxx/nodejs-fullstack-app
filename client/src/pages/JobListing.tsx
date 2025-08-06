import { useQuery } from "@tanstack/react-query";
import JobCard from "../components/JobCard";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { getAllJobListing } from "../api/jobs";

const JobListing = () => {
  const { data } = useQuery({
    queryKey: ["jobListing"],
    queryFn: getAllJobListing,
  });
  function handleApplyJob(jobId: number) {
    console.log(jobId)
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <h2 className="p-4 text-center text-3xl">Recently Added </h2>
      {data?.data.map((item) => (
        <JobCard key={item.id} item={item}>
          <PrimaryButton onClick={() => handleApplyJob(item.id)}>Apply now</PrimaryButton>
        </JobCard>
      ))}
    </div>
  );
};

export default JobListing;
