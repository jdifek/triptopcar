import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Best car rental conditions in Phuket. Only we have full insurance for all cars without deductible, deposit and hidden commissions.",
    description: "Book a car and get the best prices and rental conditions on the whole island of Phuket. Call now: +66659769300",
    openGraph: {
      title: "Best car rental conditions in Phuket. Only we have full insurance for all cars without deductible, deposit and hidden commissions.",
      description: "Book a car and get the best prices and rental conditions on the whole island of Phuket. Call now: +66659769300",
    },
  };
}

export default async function LocaleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col">
      <main className="-mt-6 flex-1 basis-auto rounded-t-3xl bg-list-background">
        <Toaster />
        {children}
      </main>
    </div>
  );
}
