import CreateJobForm from "../components/forms/CreateJobForm";
import PostedJobs from "../components/PostedJobs";

const AdminPage = () => {

  return (
    <>
      <CreateJobForm />
      <PostedJobs />
    </>
  );
};

export default AdminPage;
