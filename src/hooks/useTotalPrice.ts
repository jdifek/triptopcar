export function useTotalPrice({
  isPremium,
  daysQuantity,
  car,
}: {
  isPremium: boolean;
  daysQuantity: number;
  car: any;
}) {
  return isPremium
    ? daysQuantity * (car.pricePerDay + 400) + 500
    : daysQuantity * car.pricePerDay + car.deposit + 500;
}
