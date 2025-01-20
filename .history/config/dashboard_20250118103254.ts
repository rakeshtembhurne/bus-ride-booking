import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      { href: "/dashboard/charts", icon: "lineChart", title: "Charts" },
      {
        href: "/admin/orders",
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "#/dashboard/posts",
        icon: "post",
        title: "User Posts",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },

      {
        href: "/fare",
        icon: "laptop",
        title: "Fare Panel",
        authorizeOnly: UserRole.ADMIN,
      },

      {
        href: "/location",
        icon: "laptop",
        title: "Location Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/manager",
        icon: "package",
        title: "Manager",
        authorizeOnly: UserRole.ADMIN,
      },
      // {
      //   href: "/dashboard/vehicle",
      //   icon: "package",
      //   title: "Vehicle",
      //   authorizeOnly: UserRole.ADMIN,
      // },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/docs", icon: "bookOpen", title: "Documentation" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
