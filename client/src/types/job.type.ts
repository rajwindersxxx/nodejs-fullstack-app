export interface CreateJob {
  title: string;
  company: string;
  location: string;
  description: string;
}
export interface JobDetails extends CreateJob {
  id: number;
  userId: number;
  createdAt: string;
  _count: {
    application: number;
  };
}
export interface JobListings {
  limit: number;
  offset: number;
  total: number;
  data: JobDetails[];
}
export interface UpdateJob {
  jobId: number;
  data: {
    location: string;
    description: string;
  };
}
