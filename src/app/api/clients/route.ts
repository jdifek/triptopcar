import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function POST(request: Request) {
    try {
      const data = await request.json();

      const { contractData, clientData, paymentData } = data;

      // Шаг 1: Создайте контракт без клиента
      const contract = await prisma.contracts.create({
        data: {
          ...contractData,
          client_id: null,  // Клиент ещё не привязан
        },
      });

      // Шаг 2: Создайте клиента
      const client = await prisma.clients.create({
        data: clientData,
      });

      // Шаг 3: Обновите контракт, добавив клиента
      const updatedContract = await prisma.contracts.update({
        where: { id: contract.id },
        data: { client_id: client.id },
      });

      // Шаг 4: Создайте платеж
      const payment = await prisma.payments.create({
        data: {
          ...paymentData,
          contract_id: updatedContract.id,
        },
      });

      return NextResponse.json({ contract: updatedContract, client, payment });
    } catch (error) {
      console.error("Error creating contract, client, or payment:", error);
      return NextResponse.json({ error: "Failed to create contract, client, or payment" }, { status: 500 });
    }
  }

