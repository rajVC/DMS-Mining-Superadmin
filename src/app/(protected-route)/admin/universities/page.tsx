import UniversityListTable from "@/components/core/admin/university-list-table";
import { redirect } from "next/navigation";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse {
    data: any;
  }
  
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function TablePage({ searchParams }: any) {
    const { per_page, page, status, university_name, created_at } = await searchParams

    const perPage = per_page ? Number(per_page) : 10;
    const pageVal = page ? Number(page) : 1;
    const statusVal = status ? status : "";
    const universityName = university_name ? university_name : "";
    const createdAt = created_at ? created_at : "";
    let res: ApiResponse = { data: {} };
    let errorState = { isError: false, msg: "" };
    try {
        res = await fetchData({
            url: `client/list/data?page=${pageVal}&per_page=${perPage}&status=${statusVal}&created_at=${createdAt}&university_name=${universityName}`,
            method: "GET",
            token: true
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || error.message;
      
            if (status === 401) {
              redirect("/auth/login");
            } else {
              errorState = {
                isError: true,
                msg: message
              };
            }
          } else {
            errorState = {
              isError: true,
              msg: error instanceof Error ? error.message : "Unknown error occurred",
            };
          }
    }

    return <UniversityListTable
        data={res.data}
       url="client/list/data"
       isError={errorState.isError}
      msg={errorState.msg}
    />;
}
