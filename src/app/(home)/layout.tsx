import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Car rental in Phuket at the lowest prices from owners",
    description: "Honest. Transparent. No hidden fees.",
    openGraph: {
      title: "Car rental in Phuket at the lowest prices from owners",
      description: "Honest. Transparent. No hidden fees.",
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
