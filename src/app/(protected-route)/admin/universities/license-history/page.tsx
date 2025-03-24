import LicenseHistoryTable from "@/components/core/admin/license-history-table";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse {
  data: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
const LicenseHistoryPage = async ({ searchParams }: any) => {
  const { university_id, page, per_page, created_at, status, university_name } =
    await searchParams;

  if (!university_id) {
    throw new Error("university id is required");
  }
  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  const statusVal = status ? status : "";
  const universityId = university_id ? university_id : "";
  const createdAt = created_at ? created_at : "";
  let res: ApiResponse = { data: {} };
  let errorState = { isError: false, msg: "" };

  try {
    res = await fetchData({
      url: `license/client/list?page=${pageVal}&per_page=${perPage}&client_id=${universityId}&status=${statusVal}&created_at=${createdAt}`,
      method: "GET",
      token: true,
    });
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

  return (
    <LicenseHistoryTable
      data={res.data}
      university_id={university_id}
      university_name={university_name}
      url={"license/client/list"}
      query={{ client_id: universityId }}
      isError={errorState.isError}
      msg={errorState.msg}
    />
  );
};

export default LicenseHistoryPage;
