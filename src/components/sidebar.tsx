"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Car, Users, FileText, MapPin, CreditCard, MessageSquare, Settings, Menu } from "lucide-react";

const menuItems = [
  { href: "/dashboard/cars", icon: Car, label: "Cars" },
  { href: "/dashboard/clients", icon: Users, label: "Clients" },
  { href: "/dashboard/contracts", icon: FileText, label: "Contracts" },
  { href: "/dashboard/locations", icon: MapPin, label: "Locations" },
  { href: "/dashboard/payments", icon: CreditCard, label: "Payments" },
  { href: "/dashboard/reviews", icon: MessageSquare, label: "Reviews" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "border-r bg-card text-card-foreground",
        collapsed ? "w-16" : "w-64",
        "transition-all duration-300",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && <h1 className="text-lg font-semibold">Car Rental Admin</h1>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <nav className="space-y-2 p-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={`/admin/manager${item.href}`}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center",
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
