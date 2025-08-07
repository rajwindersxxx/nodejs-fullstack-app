import CreateJobForm from "../components/CreateJobForm";
import JobCard from "../components/JobCard";
import { HiEye, HiOutlineTrash, HiPencil } from "react-icons/hi";
import { useModal } from "../context/ModalContext";
import EditJobForm from "../components/EditJobForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteJob, getMyJobsListing } from "../api/jobs";
import ConfirmModel from "../components/ConfirmModel";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["selfPosted"],
    queryFn: getMyJobsListing,
  });
  const { mutate: deleteJobListing, isPending } = useMutation({
    mutationFn: (jobId: number) => deleteJob(jobId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["selfPosted"] });
      closeModal();
    },
  });
  if (isLoading) return <>Loading....</>;
  return (
    <>
      <CreateJobForm />
      <div className="mx-auto max-w-3xl">
        <h2 className="p-4 text-center text-xl">Recently Posted</h2>
        <div className="flex flex-col gap-4">
          {data?.data?.map((item) => (
            <JobCard item={item} key={item.id}>
              <button
                type="button"
                className="hover:cursor-pointer"
                onClick={() =>
                  openModal(
                    <ConfirmModel
                      confirmDelete={() => deleteJobListing(item.id)}
                      message="Do you want to delete Job listing"
                      type="confirm"
                    />,
                    "confirmWindow",
                    { isPending },
                  )
                }
              >
                <HiOutlineTrash size={25} color="red" />
              </button>
              <button
                type="button"
                className="hover:cursor-pointer"
                onClick={() =>
                  openModal(<EditJobForm data={item} />, "editJob")
                }
              >
                <HiPencil size={25} color="gray" />
              </button>
              <Link to={`/post/${item.id}`}>
                <HiEye size={25} color="orange" />
              </Link>
            </JobCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
