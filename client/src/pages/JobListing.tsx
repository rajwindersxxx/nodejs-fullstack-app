import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import { useUIContext } from "../context/UIContext";

const JobListing = () => {
  const { totalJobListing, search } = useUIContext();
  const limit = 10;
  const [jobs, setJobs] = useState<number[]>([0]);
  function handlePagination() {
    setJobs((preState) => [...preState, preState[preState.length - 1] + limit]);
  }
  useEffect(() => {
    setJobs([0]);
  }, [search]);
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <h2 className="p-4 text-center text-3xl">Recent Job Listing </h2>
      {jobs.map((item) => (
        <JobList offset={item} key={item} />
      ))}
      {jobs.at(-1) || 0 + limit < totalJobListing && (
        <button
          className="p-4 text-center text-xl underline"
          onClick={handlePagination}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default JobListing;
{
  /* {jobListing?.data.length === 0 && (
        <ErrorMessage>No Job listing Yet.</ErrorMessage>
      )} */
}
