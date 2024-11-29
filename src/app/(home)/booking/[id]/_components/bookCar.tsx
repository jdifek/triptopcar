"use client";

import { useBookCar } from "@/hooks/useTelegram";
import { useTotalPrice } from "@/hooks/useTotalPrice";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import { LoaderIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface BookCarProps {
  className?: string;
  car: Car;
}

interface Form {
  phone: string;
  fullName: string;
  pickupLocation: string;
  pickupTime: string;
  dropoffLocation: string;
  dropoffTime: string;
}

const BookCar: React.FC<BookCarProps> = ({ className, car }) => {
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

  const [loadingToastId, setLoadingToastId] = useState<string | null>(null);
  const {
    mutateAsync: createBooking,
    isPending,
    isSuccess,
    isError,
  } = useBookCar();
  const { register, handleSubmit } = useForm<Form>({ shouldFocusError: true });

  const submitHandler = async ({
    fullName,
    dropoffTime,
    dropoffLocation,
    pickupTime,
    pickupLocation,
    phone,
  }: Form) => {
    if (
      fullName &&
      phone &&
      pickupLocation &&
      pickupTime &&
      dropoffTime &&
      dropoffLocation &&
      pickupLocation.length &&
      dropoffLocation.length &&
      phone.startsWith("+") &&
      phone.length == 12
    ) {
      createBooking(
        `Car Booking\n\n${car.name} ${car.year}\nPick-up Location: ${
          pickupLocation ?? "Not mentioned"
        } + 400฿ \nPick-up Time: ${pickupTime}\nDrop-off Location: ${dropoffLocation}\nDrop-off Time: ${dropoffTime}\nStart: ${new Date(
          startDate
        ).toLocaleDateString()}\nFinish: ${new Date(
          endDate
        ).toLocaleDateString()}\nTotal: ${totalPrice} ฿\nDeposit: ${
          car.deposit
        } ฿\nInsurance: ${
          isPremium ? "Full" : "Standart"
        }\n${fullName} ${phone}\n`
      );
    } else {
      toast.error("Please fill all the fields correctly.");
    }
  };

  useEffect(() => {
    if (isPending) {
      const loadingToastId = toast.loading("Sending Request...");
      setLoadingToastId(loadingToastId);
    }
    if (isSuccess) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
      toast.success("Request sent successfully!");
    }
    if (isError) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
    }
  }, [isPending, isSuccess, isError]);

  return (
    <div
      className={clsx(
        "bg-white rounded-lg flex flex-col items-start p-5",
        className
      )}
    >
      <h2 className="text-slate-700 text-2xl font-bold text-center mx-auto">
        User Information
      </h2>
      <form
        className="mt-10 w-full grid grid-cols-2 flex-col gap-5 relative pb-40 max-sm:grid-cols-1 max-sm:pb-0"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="pickup-location" className="text-lg font-medium">
            Pick-up Location{" "}
            <span className="text-gray-500 text-sm font-normal">+ 400฿</span>
          </label>
          <input
            id="pickup-location"
            type="text"
            {...register("pickupLocation")}
            className="w-full h-[50px] border-[1px] rounded-sm pl-2"
            placeholder="Pick-up location"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="pickup-time" className="text-lg font-medium">
            Pick-up Time
          </label>
          <input
            id="pickup-time"
            type="time"
            {...register("pickupTime")}
            className="w-full h-[50px] border-[1px] rounded-sm pl-2"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="dropoff-location" className="text-lg font-medium">
            Drop-off Location{" "}
            <span className="text-gray-500 text-sm font-normal">+ 400฿</span>
          </label>
          <input
            id="dropoff-location"
            type="text"
            {...register("dropoffLocation")}
            className="w-full h-[50px] border-[1px] rounded-sm pl-2"
            placeholder="Drop-off location"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="dropoff-time" className="text-lg font-medium">
            Drop-off Time
          </label>
          <input
            id="dropoff-time"
            type="time"
            {...register("dropoffTime")}
            className="w-full h-[50px] border-[1px] rounded-sm pl-2"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="fullName" className="text-lg font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className="w-full h-[50px] border-[1px] rounded-sm pl-2"
            placeholder="John Doe"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="phone" className="text-lg font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            {...register("phone")}
            type="tel"
            className="w-full h-[50px] border-[1px] rounded-sm pl-2"
            placeholder="+1 234 567 890"
          />
        </div>
        <div className="flex flex-col items-start absolute left-1/2 -translate-x-1/2 bottom-0 max-sm:static max-sm:translate-x-0">
          <button
            disabled={isPending}
            className="w-full h-12 bg-brand-base text-white rounded-lg mt-4 hover:border-brand-base hover:bg-white hover:text-brand-base duration-300 border-2 border-transparent hover:font-semibold flex items-center gap-4 justify-center"
          >
            Book now
            {isPending && <LoaderIcon className="animate-spin" />}
          </button>
          <p className="mt-5 text-center">
            By proceeding, I acknowledge that I have read and agree to Ulethai`s{" "}
            <span className="text-brand-base">Terms and Conditions</span> and{" "}
            <span className="text-brand-base">Privacy Policy</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookCar;
