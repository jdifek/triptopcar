import CalendarIcon from "@/components/icons/calendar-days-icon";
import CheckIcon from "@/components/icons/check";
import EngineIcon from "@/components/icons/engine-icon";
import FuelIcon from "@/components/icons/fuel-icon";
import SeatIcon from "@/components/icons/seat-icon";
import SnowflakeIcon from "@/components/icons/snowflake";
import TransmissionIcon from "@/components/icons/transmission-icon";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface CarCardProps {
  className?: string;
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ className, car }) => {
  return (
    <article
      className={clsx(
        "bg-white p-5 rounded-lg flex flex-col items-start",
        className
      )}
    >
      <header className="grid grid-cols-2 max-md:mx-auto gap-3">
        <h3 className="flex items-center">
          <span className="bg-base-bg-blue mr-4 rounded-sm px-2 py-1.5 text-base">
            HATCHBACK
          </span>
          <span className="text-lg font-semibold whitespace-nowrap">
            Toyota Yaris Ativ
          </span>
        </h3>
      </header>
      <main className="flex items-start w-full gap-12 max-md:flex-col max-md:items-center max-md:text-center">
        <div className="flex flex-col w-2/3 max-sm:w-full items-start max-md:items-center mt-8">
          <Image
            src={car.imageUrl}
            alt={`${car.name} Image`}
            width={250}
            height={250}
          />
          <ul className="grid grid-cols-2 gap-4 gap-x-6 place-items-start [&>li_svg]:max-[380px]:w-6 max-[380px]:gap-x-3 [&>li]:max-[380px]:gap-x-1">
            <li className="flex items-center gap-3 text-lg mt-4 max-[380px]:justify-self-end">
              <TransmissionIcon className="w-7 h-7" />
              {car.transmissionType}
            </li>
            <li className="flex items-center gap-3 text-lg mt-4 text-nowrap">
              <FuelIcon className="w-7 h-7" />
              {car.fuelType}
            </li>
            <li className="flex items-center gap-3 text-lg max-[380px]:justify-self-end">
              <SnowflakeIcon className="w-7 h-7" />
              A/C
            </li>

            <li className="flex items-center gap-3 text-lg">
              <SeatIcon className="w-7 h-7" />
              {car.seatsQuantity}
            </li>
            <li className="flex items-center gap-3 text-lg self-end">
              <EngineIcon className="w-7 h-7" /> {car.engineCapacity}L
            </li>
            <li className="flex items-center gap-3 text-lg max-[380px]:justify-self-end">
              <CalendarIcon className="w-7 h-7" /> {car.year}
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start my-auto w-full max-sm:w-full">
          <h4 className="text-lg font-bold text-slate-700">Rental includes</h4>
          <div className="grid grid-cols-2 grid-rows-3 mt-3 gap-x-24 gap-y-3 max-[350px]:text-sm max-2xl:grid-cols-1">
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckIcon className="aspect-square" />
              <span>Confirmed within 48 hours</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckIcon className="aspect-square" />
              <span>Add 1 driver free</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckIcon className="aspect-square" />
              <span>Full to Full</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckIcon className="aspect-square" />
              <span>Time-Limited Free Cancellation</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckIcon className="aspect-square" />
              <span>Include Third Party Liability</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckIcon className="aspect-square" />
              <span>Unlimited Mileage</span>
            </div>
          </div>
        </div>
      </main>
    </article>
  );
};

export default CarCard;
