import { Input } from "./ui/Input";
import { PrimaryButton } from "./ui/PrimaryButton";
import { Textarea } from "./ui/TextArea";

const CreateJobForm = () => {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="p-2 text-center text-xl">Create a job posting</h2>
      <form className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="Enter title of job "
          type="text"
          required
        />
        <Input
          label="Company"
          placeholder="Enter Your company name  "
          type="text"
          required
        />
        <Input
          label="Location"
          placeholder="Enter Job Location"
          type="text"
          required
        />
        <Textarea
          label="Job description"
          placeholder="Enter job description"
          required
        />
        <div className="flex justify-end">
          <PrimaryButton type="submit">Create Listing</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
