"use client";

import { FC, useState } from "react";
import Select from "react-select";
import CarCard from "./car-card";
import { Car, CarBodyType } from "@/typing/interfaces";
import { carTypes } from "../_data/carTypes.data";
import { cars } from "../_data/cars.data";
import dynamic from "next/dynamic";
import clsx from "clsx";

type SortOption = "price-low-to-high" | "price-high-to-low";

interface Option {
  value: SortOption;
  label: string;
}

const sortOptions: Option[] = [
  {
    value: "price-low-to-high",
    label: "Price: Low to High",
  },
  {
    value: "price-high-to-low",
    label: "Price: High to Low",
  },
];

const defaultSort: Option = sortOptions[0];

type SortHandler = (a: Car, b: Car) => number;

const sortHandlers: Record<SortOption, SortHandler> = {
  "price-low-to-high": (a: Car, b: Car) => a.pricePerDay - b.pricePerDay,
  "price-high-to-low": (a: Car, b: Car) => b.pricePerDay - a.pricePerDay,
};

const CarCatalog: FC = () => {
  const [carTypesFilter, setCarTypesFilter] = useState<CarBodyType[]>([]);
  const [sort, setSort] = useState<Option | null>(defaultSort);

  const carsForRender = cars
    .filter(
      (car) =>
        carTypesFilter.length === 0 ||
        carTypesFilter.includes(car.carBodyType as any)
    )
    .toSorted(sortHandlers[sort?.value || "price-high-to-low"]);

  const toggleCarType = (type: CarBodyType) => {
    setCarTypesFilter((prev) =>
      prev.includes(type)
        ? prev.filter((carType) => carType !== type)
        : [...prev, type]
    );
  };

  return (
    <>
      <div className="rounded-2xl bg-white p-3">
        <ul className="flex gap-10 max-xl:gap-2 font-bold uppercase *:grid *:basis-full *:place-items-center *:rounded-sm *:border *:border-tertiary-gray *:p-2 max-[600px]:grid max-[600px]:grid-cols-3 max-[600px]:px-20 max-[500px]:px-0 max-[425px]:grid-cols-3">
          <li
            className={clsx(
              carTypesFilter.length === 0 && "bg-tertiary-gray",
              "max-xl:scale-90"
            )}
          >
            <button
              className="w-full h-full"
              onClick={() => setCarTypesFilter([])}
            >
              All
            </button>
          </li>
          {carTypes.map((carType) => (
            <li
              key={carType.id}
              className={clsx(
                carTypesFilter.includes(carType.name as any) &&
                  "bg-tertiary-gray",
                "max-xl:scale-90 max-md:w-full max-md:h-full"
              )}
            >
              <button
                className="w-full h-full aspect-square justify-center flex items-center gap-4 flex-col text-slate-800"
                onClick={() => toggleCarType(carType.name as any)}
              >
                <span className="max-md:text-xs">{carType.name}</span>
                {carType.icon}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-white p-2 max-[350px]:flex-col">
        <Select
          classNamePrefix="react-select"
          placeholder="Pick-up location"
          options={sortOptions}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "var(--brand-base)",
            },
            borderRadius: 4,
          })}
          onChange={setSort}
          value={sort}
        />
        <span>{carsForRender.length} cars found</span>
      </div>
      <div className="space-y-4 h-full flex flex-col w-full gap-14">
        {carsForRender.map((car) => (
          <CarCard key={car.id} car={car} className="bg-white" />
        ))}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(CarCatalog), { ssr: false });
