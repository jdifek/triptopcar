import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Provider from "./provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Car rental in Phuket at the lowest prices from owners",
  description: "Honest. Transparent. No hidden fees.",
  openGraph: {
    title: "Car rental in Phuket at the lowest prices from owners",
    description: "Honest. Transparent. No hidden fees.",
    locale: "en_GB",
    alternateLocale: ["ru_RU"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: [
    {
      rel: "icon",
      url: `/icon-${process.env.MODE}.svg`,
      type: "image/svg+xml",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "preconnect",
      url: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      url: "https://fonts.gstatic.com",
    },
  ],
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
