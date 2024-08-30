import { getCompanies } from "@/api/apiCompanies";
import { getjobs } from "@/api/apijobs";
import JobCard from "@/components/Job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  // ** calling the hook for fetching jobs
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
    error,
  } = useFetch(getjobs, { location, company_id, searchQuery });
  console.log(jobs);

  // ** calling the hook for fetching companies
  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  // ** useEffect for fetching Data
  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query")
    if(query) setSearchQuery(query);
  };

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
      <form onSubmit={handleSearch} className="h-14 flex items-center gap-2 w-full mb-3">
        <Input
          type="text"
          name="search-query"
          placeholder="search jobs by title"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">Search</Button>
      </form>
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      {loadingJobs === false && (
        <div>
          {jobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {jobs.map((job, index) => {
                return (
                  <div>
                    <JobCard
                      key={index}
                      job={job}
                      savedInit={job?.saved?.length > 0}
                    />{" "}
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
