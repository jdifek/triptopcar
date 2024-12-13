import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Получение всех контрактов с вложенными клиентами и платежами
export async function GET() {
  try {
    const contracts = await prisma.contracts.findMany({
      include: {
        clients: true,
        payments: true,
      },
    });
    return NextResponse.json(contracts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 });
  }
}

// Создание нового контракта с клиентом и платежом
export async function POST(request: Request) {
  try {
    const data = await request.json(); // Получаем данные из тела запроса
    const { contractData, clientData, paymentData } = data;

    // Создание контракта с вложенными данными для клиента и платежа
    const contract = await prisma.contracts.create({
      data: {
        ...contractData,
        client: {
          create: clientData, // Создаем клиента
        },
        payments: {
          create: paymentData, // Создаем платеж
        },
      },
      include: {
        clients: true, // Включаем клиента в ответ
        payments: true, // Включаем платежи в ответ
      },
    });

    return NextResponse.json(contract); // Возвращаем созданный контракт с вложенными данными
  } catch (error) {
    console.error("Error creating contract, client, or payment:", error);
    return NextResponse.json({ error: "Failed to create contract, client, or payment" }, { status: 500 });
  }
}
