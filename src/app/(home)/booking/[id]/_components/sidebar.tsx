"use client";

import { areas } from "@/app/(home)/_data/areas.data";
import { useTotalPrice } from "@/hooks/useTotalPrice";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import BookCar from "./bookCar";
import { calculateDailyCost } from "@/hooks/useTotalPriceDay";

interface BookingSidebarProps {
  className?: string;
  car: Car;
}

const BookingSidebar: React.FC<BookingSidebarProps> = React.memo(({ className, car }) => {
  const searchParams = useSearchParams();

  const locationFrom = Number(searchParams.get("locationFrom")) !== 0 ? Number(searchParams.get("locationFrom")) : 1;

  const locationTo = Number(searchParams.get("locationTo")) !== 0 ? Number(searchParams.get("locationTo")) : 1;

  const startDate = new Date(
    Number(searchParams.get("startDate")) !== 0 ? Number(searchParams.get("startDate")) : new Date().getTime(),
  );

  const [timeStart, setTimeStart] = useState<string>(searchParams.get("timeStart") ?? "10:00");
  const [timeEnd, setTimeEnd] = useState<string>(searchParams.get("timeEnd") ?? "10:00");

  const endDate = new Date(
    Number(searchParams.get("endDate")) !== 0
      ? Number(searchParams.get("endDate"))
      : new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
  );

  const daysQuantity = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const isPremium = searchParams.get("isPremium") === "true";

  const [includeChildSeat, setIncludeChildSeat] = useState(false);
  const [dayTotal, setDayTotal] = useState(0);

  const totalPrice = useMemo(() => {
    return useTotalPrice({
      car,
      daysQuantity,
      isPremium,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      includeChildSeat: false,
      pickupLocationId: Number(searchParams.get("locationFrom")) || 1, // ID пункта выдачи
      dropoffLocationId: Number(searchParams.get("locationTo")) || 1, // ID пункта возврата
    });
  }, [car.id]);

  useEffect(() => {
    if (!(startDate.getTime() + 1) || !(endDate.getTime() + 1)) {
      notFound();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    // Ensure calculateDailyCost returns a number
    const calculatedPrice = calculateDailyCost(
      startDate ? new Date(startDate) : new Date(),
      car.pricePerDay,
      false,
      isPremium,
    );
    setDayTotal(calculatedPrice);
  }, [car.pricePerDay, startDate]); // Depend on car.pricePerDay and startDate
  return (
    <aside className={clsx("w-full h-full flex flex-col gap-6 sticky top-5", className)}>
      <div className="flex flex-col w-full bg-white rounded-lg p-[20px_10px_80px_10px] relative">
        <div className="w-full flex flex-col justify-between h-full">
          <div className="flex">
            <div className="basis-1/6 flex items-center flex-col">
              <div className="h-[60%] relative flex items-center flex-col translate-y-2">
                <div className="absolute w-2 aspect-square rounded-full bg-tertiary-gray z-[2]" />
                <hr className="h-full w-0.5 bg-tertiary-gray" />
                <div className="absolute bottom-0 w-2 aspect-square rounded-full bg-tertiary-gray z-[2]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-5">
                <h4 className="font-bold text-2xl text-slate-700 mb-4">Pick-up</h4>
                <p className="text-slate-800">
                  {new Date(startDate).toLocaleDateString()} {timeStart}
                  <br />
                  {areas.find((area) => area.id === Number(locationFrom))?.name}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-2xl text-slate-700 mb-4">Drop-off</h4>
                <p className="text-slate-800">
                  {new Date(endDate).toLocaleDateString()} {timeEnd}
                  <br />
                  {areas.find((area) => area.id === Number(locationTo))?.name}
                </p>
              </div>
            </div>
          </div>
          {/* Вставляем ссылку внизу */}
          <Link href="/" className="absolute bottom-4 right-4 rounded-md px-4 py-2 text-blue-500">
            Change Date
          </Link>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg p-5">
        <h3 className="font-bold text-2xl text-slate-700">Price Details</h3>
        <div className="flex w-full items-start justify-between gap-3 mt-4">
          <h4 className="text-lg font-bold text-slate-700">Car rental fee</h4>
          <div className="text-right flex flex-col items-end gap-1">
            <span className="text-slate-700">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  minimumFractionDigits: 0,
                  currency: "THB",
                }).format(Math.round((dayTotal * 3) / 10) * 10);
              })()}
            </span>
            <p className="text-gray-500 text-sm">
              Approx.{" "}
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(Math.round(dayTotal / 10) * 10);
              })()}
              x{daysQuantity} days
            </p>
          </div>
        </div>
        <ul className="list-disc text-slate-700 pl-5 font-medium mt-5">
          <li>1 additional driver</li>
          <li>Unlimited Mileage</li>
          <li>Full to Full</li>
          <li>
            Taxed and fees {"("}including airport tax, customer facility fee, tourism tax, and sales tax{")"}
          </li>
          <li>Basic Rental Fee</li>
        </ul>
        <div className="w-full border-t-2 mt-5 pt-5 border-dashed border-tertiary-gray">
          <div className={clsx("flex items-start justify-between gap-4", isPremium && "line-through")}>
            <h4 className="text-gray-500">Refundable Deposit</h4>
            <h4 className="text-gray-500">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(car.deposit);
              })()}
            </h4>
          </div>
          <div className="flex items-start justify-between gap-4">
            <h4 className="font-bold text-xl text-slate-700">Total</h4>
            <h4 className="text-slate-700 font-bold text-xl">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(totalPrice);
              })()}
            </h4>
          </div>
        </div>
      </div>
      <BookCar car={car} />
    </aside>
  );
});

export default dynamic(() => Promise.resolve(BookingSidebar), { ssr: false });
