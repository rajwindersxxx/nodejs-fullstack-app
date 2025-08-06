import CreateJobForm from "../components/CreateJobForm";
import JobCard from "../components/JobCard";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";
import { useModal } from "../context/ModalContext";
import EditJobForm from "../components/EditJobForm";
import { useQuery } from "@tanstack/react-query";
import { getMyJobsListing } from "../api/jobs";

const PostJob = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useQuery({
    queryKey: ["selfPosted"],
    queryFn: getMyJobsListing,
  });
  if(isLoading) return <>Loading....</>
  return (
    <>
      <CreateJobForm />
      <div className="mx-auto max-w-3xl">
        <h2 className="p-4 text-center text-xl">Recently Posted</h2>
        <div className="flex flex-col gap-4">
          {data?.data?.map((item) => (
            <JobCard item={item} key={item.id}>
              <button type="button" className="hover:cursor-pointer">
                <HiOutlineTrash size={25} color="red" />
              </button>
              <button
                type="button"
                className="hover:cursor-pointer"
                onClick={() => openModal(<EditJobForm />, "editJob")}
              >
                <HiPencil size={25} color="gray" />
              </button>
            </JobCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostJob;
