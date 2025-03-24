import { LucideIcon, GraduationCap, Home } from "lucide-react";

export interface NavSubItem {
  title: string;
  path: string;
  icon?: LucideIcon;
}

export interface NavMainItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: NavSubItem[];
}

export interface NavGroup {
  id: number;
  label: string;
  items: NavMainItem[];
}

export const sidebarItems = {
  admin: <NavGroup[]>[
    {
      id: 1,
      label: "Overview",
      items: [
        {
          title: "Dashboard",
          path: "/admin/dashboard",
          icon: Home
        },
        {
          title: "Universities",
          path: "/admin/universities",
          icon: GraduationCap,
          isActive: false
        }
      ],
    }
  ],
};
