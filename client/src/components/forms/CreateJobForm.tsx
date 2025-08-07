import { useState } from "react";
import { Input } from "../ui/Input";
import { PrimaryButton } from "../ui/PrimaryButton";
import { Textarea } from "../ui/TextArea";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateJob } from "../../types/job.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../../api/jobs";

const CreateJobForm = () => {
  const [error, setError] = useState<string>();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateJob>();
  const { mutate: postNewJob, isPending } = useMutation({
    mutationKey: ["createJob"],
    mutationFn: (input: CreateJob) => createJob(input),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["selfPosted"] });
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const onSubmit: SubmitHandler<CreateJob> = (data) => postNewJob(data);
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="p-2 text-center text-xl">Create a job posting</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          placeholder="Enter title of job "
          type="text"
          disabled={isPending}
          error={errors.title?.message}
          {...register("title", { required: "Title is required" })}
          required
        />
        <Input
          label="Company"
          placeholder="Enter Your company name  "
          type="text"
          disabled={isPending}
          error={errors.company?.message}
          {...register("company", { required: "Company name is required" })}
          required
        />
        <Input
          label="Location"
          placeholder="Enter Job Location"
          type="text"
          disabled={isPending}
          error={errors.location?.message}
          {...register("location", { required: "Location is required" })}
          required
        />
        <Textarea
          label="Job description"
          placeholder="Enter job description"
          {...register("description", {
            required: "Job description is required",
          })}
          disabled={isPending}
          error={errors.description?.message}
          required
        />
        {error && <p className="text-center text-xs text-red-500">{error}</p>}
        <div className="flex justify-end">
          <PrimaryButton type="submit" disabled={isPending}>
            Create Listing
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
