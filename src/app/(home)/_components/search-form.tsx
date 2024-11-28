"use client";

import { FC, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { areas } from "../_data/areas.data";
import { useSearchParams } from "next/navigation";

const searchFormSchema = z.object({
  locationTo: z.number(),
  locationFrom: z.number(),
  startDate: z.date(),
  endDate: z.date(),
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
    },
  });

  useEffect(() => {
    form.reset({
      locationTo: Number(searchParams.get("locationTo")) || 0,
      locationFrom: Number(searchParams.get("locationFrom")) || 0,
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
    url.searchParams.set("locationTo", String(values.locationTo));
    url.searchParams.set("locationFrom", String(values.locationFrom));
    url.searchParams.set("startDate", String(values.startDate.getTime()));
    url.searchParams.set("endDate", String(values.endDate.getTime()));
    window.history.pushState({}, "", url.toString());
  };

  return (
    <section className="container mx-auto -mt-6 rounded-2xl bg-white p-4 ">
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="grid grid-cols-[1fr_1fr_1fr_1fr_120px] gap-2 max-md:grid-cols-2 max-md:relative max-md:mb-20 max-md:gap-y-10 max-[450px]:grid-cols-1"
      >
        <div className="w-full h-full">
          <p className="text-sm mb-2 text-gray-500">Pick-up Location + {areas.find(area => area.id == form.watch("locationFrom"))?.deliveryPrice ?? 0}฿</p>
          <Select
            className="w-full h-[50px]"
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
            onChange={(value) =>
              form.setValue("locationFrom", value?.value ?? 0)
            }
            value={{
              label:
                areas.find((area) => area.id === form.watch("locationFrom"))
                  ?.name ?? "Select a pick-up location",
              value: form.watch("locationFrom"),
            }}
          />
        </div>
        <div className="w-full h-full">
          <p className="text-sm mb-2 text-gray-500">Pick-up Date</p>
          <Controller
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <DatePicker
                {...field}
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
          <p className="text-sm mb-2 text-gray-500">Drop-off Location + {areas.find(area => area.id == form.watch("locationTo"))?.deliveryPrice ?? 0}฿</p>
          <Select
            classNamePrefix="react-select"
            className="w-full h-[50px]"
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
              label:
                areas.find((area) => area.id === form.watch("locationTo"))
                  ?.name ?? "Select a drop-off location",
              value: form.watch("locationTo"),
            }}
          />
        </div>
        <div className="w-full h-full">
          <p className="text-sm mb-2 text-gray-500">Drop-off Date</p>
          <DatePicker
            className="w-full h-[50px] [&_.react-date-picker\_\_clear-button]:hidden"
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
          className="whitespace-nowrap rounded-lg bg-brand-base p-4 text-white h-full max-md:absolute max-md:w-full max-md:top-[110%] max-md:h-14"
        >
          <Search className="inline" /> Search
        </button>
      </form>
    </section>
  );
};

export default dynamic(() => Promise.resolve(SearchForm), { ssr: false });
