"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { coreFormData, coreFormSchema } from "@/schema/form-schema";
import { DialogClose } from "@/components/ui/dialog";
import Popup from "@/components/core/popup";
import { Textarea } from "@/components/ui/textarea";
import { useAdminActions } from "@/hooks/use-admin-actions";

export default function CreateUniversityForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { createUniviersity } = useAdminActions();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<coreFormData>({
    resolver: zodResolver(coreFormSchema),
    defaultValues: {
      university_name: "",
      role_id: "",
      email: "",
      contact: "",
      address: "",
      email_sent: true,
    },
  });

  const handleSubmitForm = async (data: coreFormData) => {
    try {
      await createUniviersity(data);
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Popup
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button
            className="p-3"
            variant={"outline"}
            onClick={() => {
              setIsOpen(true);
              if (!isOpen) form.reset();
            }}
          >
            <PlusCircle />
            <span className="text-sm">Add New University</span>
          </Button>
        }
        title="Add new university"
      >
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitForm)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={"university_name"}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>University</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"role_id"}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>University ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Contact No</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                  )}
                  Add
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </Popup>
    </>
  );
}
