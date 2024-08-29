import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/postjob" : "/jobs");
      })
      .catch((error) => {
        console.log("Error in handleRoleSelection", error);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(user.unsafeMetadata.role === "recruiter" ? "/postjob" : "/jobs");
    }
  }, [user]);

  if (!isLoaded) {
    console.log("loading....");
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h1>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          onClick={() => handleRoleSelection("candidate")}
          className="h-36 text-2xl"
          variant="blue"
        >
          Candidate
        </Button>
        <Button
          onClick={() => handleRoleSelection("recruiter")}
          className="h-36 text-2xl"
          variant="destructive"
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
}
