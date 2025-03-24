import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { reqeustServer } from "@/actions/reqeust-server-api";
import { coreFormData } from "@/schema/form-schema";
import { FIELD_PARAMS } from "@/constant/params";
export const useAdminActions = () => {
  const router = useRouter();
  const { toast } = useToast();
  const deleteUniversityAction = async (id: number) => {

    const res = await reqeustServer({
      url: `client/delete?client_id=${id}`,
      method: "DELETE",
      token: true
    });

    if (res.status === "fail") {
      toast({
        title: "Error",
        variant: "destructive",
        description: res.message,
      });
      return;
    }
    toast({
      title: "Success",
      description: res.message
    });
    router.refresh();
  };

  const createUniviersity = async (data: coreFormData) => {
    const res = await reqeustServer({
      body: data,
      url: "client/create?user_type=client",
      method: "POST",
      token: true
    })

    if (res.status === "success") {
      toast({
        title: "Create university successful",
        description: res.message,
      });
      router.refresh();
      return;
    } else {
      toast({
        variant: "destructive",
        title: "University Not crated",
        description: res.message,
      });
    }
  }

  const assignLicense = async (data: coreFormData, clientId: number) => {
    const res = await reqeustServer({
      body: {
        ...data,
        [FIELD_PARAMS.NUM_LICENSES]: Number(data[FIELD_PARAMS.NUM_LICENSES]),
        [FIELD_PARAMS.CLIENT_ID]: clientId,
      },
      url: "license/create",
      method: "POST",
      token: true,
    });

    if (res.status === "success") {
      toast({
        title: "Assign license successful",
        description: res.message,
      });
      router.refresh();
      return;
    } else {
      toast({
        variant: "destructive",
        title: "Not Assign",
        description: res.message,
      });
    }
  }

  const updateUniversity = async (id: number, data: coreFormData) => {
    const res = await reqeustServer({
      url: `client/update?client_id=${id}&user_type=client`,
      body: data,
      method: "PUT",
      token: true
    })

    if (res.status === "success") {
      toast({
        title: "Update university successful",
        description: res.message,
      });
      router.refresh();
      return;
    } else {
      toast({
        variant: "destructive",
        title: "University Not Update",
        description: res.message,
      });
    }
  }

  return {
    deleteUniversityAction,
    createUniviersity,
    assignLicense,
    updateUniversity
  };
};
