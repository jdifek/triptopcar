import { calculateRentCost } from "@/lib/calculateRentCost";
import { Car } from "@/typing/interfaces";

export function useTotalPrice({
  isPremium,
  daysQuantity,
  car,
  startDate,
  endDate,
  includeChildSeat,
}: {
  isPremium: boolean;
  daysQuantity: number;
  car: Car;
  startDate: Date;
  endDate: Date;
  includeChildSeat: boolean;
}) {
  const dailyRate = car.pricePerDay; // Базовая стоимость за день
  const deposit = car.deposit; // Возвратный депозит

  // Вычисляем стоимость аренды
  const baseRentalFee = calculateRentCost(
    startDate,
    endDate,
    dailyRate,
    includeChildSeat
  );

  // Премиальная страховка (опционально)
  const insuranceFee = isPremium ? 400 * daysQuantity : 0;
  console.log(`Стоимость страховки: ${insuranceFee}`);


  // Прочие сборы
  const serviceFee = 500;

  // Итоговая стоимость
  const totalPrice = baseRentalFee + insuranceFee + deposit + serviceFee;
  console.log("Вызов useTotalPrice", { isPremium, daysQuantity, car, startDate, endDate, includeChildSeat });
  console.log("totalPrice", Math.round(totalPrice));


  return Math.round(totalPrice);
}
