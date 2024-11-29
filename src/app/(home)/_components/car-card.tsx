"use client";

import Link from "next/link";
import { FC, useCallback, useState } from "react";
import TransmissionIcon from "@/components/icons/transmission-icon";
import { Car } from "@/typing/interfaces";
import SeatIcon from "@/components/icons/seat-icon";
import Image from "next/image";
import EngineIcon from "@/components/icons/engine-icon";
import PremiumConditions from "./premium";
import StandartConditions from "./standart";
import { useSearchParams } from "next/navigation";
import CalendarIcon from "@/components/icons/calendar-days-icon";
import FuelIcon from "@/components/icons/fuel-icon";
import clsx from "clsx";
import CheckIcon from "@/components/icons/check";

const CarCard: FC<{ car: Car; className?: string }> = ({ car, className }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const params = useSearchParams();
  const startDate = Number(params.get("startDate")) ?? new Date().getTime();
  const endDate =
    Number(params.get("endDate")) ??
    new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

  const daysQuantity = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  const getCarBookingLink = useCallback(() => {
    return `/booking/${car.id}?startDate=${startDate}&endDate=${endDate}&isPremium=${isPremium}`;
  }, [isPremium, startDate, endDate]);

  return (
    <article>
      <div
        className={clsx(
          "flex gap-x-4 gap-y-1.5 rounded-t-2xl bg-white px-4 min-h-48 w-full max-md:grid-cols-1 max-md:gap-10 justify-between max-xl:grid max-xl:grid-cols-2",
          className
        )}
      >
        <Link
          href={getCarBookingLink()}
          target="_blank"
          className="row-span-3 relative w-[400px] max-md:w-full max-md:h-[300px] max-xl:w-full max-[500px]:h-[200px]"
        >
          <Image
            src={car.imageUrl}
            alt={`${car.name} Image`}
            className="object-contain"
            sizes="100%, 100%"
            fill
          />
        </Link>
        <div className="flex flex-col items-start md:py-8">
          <div className="col-span-2 flex items-center justify-between max-md:mx-auto">
            <h3>
              <Link href={getCarBookingLink()}>
                <span className="bg-base-bg-blue mr-4 rounded-sm px-2 py-1.5 text-sm">
                  {car.carBodyType.toUpperCase()}
                </span>
                <span className="text-lg font-semibold">{car.name}</span>
              </Link>
            </h3>
          </div>
          <div className="mt-6 gap-6 flex flex-wrap max-xl:grid max-xl:grid-cols-2 max-xl:gap-x-10 max-md:items-center max-md:mx-auto text-nowrap max-[375px]:gap-x-0">
            <span className="flex items-center gap-1">
              <TransmissionIcon className="w-6 h-6" /> {car.transmissionType}
            </span>
            <span className="flex items-center gap-1">
              <FuelIcon className="w-6 h-6" /> {car.fuelType}
            </span>
            <span className="flex items-center gap-1">
              <SeatIcon className="w-6 h-6" /> {car.seatsQuantity}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-6 h-6" /> {car.year}
            </span>
            <span className="flex items-center gap-1">
              <EngineIcon className="w-6 h-6" /> {car.engineCapacity}L
            </span>
            <span className="flex items-center gap-1">
              <CheckIcon className="w-6 h-6" />A / C
            </span>
          </div>
        </div>
        <div className="space-y-2 md:py-8 max-md:mb-4">
          <p className="text-base-black-secondary max-md:justify-center flex items-center justify-end max-xl:justify-start gap-2 text-sm text-nowrap">
            <span className="text-base-black text-2xl font-bold">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(
                  isPremium ? (car.pricePerDay + 400) * 1 : car.pricePerDay * 1
                );
              })()}
            </span>
            <span>per day</span>
          </p>
          <p className="text-base-black-secondary flex max-md:justify-center items-center justify-end max-xl:justify-start gap-2 text-sm text-nowrap -translate-y-2">
            <span>
              Total:{" "}
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(
                  isPremium
                    ? (car.pricePerDay + 400) *
                        (daysQuantity !== 0 ? daysQuantity : 3)
                    : car.pricePerDay * (daysQuantity !== 0 ? daysQuantity : 3)
                );
              })()}{" "}
              for {daysQuantity !== 0 ? daysQuantity : 3} days
            </span>
          </p>
          <Link
            href={getCarBookingLink()}
            className="ml-auto max-md:mx-auto max-xl:m-[0_auto_0_0] flex w-min items-center rounded-lg bg-brand-base px-4 py-2 text-white"
          >
            Book <span className="text-lg ml-2">{">"}</span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1px_1fr] rounded-b-2xl mx-auto w-full pl-10 bg-white max-sm:grid-cols-1 max-sm:pl-0 max-sm:mx-auto border-t">
        <StandartConditions isPremium={isPremium} setIsPremium={setIsPremium} />
        <hr className="h-full w-full bg-tertiary-gray" />
        <PremiumConditions
          isChoosed={isPremium}
          onCancel={() => setIsPremium(false)}
          onChoose={() => setIsPremium(true)}
        />
      </div>
    </article>
  );
};

export default CarCard;
