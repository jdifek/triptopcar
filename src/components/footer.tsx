"use client";

import TelegramIcon from "@/components/icons/telegram-icon";
import WhatsAppIcon from "@/components/icons/whats-app-icon";
import {
  ADDRESS,
  PHONE_NUMBER,
  TELEGRAM_LINK,
  WHATSAPP_LINK,
} from "@/lib/config";
import Link from "next/link";
import Logo from "./ui/logo";

const links: { name: string; path: string }[] = [
  { name: "Routes", path: "/routes" },
  { name: "Partnership", path: "/partnership" },
  { name: "Contract", path: "/contract" },
  { name: "Contact Us", path: "/contact-us" },
];

const Footer = () => {
  return (
    <footer className="flex flex-shrink flex-col items-center gap-10 pb-4 bg-white">
      <div className="container mx-auto max-[350px]:px-2">
        <div className="flex gap-4 self-stretch border-t border-t-gray-200 pt-8 items-start justify-between max-sm:px-4 max-[440px]:flex-col max-[440px]:items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-700 max-[440px]:text-center">
              About Us
            </h2>
            <ul className="flex flex-col gap-2 max-[440px]:items-center">
              <li className="text-gray-500">
                <Link href="#">Mission</Link>
              </li>
              <li className="text-gray-500">
                <Link href="#">Who we are</Link>
              </li>
              <li className="text-gray-500">
                <Link href="#">What are we for</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-700 max-[440px]:text-center">
              Info
            </h2>
            <ul className="flex flex-col gap-2 max-[440px]:items-center">
              <li className="text-gray-500">
                <Link href="#">Routes</Link>
              </li>
              <li className="text-gray-500">
                <Link href="#">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-700 max-[440px]:text-center">
              Conditions
            </h2>
            <ul className="flex flex-col gap-2 max-[440px]:items-center">
              <li className="text-gray-500">
                <Link href="#">Rental Conditions</Link>
              </li>
              <li className="text-gray-500">
                <Link href="#">Pay</Link>
              </li>
            </ul>
          </div>
          <ul className="flex flex-col items-start gap-4 max-md:hidden">
            <Logo variant="dark" />
          </ul>
        </div>
        <div className="mt-5 w-full">
          <hr />
          <p className="text-gray-500 text-center mt-3 mx-auto max-[440px]:text-sm">
            © Copyright 2013 - 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
