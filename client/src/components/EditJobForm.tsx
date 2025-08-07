import { useState } from "react";
import type { JobDetails, UpdateJob } from "../types/job.type";
import { Input } from "./ui/Input";
import { PrimaryButton } from "./ui/PrimaryButton";
import { Textarea } from "./ui/TextArea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob } from "../api/jobs";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useModal } from "../context/ModalContext";
interface props {
  data: JobDetails;
}
const EditJobForm = ({ data }: props) => {
  const [error, setError] = useState<string>();
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateJob>();
  const { mutate: updateJobPosting, isPending } = useMutation({
    mutationKey: ["updateJob"],
    mutationFn: (input: UpdateJob) => updateJob(data.id, input),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["selfPosted"] });
      closeModal();
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const onSubmit: SubmitHandler<UpdateJob> = (data) => updateJobPosting(data);
  return (
    <div className="mx-auto w-3xl">
      <h2 className="p-2 text-center text-xl">Update job posting</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          placeholder="Enter title of job "
          type="text"
          defaultValue={data.title}
          disabled
        />
        <Input
          label="Company"
          placeholder="Enter Your company name  "
          type="text"
          defaultValue={data.company}
          disabled
        />
        <Input
          label="Location"
          placeholder="Enter Job Location"
          type="text"
          defaultValue={data.location}
          disabled={isPending}
          error={errors.location?.message}
          {...register("location", { required: "Location is required" })}
          required
        />
        <Textarea
          label="Job description"
          placeholder="Enter job description"
          defaultValue={data.description}
          {...register("description", {
            required: "Job description is required",
          })}
          disabled={isPending}
          error={errors.description?.message}
          required
        />
        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <div className="flex justify-end">
          <PrimaryButton type="submit" disabled={isPending}>Update Listing</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default EditJobForm;
