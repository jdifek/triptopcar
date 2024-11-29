"use client";

import { FC, useEffect } from "react";
import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import CalendarIcon from "@/components/icons/calendar-days-icon";

const searchFormSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

const SearchForm: FC = () => {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: searchParams.get("endDate")
        ? new Date(Number(searchParams.get("endDate")))
        : new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    },
  });

  useEffect(() => {
    form.reset({
      startDate: searchParams.get("startDate")
        ? new Date(Number(searchParams.get("startDate")))
        : new Date(),
      endDate: searchParams.get("endDate")
        ? new Date(Number(searchParams.get("endDate")))
        : new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    });
  }, [searchParams, form]);

  useEffect(() => {
    const currentEndDate = form.getValues("endDate");
    const newEndDate = new Date(
      form.watch("startDate").getTime() + 3 * 24 * 60 * 60 * 1000
    );
    if (currentEndDate < newEndDate) {
      form.setValue("endDate", newEndDate);
    }
  }, [form.watch("startDate")]);

  const submitHandler = async (values: z.infer<typeof searchFormSchema>) => {
    const url = new URL(window.location.href);
    url.searchParams.set("startDate", String(values.startDate.getTime()));
    url.searchParams.set("endDate", String(values.endDate.getTime()));
    window.history.pushState({}, "", url.toString());
  };

  return (
    <section className="container mx-auto -mt-6 rounded-2xl bg-white p-4 ">
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex items-end justify-between gap-2 max-md:grid-cols-2 max-md:relative max-md:mb-20 max-md:gap-y-10 max-[450px]:flex-col"
      >
        <div className="w-full h-full">
          <p className="text-sm mb-2 text-gray-500">Pick-up Date</p>
          <Controller
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <DatePicker
                {...field}
                calendarIcon={<CalendarIcon />}
                className="w-full h-[50px]"
                calendarProps={{
                  minDate: new Date(),
                }}
                onChange={(date) =>
                  form.setValue("startDate", date ? (date as Date) : new Date())
                }
                value={field.value}
              />
            )}
          />
        </div>
        <div className="w-full h-full">
          <p className="text-sm mb-2 text-gray-500">Drop-off Date</p>
          <DatePicker
            className="w-full h-[50px] [&_.react-date-picker\_\_clear-button]:hidden"
            calendarIcon={<CalendarIcon />}
            calendarProps={{
              minDate: new Date(
                (form.watch("startDate") ?? new Date()).getTime() +
                  3 * 24 * 60 * 60 * 1000
              ),
              maxDate: new Date(
                (form.watch("startDate") ?? new Date()).getTime() +
                  61 * 24 * 60 * 60 * 1000
              ),
            }}
            onChange={(date) => form.setValue("endDate", date as Date)}
            value={form.watch("endDate")}
          />
        </div>
        <button
          type="submit"
          className="whitespace-nowrap rounded-lg bg-brand-base p-4 text-white h-full max-h-[50px] flex gap-2 items-center justify-center max-md:absolute max-md:w-full max-md:top-[110%] max-md:h-14"
        >
          {" "}
          Search
        </button>
      </form>
    </section>
  );
};

export default dynamic(() => Promise.resolve(SearchForm), { ssr: false });
