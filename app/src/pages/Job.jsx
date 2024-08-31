import { getSingleJob, updateHiringStatus } from "@/api/apijobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPin } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JobPage() {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: id });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    { job_id: id }
  );

  const handleStatusChnage = async (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded]);

  // ** show the bar loader ...
  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className=" text-3xl font-bold text-green-500 pb-3 sm:text-4xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <MapPin />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen />
              Open
            </>
          ) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}
        </div>
      </div>
      {/* hiring status */}
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7"/>}
      {job?.recruiter_id === user?.id && (
        <Select  onValueChange={handleStatusChnage}>
          <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-950":"bg-red-950"}`}>
            <SelectValue placeholder={"Hiring Status " + (job?.isOpen ? "open" : "closed") } />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"open"}>Open</SelectItem>
            <SelectItem value={"closed"}>Closed</SelectItem>
          </SelectContent>
        </Select>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold">About The Job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What We are looking For ?
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent"
      />

      {/* render Applications.. */}
    </div>
  );
}
