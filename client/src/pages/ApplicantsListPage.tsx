import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {  getJobApplications, getJobDetails } from "../api/jobs";
import JobCard from "../components/JobCard";
const ApplicantsListPage = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["jobDetails", id],
    queryFn: () => getJobDetails(Number(id)),
  });
  const {data: ApplicantData} = useQuery({
    queryKey: ["applicantData", id],
    queryFn: () => getJobApplications(Number(id))
  })
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {data && <JobCard item={data}>x</JobCard>}
      <h2 className="text-xl font-semibold text-center p-4">Applications </h2>
        <div className="rounded-md overflow-hidden border border-gray-200">
          <table className="min-w-full table-auto ">
            <thead className="bg-gray-100">
              <tr>
                <th className=" px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Resume
                </th>
              </tr>
            </thead>
            <tbody>
              {ApplicantData?.data.map((applicant, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className=" px-4 py-2 text-sm text-gray-800">
                    {applicant.name}
                  </td>
                  <td className=" px-4 py-2 text-sm text-gray-800">
                    {applicant.email}
                  </td>
                  <td className=" px-4 py-2 text-sm text-blue-600">
                    <a
                      href={applicant.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default ApplicantsListPage;
