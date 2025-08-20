import type { ReactNode } from "react";
interface props {
  children?: ReactNode;
  item: {
    title: string;
    createdAt: string;
    company: string;
    location: string;
    description: string;
    salary: number;
    _count: {
      application: number;
    };
  };
}
const JobCard = ({ children, item }: props) => {
  return (
    <div className="rounded-2xl bg-gray-100 p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
        <span className="text-sm text-gray-500">
          Posted on {item.createdAt.split("T")[0]}
        </span>
      </div>

      <h3 className="text-md mb-1 text-gray-600">{item.company}</h3>
      <p className="mb-3 text-sm text-gray-500">
        📍{item.location} , Salary: {item.salary}
      </p>

      <p className="mb-4 line-clamp-3 text-sm text-gray-700">
        {item.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          💼 {item._count.application} applicants
        </p>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
};

export default JobCard;
