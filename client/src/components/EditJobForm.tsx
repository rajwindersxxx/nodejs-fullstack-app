import { Input } from "./ui/Input";
import { PrimaryButton } from "./ui/PrimaryButton";
import { Textarea } from "./ui/TextArea";

const EditJobForm = () => {
  return (
    <div className="mx-auto w-3xl">
      <h2 className="p-2 text-center text-xl">Edit job posting</h2>
      <form className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="Enter title of job "
          type="text"
          defaultValue={"test Location"}
          disabled
          required
        />
        <Input
          label="Company"
          placeholder="Enter Your company name  "
          type="text"
          defaultValue={"test Location"}
          disabled
          required
        />
        <Input
          label="Location"
          placeholder="Enter Job Location"
          type="text"
          defaultValue={"test Location"}
          required
        />
        <Textarea
          label="Job description"
          placeholder="Enter job description"
          defaultValue={
            "lkl ksdjfkl soiw joej ksldg sd fsd gwpdskljf lslkjgp ow  lkjklfjsepo sjglksjgkfjkdslgj sd eskljkgjd"
          }
          required
        />
        <div className="flex justify-end">
          <PrimaryButton type="submit">Update Listing</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default EditJobForm;
