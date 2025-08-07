import { baseUrl } from "../config/apiConfig";
import { deleteRequest, patchRequest, postRequest } from "../helper/apiHelper";
import type {
  ApplicationList,
  CreateJob,
  JobDetails,
  JobListings,
  UpdateJob,
} from "../types/job.type";

const jobUrl = `${baseUrl}/api/v1/jobs`;

export async function createJob(data: CreateJob) {
  return await postRequest({
    url: `${jobUrl}`,
    data,
  });
}
export async function getAllJobListing(
  offset: number = 0,
  limit: number = 10,
): Promise<JobListings> {
  const res = await fetch(
    `${baseUrl}/api/v1/jobs?limit=${limit}&&offset=${offset}`,
  );
  const data = await res.json();
  return data;
}
export async function getJobDetails(jobId: number): Promise<JobDetails> {
  const res = await fetch(`${baseUrl}/api/v1/jobs/${jobId}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.data;
}

export async function updateJob(jobId: number, data: UpdateJob) {
  return await patchRequest({
    url: `${jobUrl}/${jobId}`,
    data,
  });
}
export async function deleteJob(jobId: number) {
  return await deleteRequest({
    url: `${jobUrl}/${jobId}`,
    data: null,
  });
}
export async function getMyJobsListing(
  offset: number = 0,
  limit: number = 10,
): Promise<JobListings> {
  const res = await fetch(`${jobUrl}/me?limit=${limit}&&offset=${offset}`, {
    credentials: "include",
  });
  const data = res.json();
  return data;
}
// * application data
export async function applyJob(jobId: number, data: FormData) {
  return await postRequest({
    url: `${baseUrl}/api/v1/apply/${jobId}`,
    data,
  });
}
export async function getJobApplications(
  jobId: number,
  offset: number = 0,
  limit: number = 10,
): Promise<ApplicationList> {
  const res = await fetch(
    `${baseUrl}/api/v1/apply/${jobId}?limit=${limit}&&offset=${offset}`,
    {
      credentials: "include",
    },
  );
  return res.json();
}
