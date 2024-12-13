import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
      const cars = await prisma.cars.findMany();
      console.log("Fetched cars:", cars); // Логируем данные, полученные от базы данных

      // Проверка на пустой массив
      if (!cars || cars.length === 0) {
        console.log("No cars found"); // Логируем, если машин нет
        return NextResponse.json({ message: "No cars found" }, { status: 404 });
      }

      // Возвращаем корректные данные
      return NextResponse.json({ cars });
    } catch (error) {
      console.error("Error fetching cars:", error); // Логируем ошибку
      return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
    }
  }

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const car = await prisma.cars.create({ data });
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}
