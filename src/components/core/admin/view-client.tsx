'use client';

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import EditUniversityForm from "@/components/core/admin/edit-university";
import { FIELD_PARAMS } from "@/constant/params";
import { UserFieldProps } from "@/types/user-field";
import { useBreadcrumb } from "@/context/breadcrumb-context";

interface ErrorFieldProps {
  isError: boolean;
  msg: string
}

type ViewUniversityProps = UserFieldProps & ErrorFieldProps;
export default function ViewUniversity({ userData, isError, msg }: ViewUniversityProps) {
        const { setBreadcrumbs } = useBreadcrumb();
    
      useEffect(() => {
        if(isError) throw new Error(msg || "Something went wrong");
        setBreadcrumbs([
          { label: "Universities", href: "/admin/universities" },
          { label: `${userData.university_name}`, href: "#" },
        ]);
      }, [setBreadcrumbs]);

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">University Information</h2>
                <EditUniversityForm userData={userData}/>
            </div>

            <CardContent className="mt-4 grid grid-cols-2 gap-y-4 text-sm">
                <div>
                    <p className="text-gray-500">University ID</p>
                    <p className="font-semibold">{userData[FIELD_PARAMS.ROLE_ID]}</p>
                </div>
                <div>
                    <p className="text-gray-500">University Name</p>
                    <p className="font-semibold">{userData[FIELD_PARAMS.UNIVERSITY_NAME]}</p>
                </div>
                <div>
                    <p className="text-gray-500">Email address</p>
                    <p className="font-semibold">{userData.email}</p>
                </div>
                <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-semibold">{userData.contact}</p>
                </div>
            </CardContent>
        </Card>
    );
}
