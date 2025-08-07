import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ApplyJob, JobDetails } from "../../types/job.type";
import { applyJob } from "../../api/jobs";
import { useState } from "react";
import { Input } from "../ui/Input";
import { PrimaryButton } from "../ui/PrimaryButton";
import { useModal } from "../../context/ModalContext";
import ConfirmModel from "../ui/ConfirmModel";
interface props {
  data: JobDetails;
}
const ApplyJobForm = ({ data }: props) => {
  const { openModal } = useModal();
  const [error, setError] = useState<string>();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyJob>();
  const { mutate: applyNewJob, isPending } = useMutation({
    mutationFn: (input: FormData) => applyJob(data.id, input),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["selfPosted"] });
      openModal(
        <ConfirmModel
          message="Application Applied Successfully"
          type="message"
        />,
        "successMessage",
      );
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const onSubmit: SubmitHandler<ApplyJob> = (data) => {
    const formData = new FormData();
    formData.append("resume", data.resume[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);

    applyNewJob(formData);
  };

  return (
    <div className="mx-auto w-xl">
      <h2 className="p-2 text-center text-xl">
        Apply for{" "}
        <span className="font-semibold">
          {data.title} at {data.company}
        </span>
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          placeholder="Enter Your name "
          type="text"
          disabled={isPending}
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
          required
        />
        <Input
          label="Email"
          placeholder="Enter Your email name  "
          type="text"
          disabled={isPending}
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
          required
        />
        <Input
          label="Upload resume"
          placeholder="Enter Your email name  "
          type="file"
          disabled={isPending}
          error={errors.resume?.message}
          {...register("resume", { required: "Resume is required" })}
          required
        />
        {error && <p className="text-center text-xs text-red-500">{error}</p>}
        <div className="flex justify-end">
          <PrimaryButton type="submit" disabled={isPending}>
            Submit
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ApplyJobForm;
