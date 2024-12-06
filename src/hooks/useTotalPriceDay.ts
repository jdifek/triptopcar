import { getDurationChildSeatPricePerDay, getSeasonCoefficient } from "@/lib/calculateRentCost";

export function calculateDailyCost(date: Date, dailyRate: number, includeChildSeat: boolean = false): number {
  // Проверяем, попадает ли день в сезон и получаем коэффициент
  const seasonCoefficient = getSeasonCoefficient(date);

  // Базовая стоимость за день с учетом сезонного коэффициента
  let dailyCost = dailyRate * seasonCoefficient;

  // Если нужно учесть стоимость детского кресла
  if (includeChildSeat) {
    const childSeatCost = getDurationChildSeatPricePerDay(1);
    dailyCost += childSeatCost;
  }

  console.log(
    `Дата: ${date.toLocaleDateString()}, Базовая стоимость: ${dailyRate}, Коэффициент сезона: ${seasonCoefficient}, Стоимость за день: ${dailyCost}`,
  );

  return dailyCost;
}
