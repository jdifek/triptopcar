"use client";

import { FC, useEffect } from "react";
import DatePicker from "react-date-picker";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import CalendarIcon from "@/components/icons/calendar-days-icon";
import Select from "react-select";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { areas } from "../_data/areas.data";

const searchFormSchema = z.object({
  locationTo: z.number(),
  locationFrom: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
});

const SearchForm: FC = () => {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      locationTo: 1,
      locationFrom: 1,
      startDate: new Date(),
      endDate: searchParams.get("endDate")
        ? new Date(Number(searchParams.get("endDate")))
        : new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      startTime: "10:00",
      endTime: "10:00",
    },
  });

  useEffect(() => {
    form.reset({
      locationTo: Number(searchParams.get("locationTo")) || 1,
      locationFrom: Number(searchParams.get("locationFrom")) || 1,
      startDate: searchParams.get("startDate") ? new Date(Number(searchParams.get("startDate"))) : new Date(),
      endDate: searchParams.get("endDate")
        ? new Date(Number(searchParams.get("endDate")))
        : new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      startTime: searchParams.get("startTime") || "10:00", // Reset start time
      endTime: searchParams.get("endTime") || "10:30", // Reset end time
    });
  }, [searchParams, form]);

  useEffect(() => {
    const currentEndDate = form.getValues("endDate");
    const newEndDate = new Date(form.watch("startDate").getTime() + 3 * 24 * 60 * 60 * 1000);
    if (currentEndDate < newEndDate) {
      form.setValue("endDate", newEndDate);
    }
  }, [form.watch("startDate")]);

  const submitHandler = async (values: z.infer<typeof searchFormSchema>) => {
    const url = new URL(window.location.href);
    url.searchParams.set("locationTo", String(values.locationTo));
    url.searchParams.set("locationFrom", String(values.locationFrom));
    url.searchParams.set("startDate", String(values.startDate.getTime()));
    url.searchParams.set("endDate", String(values.endDate.getTime()));
    url.searchParams.set("startTime", values.startTime); // Set start time in URL
    url.searchParams.set("endTime", values.endTime); // Set end time in URL
    window.history.pushState({}, "", url.toString());
  };

  return (
    <section className="container mx-auto -mt-6 rounded-2xl bg-white p-4 ">
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="lg:grid-cols-4 grid grid-cols-1 sm:grid-cols-2 gap-6 max-md:grid-cols-1 max-md:relative max-md:mb-20"
      >
        <div className="flex flex-col w-full">
          <p className="text-[0.775rem] leading-[1.25rem] mb-2 text-gray-500">Pick-up Location</p>
          <Select
            className="w-full sm:w-[250px] h-[50px]"
            classNamePrefix="react-select"
            placeholder="Pick-up location"
            options={areas.map((area) => ({
              label: area.name,
              value: area.id,
            }))}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "var(--brand-base)",
              },
              borderRadius: 4,
            })}
            onChange={(value) => form.setValue("locationFrom", value?.value ?? 0)}
            value={{
              label: areas.find((area) => area.id === form.watch("locationFrom"))?.name,
              value: form.watch("locationFrom"),
            }}
          />
        </div>

        <div className="flex flex-col w-full">
          <p className="text-[0.775rem] leading-[1.25rem] mb-2 text-gray-500">Pick-up Date</p>
          <div className="flex items-center gap-3">
            <Controller
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  calendarIcon={<CalendarIcon />}
                  className="w-full sm:w-[250px] h-[50px]"
                  calendarProps={{
                    minDate: new Date(),
                  }}
                  onChange={(date) => form.setValue("startDate", date ? (date as Date) : new Date())}
                  value={field.value}
                />
              )}
            />
            <select
              aria-label="Start time"
              className=" border-gray-500 [border-width:thin] w-full sm:w-[150px] h-[50px] rounded-md"
              name="startTime"
              onChange={(e) => form.setValue("startTime", e.target.value)}
              value={form.watch("startTime")}
            >
              {Array.from({ length: 24 }, (_, index) => {
                const hour = String(index).padStart(2, "0");
                return (
                  <option key={hour} value={`${hour}:00`}>
                    {`${hour}:00`}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <p className="text-[0.775rem] leading-[1.25rem] mb-2 text-gray-500">Drop-off Location</p>
          <Select
            className="w-full sm:w-[250px] h-[50px]"
            classNamePrefix="react-select"
            placeholder="Drop-off location"
            options={areas.map((area) => ({
              label: area.name,
              value: area.id,
            }))}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "var(--brand-base)",
              },
              borderRadius: 4,
            })}
            onChange={(value) => form.setValue("locationTo", value?.value || 0)}
            value={{
              label: areas.find((area) => area.id === form.watch("locationTo"))?.name,
              value: form.watch("locationTo"),
            }}
          />
        </div>

        <div className="flex flex-col w-full">
          <p className="text-[0.775rem] leading-[1.25rem] mb-2 text-gray-500">Drop-off Date</p>
          <div className="flex items-center gap-3">
            <DatePicker
              className="w-full sm:w-[250px] h-[50px]"
              calendarIcon={<CalendarIcon />}
              calendarProps={{
                minDate: new Date((form.watch("startDate") ?? new Date()).getTime() + 3 * 24 * 60 * 60 * 1000),
                maxDate: new Date((form.watch("startDate") ?? new Date()).getTime() + 61 * 24 * 60 * 60 * 1000),
              }}
              onChange={(date) => form.setValue("endDate", date as Date)}
              value={form.watch("endDate")}
            />
            <select
              aria-label="End time"
              className=" border-gray-500 [border-width:thin] w-full sm:w-[150px] h-[50px] rounded-md"
              name="endTime"
              onChange={(e) => form.setValue("endTime", e.target.value)}
              value={form.watch("endTime")}
            >
              {Array.from({ length: 24 }, (_, index) => {
                const hour = String(index).padStart(2, "0");
                return (
                  <option key={hour} value={`${hour}:00`}>
                    {`${hour}:00`}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex justify-center w-full col-span-2 lg:col-span-4 mt-4">
          <button type="submit" className="bg-brand-base text-white h-[50px] px-6 rounded-lg w-full sm:w-auto">
            Find a vehicle
          </button>
        </div>
      </form>

      <p className="text-[0.775rem] leading-[1.25rem] mb-2 text-gray-500">Minimum rental period is three days</p>
    </section>
  );
};

export default dynamic(() => Promise.resolve(SearchForm), { ssr: false });
