import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HeartIcon, MapIcon, MapPin, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { saveJob } from "@/api/apijobs";

export default function JobCard({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) {
  // ** fetching user from useUser hook : provided by clerk
  const { user } = useUser();

  const [saved, setSaved] = useState(savedInit);

  //   ** utilizing the useFetchHook..
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
    error,
  } = useFetch(saveJob, { alreadySaved: saved });

  //   ** function for save and delete saved jobs
  const handleSavedJobs = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) {
      setSaved(savedJob?.length > 0);
    }
  }, [savedJob]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="cursor-pointer text-red-600"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex items-center gap-2">
            <MapPin size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            disabled={loadingSavedJob}
            onClick={handleSavedJobs}
          >
            {saved ? (
              <HeartIcon size={20} stroke="red" fill="red" />
            ) : (
              <HeartIcon size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
