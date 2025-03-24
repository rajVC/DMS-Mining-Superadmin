import { FIELD_PARAMS } from "@/constant/params";

type SelectField = {
    key: string;
    label : string;
    fields: { defaultValue: string; label: string }[];
};

type InputField = {
    key: string;
    label : string
};

type MultipleInputField = InputField[];
type MultipleSelectField = SelectField[];

type FilterFieldType = {
    [key: string]: {
        input?: MultipleInputField;
        created_at?: InputField;
        select?: MultipleSelectField
        multiple_input?: MultipleInputField;
    };
};

export const filterField: FilterFieldType = {
    university_list: {
        input: [{
            label : "University Name",
            key: FIELD_PARAMS.UNIVERSITY_NAME,
        }],
        created_at: {
            label: "Created Date",
            key: FIELD_PARAMS.CREATED_AT,
        },
        select: [{
            key: "status",
            label : "Status",
            fields: [
                { defaultValue: "all", label: "All" },
                { defaultValue: "active", label: "Active" },
                { defaultValue: "inactive", label: "Not Active" },
            ],
        }],
    },
    university_license_history: {
        created_at: {
            label: "Created Date",
            key: FIELD_PARAMS.CREATED_AT,
        },
        select: [{
            key: "status",
            label : "Status",
            fields: [
                { defaultValue: "all", label: "All" },
                { defaultValue: "active", label: "Active" },
                { defaultValue: "inactive", label: "Not Active" },
            ],
        }],
    },
};
