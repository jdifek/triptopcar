"use client";

import { useTotalPrice } from "@/hooks/useTotalPrice";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface BookingSidebarProps {
  className?: string;
  car: Car;
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({ className, car }) => {
  const searchParams = useSearchParams();
  const startDate =
    Number(searchParams.get("startDate")) !== 0
      ? Number(searchParams.get("startDate"))
      : new Date().getTime();
  const endDate =
    Number(searchParams.get("endDate")) !== 0
      ? Number(searchParams.get("endDate"))
      : new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  const daysQuantity = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const isPremium = searchParams.get("isPremium") === "true";
  const totalPrice = useTotalPrice({
    car,
    daysQuantity,
    isPremium,
  });

  useEffect(() => {
    if (!(startDate + 1) || !(endDate + 1)) {
      notFound();
    }
  }, [startDate, endDate]);

  return (
    <aside className={clsx("w-full h-full flex flex-col gap-6 sticky top-5", className)}>
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
                }).format(isPremium ? car.pricePerDay + 400 * daysQuantity : car.pricePerDay * daysQuantity);
              })()}
            </span>
            <p className="text-gray-500 text-sm">
              Approx.{" "}
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(isPremium ? car.pricePerDay + 400 : car.pricePerDay);
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
            Taxed and fees {"("}including airport tax, customer facility fee,
            tourism tax, and sales tax{")"}
          </li>
          <li>Basic Rental Fee</li>
        </ul>
        <div className="w-full border-t-2 mt-5 pt-5 border-dashed border-tertiary-gray">
          <div
            className={clsx(
              "flex items-start justify-between gap-4",
              isPremium && "line-through"
            )}
          >
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
    </aside>
  );
};

export default dynamic(() => Promise.resolve(BookingSidebar), { ssr: false });
