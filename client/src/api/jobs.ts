import { baseUrl } from "../config/apiConfig";
import { patchRequest, postRequest } from "../helper/apiHelper";
import type { CreateJob, JobListings, UpdateJob } from "../types/job.type";

const jobUrl = `${baseUrl}/api/v1/jobs`;


export async function postJob(data: CreateJob) {
  return await postRequest({
    url: `${jobUrl}`,
    data,
  });
}
export async function getAllJobListing(): Promise<JobListings> {
  const res = await fetch(`${baseUrl}/api/v1/jobs`);
  const data = await res.json();
  return data;
}

export async function updateJob({ jobId, data }: UpdateJob) {
  return await patchRequest({
    url: `${jobUrl}/${jobId}`,
    data,
  });
}
export async function getMyJobsListing(): Promise<JobListings> {
  const res = await fetch(`${jobUrl}/me`, { credentials: "include" });
  const data = res.json();
  return data;
}
interface ApplyJob {
  data: { name: string; email: string; resume: File };
  jobId: number;
}
export async function applyJob({ jobId, data }: ApplyJob) {
  return await postRequest({
    url: `${baseUrl}/apply/${jobId}`,
    data,
  });
}
