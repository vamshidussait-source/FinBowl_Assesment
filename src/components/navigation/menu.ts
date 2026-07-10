import {
  LayoutDashboard,
  Wallet,
  BadgeDollarSign,
  Landmark,
  ShieldCheck,
  Users,
  Sparkles,
  BarChart3,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },

  {
    title: "Finance",
    icon: Wallet,
  },

  {
    title: "Sales CRM",
    icon: BadgeDollarSign,
  },

  {
    title: "RMS",
    icon: Landmark,
    children: [
      {
        title: "Dashboard",
        path: "/",
      },
      {
        title: "Disbursement",
        path: "/disbursement",
      },
      {
        title: "Invoices",
        path: "/invoices",
      },
      {
        title: "PO",
        path: "/po",
      },
      {
        title: "RMS Reports",
        path: "/reports",
      },
    ],
  },

  {
    title: "Compliance",
    icon: ShieldCheck,
  },

  {
    title: "Vendors",
    icon: Users,
  },

  {
    title: "AI Suite",
    icon: Sparkles,
  },

  {
    title: "Reports",
    icon: BarChart3,
  },
];
