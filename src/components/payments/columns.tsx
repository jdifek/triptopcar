"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PaymentActions } from "./actions";

// Интерфейс данных для таблицы
export type Payment = {
  id: number;
  contractId: number | null;
  amount: number;
  paymentDate: string;
  status: string;
  paymentType?: string;
  currency?: string;
};

// Мэппинг данных для согласования API с интерфейсом Payment
const mapPayment = (payment: any): Payment => ({
  id: payment.id,
  contractId: payment.contract_id,
  amount: Number(payment.amount), // Преобразуем Decimal в число
  paymentDate: payment.created_at?.toISOString() || "",
  status: payment.status,
  paymentType: payment.payment_type,
  currency: payment.currency || "USD",
});

// Определение колонок таблицы
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "contractId",
    header: "Contract ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number; // Явное указание типа
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.currency || "USD",
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("paymentDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${
            status === "completed"
              ? "bg-green-100 text-green-800"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "paymentType",
    header: "Payment Type",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    id: "actions",
    cell: ({ row }) => <PaymentActions payment={row.original} />,
  },
];
