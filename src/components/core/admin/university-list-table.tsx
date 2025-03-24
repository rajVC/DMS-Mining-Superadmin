'use client';

import { useEffect } from "react";
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import UniversityListHeaderAction from "./university-list-header-action";
import DataTable from '@/components/core/table/table'
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { FilterProvider } from "@/context/filter-context";

interface TableComponentProps {
  data: {
    data: TableDataProps[];
    pages: number;
  };
  url: string;
  isError: boolean;
  msg: string
}

export default function UniversityListTable({ data, url ,isError, msg}: TableComponentProps) {
    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
        if(isError) throw new Error(msg || "Something went wrong");
        setBreadcrumbs([
            { label: "Universities", href: "#" },
        ]);
    }, [setBreadcrumbs]);

    return (
        <div className="space-y-4">
            <FilterProvider>
                <UniversityListHeaderAction />
                <Filter filterType={"university_list"} />
                <DataTable 
                    data={data} 
                    role={"university_list"} 
                    url={url} 
                    isPagination={true}
                />
            </FilterProvider>
        </div>
    );
}
