"use client";

import Loader from "@/components/icons/loader";
import { useBookCar } from "@/hooks/useTelegram";
import { useTotalPrice } from "@/hooks/useTotalPrice";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

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
  const timeOptions: { label: string; value: string }[] = [
    { label: "00:00", value: "00:00" },
    { label: "1:00", value: "1:00" },
    { label: "2:00", value: "2:00" },
    { label: "3:00", value: "3:00" },
    { label: "4:00", value: "4:00" },
    { label: "5:00", value: "5:00" },
    { label: "6:00", value: "6:00" },
    { label: "7:00", value: "7:00" },
    { label: "8:00", value: "8:00" },
    { label: "9:00", value: "9:00" },
    { label: "10:00", value: "10:00" },
    { label: "11:00", value: "11:00" },
    { label: "12:00", value: "12:00" },
    { label: "13:00", value: "13:00" },
    { label: "14:00", value: "14:00" },
    { label: "15:00", value: "15:00" },
    { label: "16:00", value: "16:00" },
    { label: "17:00", value: "17:00" },
    { label: "18:00", value: "18:00" },
    { label: "19:00", value: "19:00" },
    { label: "20:00", value: "20:00" },
    { label: "21:00", value: "21:00" },
    { label: "22:00", value: "22:00" },
    { label: "23:00", value: "23:00" },
  ];

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

  const { push } = useRouter();

  const { mutateAsync: createBooking, isPending, isSuccess } = useBookCar();
  const { register, handleSubmit, setValue, watch } = useForm<Form>({
    shouldFocusError: true,
    defaultValues: {
      dropoffTime: "10:00",
      pickupTime: "10:00",
    },
  });

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
      push(
        `/checkout?carId=${car.id}&isPremium=${isPremium}&startDate=${startDate}&endDate=${endDate}&dropoffLocation=${dropoffLocation}&dropoffTime=${dropoffTime}&pickupLocation=${pickupLocation}&pickupTime=${pickupTime}&fullName=${fullName}&phone=${phone}`
      );
    } else {
      toast.error("Please fill all the fields correctly.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Request sent successfully!");
    }
  }, [isSuccess]);

  return (
    <div
      className={clsx(
        "bg-white rounded-lg flex flex-col items-start p-5 relative",
        className
      )}
    >
      <h2 className="text-slate-700 text-2xl font-bold text-center mx-auto">
        User Information
      </h2>
      <button className="bg-brand-base rounded-md text-white absolute right-5 top-5 max-sm:static max-sm:mx-auto max-sm:mt-5">
        <Link className="px-4 py-2 block" href="/">
          Change Date
        </Link>
      </button>
      <form
        className="mt-10 w-full grid grid-cols-2 flex-col gap-5 relative pb-40 max-sm:grid-cols-1 max-sm:pb-0"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="pickup-location" className="text-lg font-medium">
            Pick-up Location{" "}
            <span className="text-gray-500 text-sm font-normal">+ 250฿</span>
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
          <Select
            id="pickup-time"
            defaultValue={{ label: "10:00", value: "10:00" }}
            onChange={(value) =>
              setValue("pickupTime", value?.value ?? "10:00")
            }
            value={{ label: watch("pickupTime"), value: watch("pickupTime") }}
            classNamePrefix="react-select"
            placeholder="Pick-up Time"
            options={timeOptions}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "var(--brand-base)",
              },
              borderRadius: 4,
            })}
            className="w-full h-[50px] rounded-sm"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="dropoff-location" className="text-lg font-medium">
            Drop-off Location{" "}
            <span className="text-gray-500 text-sm font-normal">+ 250฿</span>
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
          <Select
            id="dropoff-time"
            defaultValue={{ label: "10:00", value: "10:00" }}
            onChange={(value) =>
              setValue("dropoffTime", value?.value ?? "10:00")
            }
            value={{ label: watch("dropoffTime"), value: watch("dropoffTime") }}
            classNamePrefix="react-select"
            placeholder="Drop-off Time"
            options={timeOptions}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "var(--brand-base)",
              },
              borderRadius: 4,
            })}
            className="w-full h-[50px] rounded-sm"
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
            {isPending && <Loader className="animate-spin" />}
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

export default dynamic(() => Promise.resolve(BookCar), { ssr: false });
