"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { coreFormData, coreFormSchema } from "@/schema/form-schema";
import { DialogClose } from "@/components/ui/dialog";
import Popup from "@/components/core/popup";
import { FIELD_PARAMS } from "@/constant/params";
import { Textarea } from "@/components/ui/textarea";
import { UserFieldProps } from "@/types/user-field";
import { useAdminActions } from "@/hooks/use-admin-actions";

export default function EditUniversityForm({ userData }: UserFieldProps) {

    const [isOpen, setIsOpen] = useState(false);
    const { updateUniversity } = useAdminActions();
    const { toast } = useToast()
    const form = useForm<coreFormData>({
        resolver: zodResolver(coreFormSchema),
        defaultValues: {
            [FIELD_PARAMS.ROLE_ID]: userData[FIELD_PARAMS.ROLE_ID],
            [FIELD_PARAMS.UNIVERSITY_NAME]: userData[FIELD_PARAMS.UNIVERSITY_NAME],
            email: userData.email,
            address: userData.address,
            contact: userData.contact,
        },
    });

    const handleSubmitForm = async (data: coreFormData) => {
        try {
            await updateUniversity(userData.id, data)
            form.reset(data)
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request."
            })
        } finally {
            setIsOpen(false);
        }
    };

    return (

        <Popup
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={<Button className="flex items-center gap-2" onClick={() => {
                setIsOpen(true)
                if (!isOpen) form.reset();
            }} >
                <Pencil size={16} />
                Edit
            </Button>}
            title="Update university"
        >
            <div className="flex flex-col gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name={FIELD_PARAMS.UNIVERSITY_NAME}
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>University Name</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={FIELD_PARAMS.ROLE_ID}
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>University ID</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
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
                            name="contact"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Contact No</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
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
                        <div className="flex gap-2 justify-end">
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                                Update
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
            </div >
        </Popup>
    );
}
