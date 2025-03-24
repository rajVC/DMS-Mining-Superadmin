"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarRange, Crown, LoaderCircle } from "lucide-react";
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
import { FIELD_PARAMS } from "@/constant/params";
import { format, addMonths, addYears } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import { useAdminActions } from "@/hooks/use-admin-actions";

export default function AssignLicense({ clientId }: { clientId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { assignLicense } = useAdminActions();
  const { toast } = useToast();

  const form = useForm<coreFormData>({
    resolver: zodResolver(coreFormSchema),
    defaultValues: {
      [FIELD_PARAMS.NUM_LICENSES]: "",
      [FIELD_PARAMS.EXPIRY_DATE]: "",
    },
  });

  const { setValue, watch, handleSubmit } = form;
  const expiryDate = watch(FIELD_PARAMS.EXPIRY_DATE);

  const handleDateSelection = (months: number) => {
    const newDate =
      months === 12 ? addYears(new Date(), 1) : addMonths(new Date(), months);
    setValue(FIELD_PARAMS.EXPIRY_DATE, format(newDate, "yyyy-MM-dd"), {
      shouldValidate: true,
    });
  };

  const handleSubmitForm = async (data: coreFormData) => {
    try {
      await assignLicense(data, clientId);
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
    <Popup
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button
          className="p-2 flex gap-3 justify-start items-center"
          variant={"ghost"}
          onClick={() => {
            setIsOpen(true)
            if (!isOpen) form.reset();
          }}
        >
          <Crown size={16} />
          <span className="text-sm">Assign licenses</span>
        </Button>
      }
      title="Assign Licenses"
    >
      <div className="flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
            <FormField
              control={form.control}
              name={FIELD_PARAMS.NUM_LICENSES}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Number of licenses</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={FIELD_PARAMS.EXPIRY_DATE}
              render={() => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <CalendarRange />
                        {expiryDate ? expiryDate : "Select Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <DayPicker
                        mode="single"
                        selected={expiryDate ? new Date(expiryDate) : undefined}
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            setValue(
                              FIELD_PARAMS.EXPIRY_DATE,
                              format(selectedDate, "yyyy-MM-dd"),
                              { shouldValidate: true }
                            );
                          }
                        }}
                        disabled={(day) => day < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end text-blue-600 text-sm underline">
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => handleDateSelection(3)}
              >
                3 Month
              </Button>
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => handleDateSelection(6)}
              >
                6 Month
              </Button>
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => handleDateSelection(12)}
              >
                1 Year
              </Button>
            </div>

            <div className="flex gap-2 justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                )}
                Assign
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Popup>
  );
}
