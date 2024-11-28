"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

const CarCard: FC<{ car: Car }> = ({ car }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const params = useSearchParams();
  const startDate = Number(params.get("startDate")) ?? new Date().getTime();
  const endDate =
    Number(params.get("endDate")) ??
    new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  const locationFrom = Number(params.get("locationFrom")) ?? 1;
  const locationTo = Number(params.get("locationTo")) ?? 1;
  const daysQuantity = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  const getCarBookingLink = useCallback(() => {
    return `/booking/${car.id}?startDate=${startDate}&endDate=${endDate}&isPremium=${isPremium}&locationFrom=${locationFrom}&locationTo=${locationTo}`;
  }, [isPremium, startDate, endDate, locationFrom, locationTo]);

  return (
    <>
      <div className="flex gap-x-4 gap-y-1.5 rounded-2xl bg-white px-4 min-h-48 w-full max-sm:grid-cols-1 max-sm:gap-10 justify-between  max-xl:grid max-xl:grid-cols-2">
        <Link
          href={getCarBookingLink()}
          target="_blank"
          className="row-span-3 relative w-1/2 max-2xl:w-1/3 max-xl:w-full max-md:h-[300px] max-[500px]:h-[200px]"
        >
          <Image
            src={car.imageUrl}
            alt={`${car.name} Image`}
            className="object-contain"
            sizes="100%, 100%"
            fill
          />
        </Link>
        <div className="flex flex-col items-start sm:py-8">
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
          <div className="mt-6 grid gap-6 grid-cols-3 max-xl:grid-cols-2 max-xl:gap-x-10 max-sm:items-center max-sm:mx-auto">
            <span className="flex items-center gap-1">
              <TransmissionIcon className="w-7 h-7" /> {car.transmissionType}
            </span>
            <span className="flex items-center gap-1">
              <FuelIcon className="w-7 h-7" /> {car.fuelType}
            </span>
            <span className="flex items-center gap-1">
              <SeatIcon className="w-7 h-7" /> {car.seatsQuantity}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-7 h-7" /> {car.year}
            </span>
            <span className="flex items-center gap-1">
              <EngineIcon className="w-7 h-7" /> {car.engineCapacity}L
            </span>
          </div>
        </div>
        <div className="space-y-2 md:py-8">
          <p className="text-base-black-secondary flex items-center justify-end max-xl:justify-start max-md:justify-center gap-2 text-sm text-nowrap">
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
            <span>/ day</span>
          </p>
          <p className="text-base-black-secondary flex items-center justify-end max-xl:justify-start max-md:justify-center gap-2 text-sm text-nowrap -translate-y-2">
            <span>
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
              })()}
            </span>
            <span>/ {daysQuantity !== 0 ? daysQuantity : 3} days</span>
          </p>
          <Link
            href={getCarBookingLink()}
            className="ml-auto max-md:mx-auto max-md:px-7 max-xl:m-[0_auto_0_0] max-md:gap-2 max-md:text-lg max-md:mt-3 max-md:py-4 flex w-min items-center rounded-lg bg-brand-base px-4 py-2 text-white"
          >
            Book <ChevronRight size={20} className="m-auto inline" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1px_1fr] mx-auto w-full pl-10 max-sm:grid-cols-1 max-sm:pl-0 max-sm:w-3/4 max-sm:mx-auto max-[450px]:w-full max-sm:mt-6 border-t">
        <StandartConditions className="mt-6" />
        <hr className="h-full w-full bg-tertiary-gray" />
        <PremiumConditions
          className="mt-6"
          isChoosed={isPremium}
          onCancel={() => setIsPremium(false)}
          onChoose={() => setIsPremium(true)}
        />
      </div>
    </>
  );
};

export default CarCard;
