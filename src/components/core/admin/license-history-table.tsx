'use client'
import { useEffect } from "react";
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import LicenseTableHeaderAciton from "./license-table-header-aciton";
import DataTable from '@/components/core/table/table'
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { FilterProvider } from "@/context/filter-context";

interface TableComponentProps {
  data: {
    data: TableDataProps[];
    pages
  }
  url: string
  university_id: number;
  university_name: string
  query? : object;
  isError: boolean;
  msg: string
}

export default function LicenseHistoryTable({ data, url,university_id, university_name, query ,isError, msg}: TableComponentProps) {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    if(isError) throw new Error(msg || "Something went wrong");
    setBreadcrumbs([
      { label: "Universities", href: "/admin/universities" },
      { label: university_name, href: "#" },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="space-y-4">
      <FilterProvider>
        <LicenseTableHeaderAciton id={university_id} />
        <Filter filterType={"university_license_history"} />
        <DataTable data={data} role={"license_history_list"} isPagination={true} url={url} query={query} />
      </FilterProvider>
    </div>
  );
}
