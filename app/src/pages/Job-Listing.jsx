import { getjobs } from "@/api/apijobs";
import JobCard from "@/components/Job-card";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export default function JobListing() {
  // ** states for the code .
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  // ** calling the hook
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
    error,
  } = useFetch(getjobs, { location, company_id, searchQuery });
  console.log(jobs);

  // ** useEffect for fetching Data
  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  // ** adding a loader bar on the top of the page
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* ** Addfilters */}
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      {loadingJobs === false && (
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            <div>
              {jobs.map((job, index) => {
                return (
                  <div>
                    <JobCard key={index} job={job} />{" "}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Sorry No Jobs Found 🥺🥺 </div>
          )}
        </div>
      )}
    </div>
  );
}
