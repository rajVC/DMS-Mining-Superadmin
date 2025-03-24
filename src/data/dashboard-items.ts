import { FIELD_PARAMS } from "@/constant/params";

export interface DashboardDataProps {
    [FIELD_PARAMS.TOTAL_UNIVERSITIES]: number;
}


export const dashboardData = {
    admin: [
        { dataFields: [FIELD_PARAMS.TOTAL_UNIVERSITIES], label: "Total Universities" },
    ] as {
        dataFields: (keyof DashboardDataProps)[];
        label: string;
    }[]
};
