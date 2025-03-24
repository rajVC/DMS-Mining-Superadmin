import { ReactNode } from "react";
import UniveristyAableAction from "@/components/core/admin/univeristy-table-action";
import { Badge } from "@/components/ui/badge";
import { FIELD_PARAMS } from "@/constant/params";
import { format } from "date-fns";
import Link from "next/link";

export interface TableDataProps {
  id: number;
  email: string;
  contact: string;
  address: string;
  status: boolean;
  actions: ReactNode;
  [FIELD_PARAMS.UNIVERSITY_NAME]: string;
  [FIELD_PARAMS.CREATED_AT]: string;
  [FIELD_PARAMS.EXPIRY_DATE]: string;
  [FIELD_PARAMS.TOTAL_STUDENTS]: number;
  [FIELD_PARAMS.TOTAL_LICENSES]: number;
  [FIELD_PARAMS.ROLE_ID]: string;
  [FIELD_PARAMS.ROLE_ID]: string;
  [FIELD_PARAMS.FIRST_NAME]: string;
  [FIELD_PARAMS.LAST_NAME]: string;
  [FIELD_PARAMS.USER_TYPE]: string;
  [FIELD_PARAMS.LICENSE_NUMBER]: string;
  [FIELD_PARAMS.ASSIGN_LICENSE]: boolean;
  [FIELD_PARAMS.CREATED_AT]: string;
  [FIELD_PARAMS.UNIVERSITY_NAME]: string;
}

export const tableColumn = {
  university_list: [
    {
      key: FIELD_PARAMS.ROLE_ID,
      label: "Univeristy ID",
      render: (props: TableDataProps) => {
        return (
          <Link
            href={`/admin/universities/view/${props.id}`}
            className="underline text-primary font-medium"
          >
            {props[FIELD_PARAMS.ROLE_ID]}
          </Link>
        );
      },
    },
    { key: FIELD_PARAMS.UNIVERSITY_NAME, label: "University Name" },
    {
      key: FIELD_PARAMS.CREATED_AT,
      label: "Created Date",
      format: (value: string) => format(new Date(value), "yyyy-MM-dd"),
    },
    { key: FIELD_PARAMS.TOTAL_STUDENTS, label: "No. of Students" },
    { key: FIELD_PARAMS.TOTAL_LICENSES, label: "No. of Licenses" },
    {
      key: "status",
      label: "Status",
      render: (props: TableDataProps) => {
        return (
          <Badge
            className={
              props.status
                ? "bg-[#84CC16] text-white"
                : "bg-[#F59E0B] text-white"
            }
          >
            {props.status ? "Active" : "Not Active"}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (props: TableDataProps) => {
        return (
          <UniveristyAableAction
            id={props.id}
            university_name={props[FIELD_PARAMS.UNIVERSITY_NAME]}
          />
        );
      },
    },
  ],
  license_history_list: [
    {
      key: "id",
      label: "Sr. No",
      render: (props: TableDataProps, index: number, page: number) => {
        const value = (page - 1) * 10 + index + 1;
        return <span>{value}</span>;
      },
    },
    { key: FIELD_PARAMS.TOTAL_LICENSES, label: "Number of Licenses" },
    {
      key: FIELD_PARAMS.CREATED_AT,
      label: "Created Date",
      format: (value: string) => format(new Date(value), "yyyy-MM-dd"),
    },
    {
      key: FIELD_PARAMS.EXPIRY_DATE,
      label: "Valid Till",
      format: (value: string) => format(new Date(value), "yyyy-MM-dd"),
    },
    {
      key: "status",
      label: "Status",
      render: (props: TableDataProps) => {
        return (
          <Badge
            className={
              props.status
                ? "bg-[#84CC16] text-white"
                : "bg-[#F59E0B] text-white"
            }
          >
            {props.status ? "Active" : "Not Active"}
          </Badge>
        );
      },
    },
  ],
};
