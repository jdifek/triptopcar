import { areas } from "@/app/(home)/_data/areas.data";

export function useTotalPrice({
  isPremium,
  daysQuantity,
  car,
  locationFrom,
  locationTo,
}: {
  isPremium: boolean;
  daysQuantity: number;
  car: any;
  locationFrom: number;
  locationTo: number;
}) {
  return isPremium
    ? daysQuantity * (car.pricePerDay + 400) +
        (areas.find((area) => area.id === locationFrom)?.deliveryPrice ?? 0) +
        (areas.find((area) => area.id === locationTo)?.deliveryPrice ?? 0)
    : daysQuantity * car.pricePerDay +
        car.deposit +
        (areas.find((area) => area.id === locationFrom)?.deliveryPrice ?? 0) +
        (areas.find((area) => area.id === locationTo)?.deliveryPrice ?? 0);
}
