import { RouteItem } from "@/viewports/Navigator/Navigator.type";
import { Dispatch, SetStateAction } from "react";

export interface HeaderProps {
  publicRoutes: RouteItem[];
  profileDropdownItems: DropdownItems[];
  loggedIn: boolean;
  mobileSetOpen: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
}

export interface DropdownItems {
  label: string;
  to: string;
}
